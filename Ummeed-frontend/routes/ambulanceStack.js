import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Header from "../shared/header";
import Ambulance from "../screens/Ambulance";
import AmbulanceDetails from "../screens/AmbulanceDetails";

const Stack = createStackNavigator();

const AmbulanceStack = () => {
  const navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <Header title="Ummeed" navigation={navigation} />,
    };
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Ambulance"
        component={Ambulance}
        options={{ title: "Ambulances Near You" }}
      />
      <Stack.Screen name="AmbulanceDetails" component={AmbulanceDetails} />
    </Stack.Navigator>
  );
};

export default AmbulanceStack;
