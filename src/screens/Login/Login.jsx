import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import axios from "axios";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./style";

const Login = ({ navigation, setToken}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await axios.post(`http://10.0.2.2:8000/api/login`, {
        email,
        password,
      });
      setIsLoading(false);
      try {
        await AsyncStorage.setItem("user", JSON.stringify(res?.data.data));
        await AsyncStorage.setItem("access_token", JSON.stringify(res?.data?.data.token));
        setToken(res?.data?.data.token);
      } catch (error) {
        console.log(error, "async storage");
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show(`${error?.response?.data.message}`, {
        duration: Toast.durations.LONG,
      });
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
          label={"Username"}
          left={
            <TextInput.Icon
              icon={() => <Icon name="user" color={"black"} size={20} />}
            />
          }
        />
        <TextInput
          style={styles.input}
          label={"Password"}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          left={
            <TextInput.Icon
              icon={() => <Icon name="eye" color={"black"} size={20} />}
            />
          }
        />
        <Button
          mode="contained"
          style={styles.loginButton}
          loading={isLoading}
          onPress={handleSubmit}
        >
          Login
        </Button>
      </View>
    </View>
  );
};

export default Login;
