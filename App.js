import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { ThemeProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";

import Stack from "./src/navigation/Stack";

export default function App() {
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
