/*  import React from "react";
import Hospital from "./components/Hospital";
//import Config from "./components/Config";
import Home from "./components/Home";
//import { NavigationBar, Icon } from "@shoutem/ui";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

const Drawer = createDrawerNavigator();

const App = () => {
  return (
    <View>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="Hospitals" component={Hospital} />
        </Drawer.Navigator>
      </NavigationContainer>
    </View>
  );
};

export default App;

export const AppNavigator = DrawerNavigator(Config.navigation);
AppRegistry.registerComponent("appName", () => AppNavigator);*/
import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Main from "./components/Main"
import Drawer from "./routes/drawer"

const getFonts = () =>
  Font.loadAsync({
    "nunito-regular": require("./assets/fonts/Nunito-Regular.ttf"),
    "nunito-bold": require("./assets/fonts/Nunito-Bold.ttf"),
  });

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return <Main />;
  } else {
    return (
      <AppLoading startAsync={getFonts} onFinish={() => setFontsLoaded(true)} />
    );
  }
}
