import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, View } from "react-native";

import { Button, Divider, List, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-root-toast";
import { FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import styles from "./style";

import instance from "../../api/axios";

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState();

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
        const user = await AsyncStorage.getItem("user");

        if (user) {
          setUser(JSON.parse(user));
        }

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
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          SHOWING APPOINTMENTS FOR {date.toLocaleDateString()}
        </Text>

        <Text style={styles.dateText}>{days[date.getDay() - 1]}</Text>
      </View>

      <Divider />

      <Text style={{ backgroundColor: '#f9fafb', textAlign: 'center', padding: 10 }}>
        You are logged in as: {user?.first_name + ' ' + user?.surname}
      </Text>

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
        renderItem={({ item }) => {

          return (
            <List.Item
              onPress={() => navigation.navigate("Tech", {
                id: item.id
              })}
              title={() => {
                return (
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <FontAwesome name="bookmark" size={14} color="black" />

                    <Text style={{ marginLeft: 5 }}>{item.id}</Text>
                  </View>
                )
              }}
              description={() => {
                console.log(item?.vehicle)

                return (
                  <View>
                    {item?.customer?.first_name ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <FontAwesome name="user" size={14} color="black" />

                        <Text style={{ marginLeft: 5 }}>{item?.customer?.first_name + ' ' + item?.customer?.surname}</Text>
                      </View>
                    ) : null}

                    {item?.vehicle?.first_name ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <AntDesign name="car" size={14} color="black" />

                        <Text style={{ marginLeft: 5 }}>{item?.customer?.first_name + ' ' + item?.customer?.surname}</Text>
                      </View>
                    ) : null}

                    {item?.vehicle?.first_name ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <FontAwesome5 name="tools" size={14} color="black" />

                        <Text style={{ marginLeft: 5 }}>{item?.customer?.first_name + ' ' + item?.customer?.surname}</Text>
                      </View>
                    ) : null}
                  </View>
                )
              }}
              right={() => (
                <Text>
                  {formatAMPM(new Date(item?.datetime.replace(/-/g, "/")))}
                </Text>
              )}
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
