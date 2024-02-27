import React, { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, FlatList, View, RefreshControl } from "react-native";

import { Button, Divider, List, Text, Badge } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import { FontAwesome, FontAwesome5, AntDesign, Feather } from '@expo/vector-icons';

import styles from "./style";

import instance from "../../api/axios";

const Home = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [user, setUser] = useState();
  const [refreshing, setRefreshing] = useState(false);

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

    getBookings();
  }, []);

  const getBookings = useCallback(async () => {
    setRefreshing(true);

    getBookings();
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      const user = await AsyncStorage.getItem("user");

      if (user) {
        setUser(JSON.parse(user));
      }

      const res = await instance.get(`/api/bookings`);
      const { data, success } = res.data;

      if (success) {
        setBookings(data);
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
  });

  const getCarName = (vehicle) => {
    let name = '';

    if (vehicle?.car_make && vehicle?.car_make?.name) {
      name += `${vehicle?.car_make?.name} `;
    }

    if (vehicle?.car_model && vehicle?.car_model?.name) {
      name += `${vehicle?.car_model?.name} `;
    }

    if (vehicle?.vehicle && vehicle?.vehicle?.reg_no) {
      name += `(${vehicle?.vehicle?.reg_no})`;
    }

    return name;
  }

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.navigate('Login');
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
                return (
                  <View style={{ columnGap: 10 }}>
                    {item?.company?.name ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <FontAwesome name="industry" size={14} color="black" />

                        <Text style={{ marginLeft: 5 }}>{item?.company?.name}</Text>
                      </View>
                    ) : null}

                    {item?.customer?.first_name ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <FontAwesome name="user" size={14} color="black" />

                        <Text style={{ marginLeft: 5 }}>{item?.customer?.first_name + ' ' + item?.customer?.surname}</Text>
                      </View>
                    ) : null}

                    {(item?.car_make || item?.car_model) ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <AntDesign name="car" size={14} color="black" />

                        <Text style={{ marginLeft: 5 }}>{getCarName(item)}</Text>
                      </View>
                    ) : null}

                    {item?.job_location?.address_line_1 ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <FontAwesome name="send" size={14} color="black" />

                        <Text style={{ marginLeft: 5 }}>{item?.job_location?.address_line_1}</Text>
                      </View>
                    ) : null}

                    {item?.job_operation?.description ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <Feather name="list" size={14} color="black" />

                        <Text style={{ marginLeft: 5 }}>{item?.job_operation?.description}</Text>
                      </View>
                    ) : null}

                    {user ? (
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                        <FontAwesome5 name="tools" size={14} color="black" />

                        <Text style={{ marginLeft: 5 }}>{user?.first_name + ' ' + user?.surname}</Text>
                      </View>
                    ) : null}
                  </View>
                )
              }}
              right={() => (
                <Text style={{ paddingHorizontal: 4 }}>
                  {item?.job_type === 1 ? (
                    <Badge>Business</Badge>
                  ) : ('')}
                </Text>
              )}
            />
          );
        }}
      />
    </View>
  );
};

export default Home;
