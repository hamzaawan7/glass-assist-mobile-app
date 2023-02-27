import React, { useState, useLayoutEffect } from "react";
import { Text, View, ActivityIndicator } from "react-native";

import { Button, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./style";

import instance from "../../api/axios";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  useLayoutEffect(() => {

    const unsubscribe = navigation.addListener('focus', async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem("access_token");

        setIsLoading(false);
        if (token) {
          navigation.navigate('Home');
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await instance.post(`/api/login`, {
        email,
        password,
      });

      const { data, success } = res.data;

      if (success) {
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + data?.token;
        await AsyncStorage.setItem("access_token", data?.token);
        navigation.navigate('Home');
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
          value={email}
          onChangeText={setEmail}
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
          value={password}
          onChangeText={setPassword}
          secureTextEntry={isSecure}
          left={
            <TextInput.Icon
              onPress={() => setIsSecure(!isSecure)}
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
