import React, { useState, useCallback } from "react";
import { KeyboardAvoidingView, ActivityIndicator, ScrollView, View, RefreshControl } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import Toast from "react-native-root-toast";

import ReadOnlyForm from "../../Components/ReadOnlyForm";
import WritableForm from "../../Components/WritableForm";

import instance from "../../api/axios";

import styles from "./style";

const Tech = ({ route }) => {
  const id = route.params?.id;

  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);

      getBooking();
    }, [id])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    getBooking();
  }, [id]);

  const getBooking = useCallback(async () => {
    try {
      const res = await instance.get(`/api/booking/${id}`);
      const { data, success } = res.data;

      if (success) {
        setBooking(data?.find((book) => book.id === id));
      }

      setRefreshing(false);
      setIsLoading(false);
    } catch (error) {
      console.error(error.response?.data);

      const { message } = error.response?.data;

      setRefreshing(false);
      setIsLoading(false);

      Toast.show(message ? message : 'Something went wrong.', {
        duration: Toast.durations.LONG,
      });
    }
  }, [id, instance])

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ScrollView refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <ReadOnlyForm {...booking} />

        <WritableForm {...booking} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Tech;
