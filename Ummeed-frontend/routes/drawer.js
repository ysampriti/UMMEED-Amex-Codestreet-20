import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

// stacks
//import HomeStack from "./homeStack";
import AmbulanceStack from "./ambulanceStack";
import HospitalStack from "./hospitalStack";
import Home from "../screens/Home.js";

// drawer navigation options
const Drawer = createDrawerNavigator();

const Navigator = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Hospitals" component={HospitalStack} />
        <Drawer.Screen name="Ambulances" component={AmbulanceStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
