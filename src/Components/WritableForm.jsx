import React, { useCallback, useRef, useState, useEffect } from 'react'
import { Dimensions, StyleSheet, View, ActivityIndicator, Platform, Image } from 'react-native'
import { TextInput, Text, Button, Checkbox, List } from "react-native-paper";

import * as FileSystem from "expo-file-system";
import { nanoid } from 'nanoid'
import SignatureScreen from "react-native-signature-canvas";
import Toast from 'react-native-root-toast';
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";

import instance from '../api/axios';
import Document from './DocumentTable';

const { width } = Dimensions.get('screen');

const paymentType = [
  {
    id: '',
    name: 'Select Payment Type',
  },
  {
    id: 'card',
    name: 'Card'
  },
  {
    id: 'cash',
    name: 'Cash'
  },
  {
    id: 'cheque',
    name: 'Cheque'
  },
];

const reasons = [
  {
    id: '',
    name: 'Select Reason',
  },
  {
    id: 'bad_weather',
    name: 'Bad Weather',
  },
  {
    id: 'wrong_glass_supplied',
    name: 'Wrong Glass Supplied',
  },
  {
    id: 'customer_unavailable',
    name: 'Customer Unavailable',
  },
  {
    id: 'wrong_address',
    name: 'Wrong Address',
  },
]

export default function ({ setCanScroll, postDocuments, setPostDocuments, preDocuments, setPreDocuments, ...initialBooking }) {
  const [booking, setBooking] = useState(initialBooking);

  const [preCheckNotes, setPreCheckNotes] = useState(booking?.pre_check_notes);
  const [preCName, setPreCName] = useState(booking?.pre_c_name);
  const [jobSignOff, setJobSignOff] = useState(booking?.job_complete)
  const [customerName, setCustomerName] = useState(booking?.c_name)
  const [type, setType] = useState(booking?.payment_type);
  const [preJobComplete, setPreJobComplete] = useState(booking?.pre_job_complete);
  const [techStatement, setTechStatement] = useState(booking?.technician_statement);
  const [techNote, setTechNote] = useState(booking?.technician_note);
  const [batchNumber, setBatchNumber] = useState(booking?.batch_number)
  const [techDetails, setTechDetails] = useState(booking?.tech_details);
  const [jobNotCompleted, setJobNotCompleted] = useState(booking?.job_not_completed);

  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const ref = useRef();
  const ref2 = useRef();

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  const handleOK = (signature, field) => {
    setUploading(true);

    const path = `${FileSystem.cacheDirectory}${nanoid()}-sign.png`;
    FileSystem.writeAsStringAsync(
      path,
      signature.replace("data:image/png;base64,", ""),
      { encoding: FileSystem.EncodingType.Base64 }
    )
      .then(() => FileSystem.getInfoAsync(path))
      .then(async ({ uri }) => {
        const filename = uri.substring(uri.lastIndexOf('/') + 1)
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri

        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        const formData = new FormData();
        formData.append('image', { uri: uploadUri, name: filename, type });
        formData.append('name', field);

        try {
          const res = await instance.post(
            `/api/booking/add-sig/${booking.id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
          );

          const { success, data } = res.data;

          if (success) {
            setBooking((prev) => ({
              ...prev,
              [field]: data[field]
            }));

            Toast.show(`Saved successfully`, {
              duration: Toast.durations.LONG,
            });
          }

          setUploading(false);
        } catch (error) {
          console.error(error.response.data);
          setUploading(false);
          Toast.show(`${error.response.data?.message}`, {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch(console.error);
  };

  const saveHandle = async () => {
    setIsLoading(true);

    const { isConnected } = await NetInfo.fetch();

    const payload = {
      pre_check_notes: preCheckNotes,
      pre_c_name: preCName,
      pre_job_complete: preJobComplete,
      job_complete: jobSignOff,
      c_name: customerName,
      payment_type: type,
      technician_statement: techStatement,
      batch_number: batchNumber,
      tech_details: techDetails,
      job_not_completed: jobNotCompleted,
      technician_note: techNote,
    };

    if (isConnected) {
      try {
        const res = await instance.put(
          `/api/booking/update/${booking.id}`,
          payload
        );

        const { data, success } = res.data;
        console.log(data);

        if (success) {
          Toast.show(`Saved successfully`, {
            duration: Toast.durations.LONG,
          });
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);

        Toast.show(`${error.response.data?.message}`, {
          duration: Toast.durations.LONG,
        });
      }
    } else {
      await AsyncStorage.setItem(`update-booking`, JSON.stringify({
        route: `/api/booking/update/${booking.id}`,
        payload
      }));

      setIsLoading(false);

      Toast.show(`[NETWORK ERROR]: job will be updated once you connected to internet`, {
        duration: Toast.durations.LONG,
      });
    }
  }

  const uploadFile = useCallback(async (uri, docType) => {
    setUploading(true);

    const filename = uri.substring(uri.lastIndexOf('/') + 1)
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri

    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;

    const formData = new FormData();
    formData.append('image', { uri: uploadUri, name: filename, type });
    formData.append('name', 'document');
    formData.append('type', docType);

    try {
      const res = await instance.post(
        `/api/booking/document/${booking.id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      const { data, success } = res.data;

      if (success) {
        if (docType === 'pre') {
          setPreDocuments((prev) => [...prev, data]);
        } else {
          setPostDocuments((prev) => [...prev, data]);
        }

        Toast.show(`Uploaded successfully`, {
          duration: Toast.durations.LONG,
        });
      }

      setUploading(false);
    } catch (error) {
      console.error(error.response.data);
      setUploading(false);
      Toast.show(`${error.response.data?.message}`, {
        duration: Toast.durations.LONG,
      });
    }
  }, [booking]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <List.Section style={{ paddingHorizontal: 10 }}>
        <List.Accordion title="Pre Installation Documents">
          <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between', marginTop: 10 }}>
            <Button loading={uploading} disabled={uploading} onPress={async () => {
              try {
                const document = await DocumentPicker.getDocumentAsync();

                if (document.type !== 'cancel') {
                  await uploadFile(document.uri, 'pre')
                }
              } catch (error) {
                console.log(error)
              }
            }}>Select Document</Button>

            <Button loading={uploading} disabled={uploading} onPress={async () => {
              try {
                const result = await ImagePicker.launchCameraAsync({
                  mediaTypes: ImagePicker.MediaTypeOptions.All,
                  allowsEditing: false,
                });

                if (!result.canceled) {
                  const uri = result.assets[0].uri;

                  await uploadFile(uri, 'pre');
                }
              } catch (error) {
                console.error(error)
              }
            }}>Take Picture</Button>
          </View>

          <Document items={preDocuments} setItems={(doc) => {
            setPreDocuments(doc);
          }} />
        </List.Accordion>
      </List.Section>

      <List.Section style={{ paddingHorizontal: 10 }}>
        <List.Accordion title="Pre Installation Check">
          <Checkbox.Item
            style={{ backgroundColor: "white", marginTop: 10 }}
            label="Pre Installation Check"
            status={preJobComplete ? 'checked' : 'unchecked'}
            onPress={() => setPreJobComplete(!preJobComplete)}
          />

          <Image
            source={require('../assets/pre_check.jpeg')}
            style={{ marginTop: 10 }}
          />

          <TextInput
            label="Pre-Install Notes"
            style={styles.input}
            value={preCheckNotes}
            onChangeText={setPreCheckNotes}
            multiline
            numberOfLines={5}
          />

          <TextInput
            label="Customer Name"
            style={styles.input}
            value={preCName}
            onChangeText={setPreCName}
          />

          {booking?.signature ? (
            <Image
              source={{
                uri: `https://staging.glassassistuk.co.uk/files/Signatures/${booking?.signature}`,
              }}
              style={{
                width: '100%',
                height: 300,
                resizeMode: 'contain'
              }}
            />
          ) : (
            <View>
              <SignatureScreen
                ref={ref}
                style={{ width: width - 25, height: 200 }}
                onOK={(signature) => handleOK(signature, 'signature')}
                autoClear={true}
                onBegin={() => setCanScroll(false)}
                onEnd={() => setCanScroll(true)}
                webStyle={style}
                backgroundColor={'lightgray'}
              />

              <View style={styles.row}>
                <Button
                  mode="elevated"
                  style={{ marginTop: 10 }}
                  loading={uploading}
                  onPress={() => ref.current?.readSignature()}
                >
                  Submit
                </Button>

                <Button
                  mode="elevated"
                  style={{ marginTop: 10, marginLeft: 10 }}
                  loading={uploading}
                  onPress={() => ref.current?.clearSignature()}
                >
                  Clear
                </Button>
              </View>
            </View>
          )}

          <Text style={styles.text}>Technician Notes</Text>

          <TextInput
            label="Eurethane Batch Number:"
            style={styles.input}
            value={batchNumber}
            onChangeText={setBatchNumber}
          />

          <TextInput
            label="Technician Job Notes"
            style={styles.input}
            value={techDetails}
            onChangeText={setTechDetails}
            multiline
            numberOfLines={5}
          />

        </List.Accordion>
      </List.Section>

      <List.Section style={{ paddingHorizontal: 10 }}>
        <List.Accordion title="Post Installation Documents">
          <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between', marginTop: 10 }}>
            <Button loading={uploading} disabled={uploading} onPress={async () => {
              try {
                const document = await DocumentPicker.getDocumentAsync();

                if (document.type !== 'cancel') {
                  await uploadFile(document.uri, 'post')
                }
              } catch (error) {
                console.log(error)
              }
            }}>Select Document</Button>

            <Button loading={uploading} disabled={uploading} onPress={async () => {
              const result = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: false,
                quality: 1,
              });

              if (!result.canceled) {
                const uri = result.assets[0].uri;

                await uploadFile(uri, 'post');
              }
            }}>Take Picture</Button>
          </View>

          <Document items={postDocuments} setItems={(doc) => {
            setPostDocuments(doc);
          }} />
        </List.Accordion>
      </List.Section>

      <List.Section style={{ paddingHorizontal: 10 }}>
        <List.Accordion title="Job Sign Off">
          <Checkbox.Item
            style={{ backgroundColor: "white", marginTop: 10 }}
            label="Job Sign Off"
            status={jobSignOff ? 'checked' : 'unchecked'}
            onPress={() => setJobSignOff(!jobSignOff)}
          />

          <TextInput
            label="Customer Name"
            style={styles.input}
            value={customerName}
            onChangeText={setCustomerName}
          />

          <Picker
            label="Payment Type"
            selectedValue={type}
            onValueChange={(itemValue) =>
              setType(itemValue)
            }
          >
            {paymentType.map(stat => (
              <Picker.Item label={stat.name} value={stat.id} />
            ))}
          </Picker>

          {booking?.signature_1 ? (
            <Image
              source={{
                uri: `https://staging.glassassistuk.co.uk/files/Signatures/${booking?.signature_1}`,
              }}
              style={{
                width: '100%',
                height: 300,
              }}
            />
          ) : (
            <View>
              <SignatureScreen
                ref={ref2}
                style={{ width: width - 25, height: 200 }}
                onOK={(signature) => handleOK(signature, 'signature_1')}
                autoClear={true}
                onBegin={() => setCanScroll(false)}
                onEnd={() => setCanScroll(true)}
                webStyle={style}
                backgroundColor={'lightgray'}
              />

              <View style={styles.row}>
                <Button
                  mode="elevated"
                  style={{ marginTop: 10 }}
                  loading={uploading}
                  onPress={() => ref2.current?.readSignature()}
                >
                  Save Signature
                </Button>

                <Button
                  mode="elevated"
                  style={{ marginTop: 10, marginLeft: 10 }}
                  loading={uploading}
                  onPress={() => ref2.current?.clearSignature()}
                >
                  Clear
                </Button>
              </View>
            </View>
          )}

          <List.Item
            title="Completion Date/Time"
            description={booking?.s_date}
          />

          <List.Item
            title="Username"
            description={booking?.job_completed_by?.full_name}
          />
        </List.Accordion>
      </List.Section>

      <List.Section style={{ paddingHorizontal: 10 }}>
        <List.Accordion title="Job Not Completed">
          <Picker
            label="Reason"
            selectedValue={techStatement}
            onValueChange={(itemValue) =>
              setTechStatement(itemValue)
            }
          >
            {reasons.map(stat => (
              <Picker.Item label={stat.name} value={stat.id} />
            ))}
          </Picker>

          <Checkbox.Item
            style={{ backgroundColor: "white", marginTop: 10 }}
            label="Job Not Completed"
            status={jobNotCompleted ? 'checked' : 'unchecked'}
            onPress={() => setJobNotCompleted(!jobNotCompleted)}
          />

          <TextInput
            label="Reason, if any other"
            style={styles.input}
            value={techNote}
            onChangeText={setTechNote}
            multiline
            numberOfLines={5}
          />
        </List.Accordion>
      </List.Section>


      <Button
        mode="contained"
        style={styles.saveButton}
        loading={isLoading}
        onPress={saveHandle}
      >
        Save Job Card
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 20
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 30
  },
  input: {
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    marginVertical: 10,
  },
  saveButton: {
    marginTop: 20,
    paddingVertical: 5,
    backgroundColor: '#000',
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    width: "100%",
    alignItems: "center",
  },
  readonlyText: {
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    marginVertical: 10,
  }
});
