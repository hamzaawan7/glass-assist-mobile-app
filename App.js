import React, { useLayoutEffect, useState } from "react";
import { View, ActivityIndicator } from 'react-native';

import { ThemeProvider, Provider as PaperProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from "@react-native-async-storage/async-storage";

import 'react-native-get-random-values'

import Stack from "./src/navigation/Stack";
import instance from "./src/api/axios";

export default function App() {
  const [initialScreen, setInitialScreen] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useLayoutEffect(() => {
    setIsLoading(true);

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
  }, [initialScreen])

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
