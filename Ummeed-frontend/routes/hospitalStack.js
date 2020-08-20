import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Header from "../shared/header";
import Hospital from "../screens/Hospital";
import HospitalDetails from "../screens/HospitalDetails";
import BookBed from "../screens/BookBed";

const Stack = createStackNavigator();

const HospitalStack = () => {
  const navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <Header title="Ummeed" navigation={navigation} />,
    };
  };
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Hospital"
        component={Hospital}
        options={{ title: "Hospitals Near You" }}
      />
      <Stack.Screen name="HospitalDetails" component={HospitalDetails} />
      <Stack.Screen name="Book Bed" component={BookBed} />
    </Stack.Navigator>
  );
};

export default HospitalStack;
