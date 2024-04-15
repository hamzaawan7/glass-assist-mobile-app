import React, { useState } from "react";
import { Text, View, ActivityIndicator, Image } from "react-native";

import { Button, TextInput } from "react-native-paper";
import Icon from "@expo/vector-icons/FontAwesome";
import Toast from "react-native-root-toast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosError } from "axios";
import { StackActions } from "@react-navigation/native";
import NetInfo from '@react-native-community/netinfo';

import styles from "./style";

import instance from "../../api/axios";
import logs from '../../utils/logs';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSecure, setIsSecure] = useState(true);

  const handleSubmit = async () => {
    if (!email) {
      Toast.show('Username is required', {
        textColor: 'red'
      });
      return;
    }

    if (!password) {
      Toast.show('Password is required', {
        textColor: 'red'
      });
      return;
    }

    const state = await NetInfo.fetch();

    if (!state.isConnected) {
      Toast.show('Problem while connecting to internet', {
        textColor: 'red'
      });
      return;
    }

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

        if (data?.user) {
          await AsyncStorage.setItem("user", JSON.stringify(data.user));
        }

        setEmail("");
        setPassword("");
        navigation.dispatch(StackActions.replace('Home'));
      }

      setIsLoading(false);
    } catch (error) {
      let message = '';

      if (error instanceof AxiosError) {
        message = error.response.data.message;
      } else {
        message = 'Unexpected error';
      }

      logs.error(message);

      setIsLoading(false);
      Toast.show(message, {
        duration: Toast.durations.LONG,
      });
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image source={require('../../assets/GA-logo-001.jpg')} />
      </View>

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
