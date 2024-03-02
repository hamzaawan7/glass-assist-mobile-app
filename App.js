import React, { useLayoutEffect, useState } from "react";
import { View, ActivityIndicator, AppState } from 'react-native';

import { ThemeProvider, Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { StatusBar } from 'expo-status-bar';

import 'react-native-get-random-values'

import Stack from "./src/navigation/Stack";
import instance from "./src/api/axios";

const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();

  console.log(`Got background fetch call at date: ${new Date(now).toISOString()}`);

  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 15, // 15 minutes
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

// 3. (Optional) Unregister tasks by specifying the task name
// This will cancel any future background fetch calls that match the given name
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function App() {
  const [initialScreen, setInitialScreen] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useLayoutEffect(() => {
    setIsLoading(true);
    checkStatusAsync();

    const unsubscribe = NetInfo.addEventListener(async state => {
      if (!state.isConnected) {
        const updateBooking = await AsyncStorage.getItem(`update-booking`);

        if (updateBooking) {
          const request = JSON.parse(updateBooking);

          try {
            const res = await instance.put(
              request.route,
              request.payload
            );

            const { data, success } = res.data;
            console.log(data);

            if (success) {
              Toast.show(`Saved successfully`, {
                duration: Toast.durations.LONG,
              });
            }

            setIsLoading(false);
          } catch (error) {
            console.error(error.response.data);
            setIsLoading(false);
            Toast.show(`${error.response.data?.message}`, {
              duration: Toast.durations.LONG,
            });
          }

          await AsyncStorage.removeItem(`update-booking`);
        }
      }
    });

    const subscription = AppState.addEventListener('change', async nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (isRegistered) {
          await unregisterBackgroundFetchAsync();
        }
      } else {
        await registerBackgroundFetchAsync();
      }

      appState.current = nextAppState;
      checkStatusAsync()
      console.log('AppState', appState.current);
    });

    AsyncStorage.getItem("access_token")
      .then(token => {
        setIsLoading(false);

        if (token) {
          instance.defaults.headers.common['Authorization'] = 'Bearer ' + token;

          setInitialScreen('Home');
        } else {
          setInitialScreen('Login');
        }
      })
      .catch(error => {
        setInitialScreen('Login');

        console.log(error);
        setIsLoading(false);
      });

    return () => {
      unsubscribe();
      subscription.remove();
    }
  }, [initialScreen]);

  const checkStatusAsync = async () => {
    console.log('[STATUS]: ', await BackgroundFetch.getStatusAsync());
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setIsRegistered(isRegistered);
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator animating={true} color='#74BCCF' />
      </View>
    );
  }

  return (
    <PaperProvider>
      <StatusBar style="auto" backgroundColor="red" translucent={false} />

      <ThemeProvider>
        <RootSiblingParent>
          <Stack initialScreen={initialScreen} />
        </RootSiblingParent>
      </ThemeProvider>
    </PaperProvider>
  );
}
