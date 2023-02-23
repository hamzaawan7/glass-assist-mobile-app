import React from "react";
import { View } from "react-native";
import { Button, Divider, List, Text, useTheme } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

import styles from "./style";

const Home = ({ navigation, setToken }) => {
  const theme = useTheme();
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
  const handleLogout = async () => {
    await AsyncStorage.removeItem("access_token");
    await AsyncStorage.removeItem("user");
    setToken(null);
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
