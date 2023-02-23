import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/Login/Login";
import Home from "../screens/Home/Home";
import Tech from "../screens/Tech/Tech";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { Screen, Navigator, Group } = createNativeStackNavigator();

export default function Stack() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      setToken(JSON.parse(token));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navigator initialRouteName="Login">
      <Group>
        {!token ? (
          <Screen name="Login" options={{ headerShown: false }}>
            {(props) => <Login {...props} setToken={setToken} />}
          </Screen>
        ) : (
          <>
            <Screen name="Home">
              {(props) => <Home {...props} setToken={setToken} />}
            </Screen>
            <Screen
              name="Tech"
              component={Tech}
              options={{
                presentation: "modal",
              }}
            />
          </>
        )}
      </Group>
    </Navigator>
  );
}
