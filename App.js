import React, { useLayoutEffect, useState } from "react";
import { View, ActivityIndicator } from 'react-native';

import { ThemeProvider, Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

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

  useLayoutEffect(() => {
    setIsLoading(true);
    checkStatusAsync();

    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Toast.show('Problem while connecting to internet', {
          textColor: 'red'
        });
      }
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
    }
  }, [initialScreen]);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    console.log(status);
    console.log(isRegistered);
  };

  const toggleFetchTask = async () => {
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
    }

    checkStatusAsync();
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
      <ThemeProvider>
        <RootSiblingParent>
          <Stack initialScreen={initialScreen} />
        </RootSiblingParent>
      </ThemeProvider>
    </PaperProvider>
  );
}
