import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import Stack from "./src/navigations/Stack";
import { ThemeProvider } from "react-native-paper";
import { RootSiblingParent } from "react-native-root-siblings";

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
