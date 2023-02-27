import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { Button, Divider, List, Text, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-root-toast";

import styles from "./style";

import instance from "../../api/axios";

const Home = ({ navigation }) => {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  const date = new Date(Date.now());
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");

        if (token) {
          instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;

          const res = await instance.get(`/api/bookings`);
          const { data, success } = res.data;

          if (success) {
            setBookings(data);
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

  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  if (isLoading) {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }


  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View >
        {/* <View style={styles.header}>
          <Text style={styles.headerText}>Name</Text>
        </View> */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{days[date.getDay() - 1]}</Text>
          <Text style={styles.dateText}>{date.toLocaleDateString()}</Text>
        </View>

        <Divider />

        <Text style={styles.jobText}>Total Jobs: {bookings.length}</Text>
        <Button onPress={handleLogout}>Logout</Button>

        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No jobs for today...</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <List.Item
              onPress={() => navigation.navigate("Tech", {
                id: item.id
              })}
              title={item?.customer?.first_name + ' ' + item?.customer?.surname}
              description={item.calendar}
              right={() => <Text>
                {formatAMPM(new Date(item?.datetime.replace(/-/g, "/")))}
              </Text>}
            />
          )}
        />

      </View>
    </SafeAreaView>
  );
};

export default Home;
