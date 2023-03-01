import { Dimensions, StyleSheet, View, ActivityIndicator, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import { TextInput, Text, Button, Checkbox } from "react-native-paper";

import * as FileSystem from "expo-file-system";
import { nanoid } from 'nanoid'
import SignatureScreen from "react-native-signature-canvas";
import Toast from 'react-native-root-toast';

import instance from '../api/axios';

const { width } = Dimensions.get('screen');

export default function (booking) {
  const [batchNumber, setBatchNumber] = useState(booking?.batch_number);
  const [technicianNote, setTechnicianNote] = useState(booking?.technician_note);
  const [preCheckNotes, setPreCheckNotes] = useState(booking?.pre_check_notes);
  const [preCName, setPreCName] = useState(booking?.pre_c_name);
  const [preJobComplete, setPreJobComplete] = useState(booking?.pre_job_complete);

  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef();

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  const handleOK = (signature) => {
    const path = `${FileSystem.cacheDirectory}${nanoid()}-sign.png`;
    FileSystem.writeAsStringAsync(
      path,
      signature.replace("data:image/png;base64,", ""),
      { encoding: FileSystem.EncodingType.Base64 }
    )
      .then(() => FileSystem.getInfoAsync(path))
      .then(async ({ uri }) => {
        setIsLoading(true);
        const filename = uri.substring(uri.lastIndexOf('/') + 1)
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri

        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;

        const formData = new FormData();
        formData.append('image', { uri: uploadUri, name: filename, type });
        formData.append('name', filename);

        try {
          const res = await instance.put(
            `/api/booking/add-sig/${booking.id}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            }
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
          console.error(error.response.data);
          setIsLoading(false);
          Toast.show(`${error.response.data?.message}`, {
            duration: Toast.durations.LONG,
          });
        }
      })
      .catch(console.error);
  };

  const saveHandle = async () => {
    try {
      const res = await instance.put(
        `/api/booking/update/${booking.id}`,
        {
          batch_number: batchNumber,
          technician_note: technicianNote,
          pre_check_notes: preCheckNotes,
          pre_c_name: preCName,
          pre_job_complete: preJobComplete
        }
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
      console.error(error.response.data);
      setIsLoading(false);
      Toast.show(`${error.response.data?.message}`, {
        duration: Toast.durations.LONG,
      });
    }
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Technician Notes</Text>
      <TextInput
        label={"Eurethane Batch Number"}
        style={styles.input}
        value={batchNumber}
        onChangeText={setBatchNumber}
      />

      <TextInput
        label={""}
        style={styles.input}
        value={technicianNote}
        onChangeText={setTechnicianNote}
        multiline
        numberOfLines={3}
      />

      <Text style={styles.text}>Pre Installation Check</Text>
      <TextInput
        label={"Pre Installation Check - Notes"}
        style={styles.input}
        value={preCheckNotes}
        onChangeText={setPreCheckNotes}
        multiline
        numberOfLines={5}
      />

      <SignatureScreen
        ref={ref}
        style={{ width: width - 25, height: 200 }}
        onOK={handleOK}
        autoClear={true}
        webStyle={style}
        backgroundColor={'lightgray'}
      />

      <View style={styles.row}>
        <Button
          mode="contained"
          style={styles.saveButton}
          loading={isLoading}
          onPress={() => ref.current?.readSignature()}
        >
          Save Signature
        </Button>

        <Button
          mode="contained"
          style={styles.saveButton}
          loading={isLoading}
          onPress={() => ref.current?.clearSignature()}
        >
          Clear
        </Button>
      </View>

      <TextInput
        label={"Customer Name"}
        style={styles.input}
        value={preCName}
        onChangeText={setPreCName}
      />

      <Checkbox.Item
        style={{ backgroundColor: "white" }}
        label="Customer Approved"
        status={preJobComplete ? 'checked' : 'unchecked'}
        onPress={() => setPreJobComplete(!preJobComplete)}
      />

      <Button
        mode="contained"
        style={styles.saveButton}
        loading={isLoading}
        onPress={saveHandle}
      >
        Save Job Card
      </Button>

      <Text style={styles.text}>Pre Install Check Completed: Date/Time</Text>
      <Text style={styles.readonlyText}>
        01/03/2023 at 01:57:08pm
      </Text>
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
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
  readonlyText: {
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    marginVertical: 10,
  }
});
