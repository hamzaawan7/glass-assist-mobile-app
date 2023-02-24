import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

import { Button, Divider, List, Text, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-root-toast";

import styles from "./style";

import instance from "../../api/axios";

const Home = ({ navigation }) => {
  const theme = useTheme();

  const [isLoading, setIsLoading] = useState(false);

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
        const res = await instance.get(`/api/bookings`);

        const { data, success } = res.data;

        if (success) {
          console.log(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error.response?.data);

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

        <Text style={styles.jobText}>Total Jobs: 3 </Text>
        <Button onPress={handleLogout}>Logout</Button>

        <List.Item
          onPress={() => navigation.navigate("Tech")}
          title="Title"
          description="Name"
          right={() => <Text>9:00am</Text>}
        />

        <List.Item
          onPress={() => navigation.navigate("Tech")}
          title="Title"
          description="Name"
          right={() => <Text>9:00am</Text>}
        />

        <List.Item
          onPress={() => navigation.navigate("Tech")}
          title="Title"
          description="Name"
          right={() => <Text>9:00am</Text>}
        />
      </View>
    </SafeAreaView>
  );
};

export default Home;
