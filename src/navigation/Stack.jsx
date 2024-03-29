import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import Login from "../screens/Login/Login";
import Home from "../screens/Home/Home";
import Tech from "../screens/Tech/Tech";

const { Screen, Navigator } = createNativeStackNavigator();

export default function Stack({ initialScreen }) {
  return (
    <NavigationContainer>
      <Navigator initialRouteName={initialScreen}>
        <Screen name="Login" options={{ headerShown: false }} component={Login} />
        <Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Screen
          name="Tech"
          component={Tech}
          options={{
            presentation: "modal",
          }}
        />
      </Navigator>
    </NavigationContainer>
  );
}



