import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Header from "../shared/header";
import Home from "../screens/Home";

const screens = {
  Home: {
    screen: Home,
  },
};

// home stack navigator screens
const Stack = createStackNavigator();

const HomeStack = () => {
  const navigationOptions = ({ navigation }) => {
    return {
      headerTitle: () => <Header title="Ummeed" navigation={navigation} />,
    };
  };
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
};

export default HomeStack;
