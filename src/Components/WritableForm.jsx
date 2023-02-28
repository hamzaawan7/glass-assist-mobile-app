import { Dimensions, StyleSheet, View } from 'react-native'
import React, { useRef, useState } from 'react'
import { TextInput, Text, Button } from "react-native-paper";
import * as FileSystem from "expo-file-system";

import SignatureScreen from "react-native-signature-canvas";
import shortid from 'shortid';

const { width } = Dimensions.get('screen');

export default function (booking) {
  const [batchNumber, setBatchNumber] = useState(booking?.batch_number);
  const [technicianNote, setTechnicianNote] = useState(booking?.technician_note);
  const [preCheckNotes, setPreCheckNotes] = useState(booking?.pre_check_notes);
  const [signature, setSignature] = useState('this');

  const [isLoading, setIsLoading] = useState(false);

  const ref = useRef();

  // Called after ref.current.readSignature() reads an empty string
  const handleEmpty = () => {
    console.log("Empty");
  };

  // Called after end of stroke
  const handleEnd = () => {
    ref.current?.readSignature();
  };

  const handleOK = (signature) => {
    const path = `${FileSystem.cacheDirectory}${shortid.generate()}sign.png`;
    console.log(path);
    FileSystem.writeAsStringAsync(
      path,
      signature.replace("data:image/png;base64,", ""),
      { encoding: FileSystem.EncodingType.Base64 }
    )
      .then(() => FileSystem.getInfoAsync(path))
      .then(console.log)
      .catch(console.error);
  };

  const style = `.m-signature-pad--footer {display: none; margin: 0px;}`;

  return (
    <View style={{ flex: 1, paddingBottom: 20 }}>
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
        onEnd={handleEnd}
        onOK={handleOK}
        onEmpty={handleEmpty}
        autoClear={true}
        webStyle={style}
        descriptionText={signature}
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
    </View>
  );
}

const styles = StyleSheet.create({
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
});
