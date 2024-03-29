import React, { useState, useCallback } from "react";
import { KeyboardAvoidingView, ActivityIndicator, ScrollView, View, RefreshControl } from "react-native";
import { useFocusEffect } from '@react-navigation/native';

import Toast from "react-native-root-toast";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";

import ReadOnlyForm from "../../Components/ReadOnlyForm";
import WritableForm from "../../Components/WritableForm";

import instance from "../../api/axios";

import styles from "./style";

const Tech = ({ route }) => {
  const id = route.params?.id;

  const [isLoading, setIsLoading] = useState(false);
  const [booking, setBooking] = useState({});
  const [refreshing, setRefreshing] = useState(false);
  const [canScroll, setCanScroll] = useState(true);

  const [preDocuments, setPreDocuments] = useState([]);
  const [postDocuments, setPostDocuments] = useState([]);
  const [jobSignOff, setJobSignOff] = useState(0);
  const [preJobComplete, setPreJobComplete] = useState(0);

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
    const { isConnected } = await NetInfo.fetch();

    if (isConnected) {
      try {
        const res = await instance.get(`/api/booking/${id}`);
        const { data, success } = res.data;

        if (success) {
          const currentBooking = data?.find((book) => book.id === id);

          await AsyncStorage.setItem(`booking.${id}`, JSON.stringify(currentBooking));

          setBooking(currentBooking);
        }

        setRefreshing(false);
        setIsLoading(false);
      } catch (error) {
        console.error(error);

        const { message } = error.response?.data;

        setRefreshing(false);
        setIsLoading(false);

        Toast.show(message ? message : 'Something went wrong.', {
          duration: Toast.durations.LONG,
          textColor: 'red'
        });
      }
    } else {
      try {
        const offlineBooking = await AsyncStorage.getItem(`booking.${id}`);

        if (offlineBooking) {
          setBooking(JSON.parse(offlineBooking));
        }
      } catch (error) {
        console.error(error);

        let message = '';

        if (typeof error === 'string') {
          message = error;
        } else {
          message = 'Unexpected error'
        }

        Toast.show(message, {
          duration: Toast.durations.LONG,
          textColor: 'red'
        })
      }

      if (currentBooking && currentBooking?.documents) {
        setPreDocuments(currentBooking.documents?.filter((doc) => doc.type === 'pre'));
        setPostDocuments(currentBooking.documents?.filter((doc) => doc.type === 'post'));
      }

      if (currentBooking?.pre_job_complete) {
        setPreJobComplete(currentBooking.pre_job_complete);
      }

      if (currentBooking?.job_complete) {
        setJobSignOff(currentBooking.job_complete);
      }

      setRefreshing(false);
      setIsLoading(false);
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
      <ScrollView scrollEnabled={canScroll} refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
        <ReadOnlyForm {...booking} />

        <WritableForm
          {...booking}
          setCanScroll={setCanScroll}
          preDocuments={preDocuments}
          setPreDocuments={setPreDocuments}
          postDocuments={postDocuments}
          setPostDocuments={setPostDocuments}
          jobSignOff={jobSignOff}
          setJobSignOff={setJobSignOff}
          preJobComplete={preJobComplete}
          setPreJobComplete={setPreJobComplete}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Tech;
