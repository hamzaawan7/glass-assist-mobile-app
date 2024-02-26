import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ThemeProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";
import NetInfo from '@react-native-community/netinfo';

import 'react-native-get-random-values'

import Stack from "./src/navigation/Stack";

export default function App() {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Toast.show('Problem while connecting to internet', {
          textColor: 'red'
        });
      }
    });

    return () => {
      unsubscribe();
    }
  }, [])


  return (
    <ThemeProvider>
      <RootSiblingParent>
        <NavigationContainer>
          <Stack />
        </NavigationContainer>
      </RootSiblingParent>
    </ThemeProvider>
  );
}
