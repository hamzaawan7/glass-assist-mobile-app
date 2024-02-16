import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, ActivityIndicator, ScrollView, View } from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";

import ReadOnlyForm from "../../Components/ReadOnlyForm";
import WritableForm from "../../Components/WritableForm";

import instance from "../../api/axios";

import styles from "./style";

const Tech = ({ route }) => {
  const id = route.params?.id;

  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState({});

  useEffect(() => {
    setIsLoading(true);

    (async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");

        if (token) {
          instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;

          const res = await instance.get(`/api/booking/${id}`);
          const { data, success } = res.data;

          if (success) {
            setBooking(data);
          }
        } else {
          Toast.show('Please login again...', {
            duration: Toast.durations.LONG,
          });

          navigation.navigate('Login');
        }

        setIsLoading(false);
      } catch (error) {
        console.error(error.response?.data);

        const { message } = error.response?.data;

        setIsLoading(false);
        Toast.show(message ? message : 'Something went wrong.', {
          duration: Toast.durations.LONG,
        });
      }
    })();
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView>
        <ReadOnlyForm {...booking} />

        <WritableForm {...booking} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Tech;
