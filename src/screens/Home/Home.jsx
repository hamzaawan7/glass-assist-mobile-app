import React, {useEffect, useState, useCallback, useMemo} from "react";
import {ActivityIndicator, FlatList, View, RefreshControl, Linking} from "react-native";

import {Button, Divider, List, Text} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-root-toast";
import {FontAwesome, FontAwesome5, AntDesign, Feather, MaterialCommunityIcons, Entypo} from '@expo/vector-icons';
import NetInfo from '@react-native-community/netinfo';
import {format} from "date-fns";
import {CommonActions, StackActions} from "@react-navigation/native";

import styles from "./style";

import instance from "../../api/axios";

const Home = ({navigation}) => {
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

    const status = useMemo(() => [
        {
            id: 1,
            name: 'PENDING'
        },
        {
            id: 2,
            name: 'IN PROGRESS'
        },
        {
            id: 3,
            name: 'JOB COMPLETED'
        },
        {
            id: 4,
            name: 'AWAITING AUTH'
        },
        {
            id: 5,
            name: 'AWAITING PARTS'
        },
        {
            id: 6,
            name: 'PRIORITY'
        },
        {
            id: 7,
            name: 'INVOICED'
        },
        {
            id: 8,
            name: 'CANCELED'
        },
        {
            id: 9,
            name: 'QUOTE'
        },
        {
            id: 10,
            name: 'COMPLETED'
        },
    ], []);

    useEffect(() => {
        setIsLoading(true);

        (async () => {
            const user = await AsyncStorage.getItem("user");

            if (user) {
                setUser(JSON.parse(user));
            }
        })();

        getBookings();
    }, []);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        getBookings();
    }, []);

    const getBookings = useCallback(async () => {
        const {isConnected} = await NetInfo.fetch();

        if (isConnected) {
            try {
                const res = await instance.get(`/api/bookings`);
                const {data, success} = res.data;

                if (success) {
                    await AsyncStorage.setItem('bookings', JSON.stringify(data));
                    setBookings(data);
                }

                setRefreshing(false);
                setIsLoading(false);
            } catch (error) {
                console.error(error.response?.data);

                const {message} = error.response?.data;

                setRefreshing(false);
                setIsLoading(false);

                Toast.show(message ? message : 'Something went wrong.', {
                    duration: Toast.durations.LONG,
                    textColor: 'red'
                });
            }
        } else {
            try {
                const offlineBookings = await AsyncStorage.getItem('bookings');

                if (offlineBookings) {
                    setBookings(JSON.parse(offlineBookings));
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

            setRefreshing(false);
            setIsLoading(false);
        }

    }, []);

    const getCarName = (vehicle) => {
        let name = '';

        if (vehicle?.car_make && vehicle?.car_make?.name) {
            name += `${vehicle?.car_make?.name} `;
        }

        if (vehicle?.car_model && vehicle?.car_model?.name) {
            name += `${vehicle?.car_model?.name}`;
        }

        return name;
    }

    const getRegNo = (vehicle) => {
        return vehicle?.vehicle?.reg_no || '';
    }

    const getStatusColor = useCallback((jobStatus) => {
        if (jobStatus === 'PENDING') {
            return 'red';
        }

        if (jobStatus === 'IN PROGRESS') {
            return 'orange';
        }

        if (jobStatus === 'COMPLETED') {
            return 'green';
        }

        return 'black';
    }, [status]);

    const handleLogout = async () => {
        await AsyncStorage.clear();

        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [
                    {name: 'Login'}
                ],
            })
        );
    };

    if (isLoading) {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00"/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.companyText}>
                Glass Assist UK Ltd
            </Text>

            <Text style={styles.dateText}>
                {format(date, 'dd/MM/yyyy')} {days[date.getDay() - 1]}
            </Text>

            <Divider/>

            <Text style={{backgroundColor: '#f9fafb', textAlign: 'center', padding: 10}}>
                You are logged in as: {user?.first_name + ' ' + user?.surname}
            </Text>

            <Text style={styles.jobText}>Total Jobs: {bookings.length}</Text>

            <Button onPress={handleLogout}>Logout</Button>

            <FlatList
                data={bookings}
                keyExtractor={(item) => item.id}
                ItemSeparatorComponent={() => <Divider bold/>}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
                }
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No jobs for today...</Text>
                    </View>
                )}
                renderItem={({item}) => {
                    const jobStatus = status.find((s) => s.id == item.status);

                    return (
                        <List.Item
                            onPress={() => navigation.navigate("Tech", {
                                id: item.id
                            })}
                            title={() => {
                                return (
                                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                        <FontAwesome name="bookmark" size={14} color="black"/>

                                        <Text style={{marginLeft: 5}}>{item.id}</Text>
                                    </View>
                                )
                            }}
                            description={() => {
                                return (
                                    <View style={{columnGap: 10}}>
                                        {item?.company?.name ? (
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                                <FontAwesome name="industry" size={14} color="black"/>

                                                <Text style={{marginLeft: 5}}>{item?.company?.name}</Text>
                                            </View>
                                        ) : null}

                                        {item?.customer?.first_name ? (
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                                <FontAwesome name="user" size={14} color="black"/>

                                                <Text style={{marginLeft: 5}}>{item?.customer?.first_name || ''}'
                                                    '{item?.customer?.surname || ''}</Text>
                                            </View>
                                        ) : null}

                                        {(item?.car_make || item?.car_model) ? (
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                                <AntDesign name="car" size={14} color="black"/>

                                                <Text style={{marginLeft: 5}}>
                                                    {getCarName(item)}{" "}
                                                    <Text style={{fontWeight: 'bold'}}>({getRegNo(item)})</Text>
                                                </Text>
                                            </View>
                                        ) : null}

                                        {item?.job_location?.address_line_1 ? (
                                            <View style={{flexDirection: 'row', gap: 10}}>
                                                <FontAwesome name="send" size={14} style={{marginTop: 5}}
                                                             color="black"/>

                                                <Text style={{marginLeft: 5}}>
                                                    {item?.job_location?.address_line_1}{" "}
                                                    {item?.job_location?.address_line_2 || ''}{" "}
                                                    {item?.job_location?.city || ''}{" "}
                                                    {item?.job_location?.county || ''}
                                                </Text>
                                            </View>
                                        ) : null}

                                        {item?.job_location?.postcode ? (
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                                <MaterialCommunityIcons name="post-outline" size={14} color="black"/>

                                                <Text style={{
                                                    fontWeight: 'bold',
                                                    marginLeft: 5
                                                }}>{item?.job_location?.postcode}</Text>
                                            </View>
                                        ) : null}

                                        {item?.customer?.mobile ? (
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                                <Entypo name="phone" size={14} color="black"/>

                                                <Text
                                                    style={{marginLeft: 5}}
                                                    onPress={() => {
                                                        Linking.openURL(`tel:${item?.customer?.mobile}`)
                                                    }}
                                                >
                                                    {item?.customer?.mobile}
                                                </Text>
                                            </View>
                                        ) : null}

                                        {item?.job_operation?.description ? (
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                                <Feather name="list" size={14} color="black"/>

                                                <Text style={{marginLeft: 5}}>{item?.job_operation?.description}</Text>
                                            </View>
                                        ) : null}

                                        {item?.payment_method?.name ? (
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 5}}>
                                                <FontAwesome5 name="money-bill" size={14} color="red"/>

                                                <Text style={{
                                                    color: 'red',
                                                    marginLeft: 5
                                                }}>{item.payment_method?.name}</Text>
                                            </View>
                                        ) : null}

                                        {item?.ww_lookups && item.ww_lookups.length > 0 && (
                                            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                <FontAwesome5 name="barcode" size={14} />
                                                <View>
                                                    {item.ww_lookups?.map((data, i) => (
                                                        <Text key={i} style={{ marginLeft: 7 }}>
                                                            {data?.resultEuroCode}
                                                        </Text>
                                                    ))}
                                                </View>
                                            </View>
                                        )}

                                        {user ? (
                                            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                                <FontAwesome5 name="tools" size={14} color="black"/>

                                                <Text
                                                    style={{marginLeft: 5}}>{user?.first_name + ' ' + user?.surname}</Text>
                                            </View>
                                        ) : null}
                                    </View>
                                )
                            }}
                            right={() => (
                                <Text style={{
                                    paddingHorizontal: 4,
                                    fontWeight: 'bold',
                                    color: getStatusColor(jobStatus?.name)
                                }}>
                                    {jobStatus?.name}
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
