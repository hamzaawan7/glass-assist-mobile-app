import React, { useState } from "react";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import ReadOnlyForm from "../../Components/ReadOnlyForm";
import { TextInput, Text, Checkbox, Button, Divider } from "react-native-paper";
import SignatureScreen from "react-native-signature-canvas";

import styles from "./style";

const Tech = () => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <ReadOnlyForm />
        
        <View>
          <Text style={styles.text}>Pre Installation Check</Text>
          <TextInput label={"Pre Installation Check-Notes"} style={styles.input} />
        
        </View>

      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Tech;
