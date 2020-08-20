import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Linking, Image, Button } from "react-native";
import Card from "../shared/card";

const AmbulanceDetails = ({ route, navigation }) => {
  callNumber = (number) => {
    Linking.openURL("tel:${" + number + "}");
  };

  const Ambulance = route.params;
  //console.log(Ambulance.Ambulance.image);
  //console.log(type(Ambulance.Ambulance.image));

  return (
    <View>
      <Card>
        <Text>{Ambulance.ambulance.name}</Text>
        <Text>{Ambulance.ambulance.body}</Text>
        <Image source={{ uri: Ambulance.ambulance.image }} />
      </Card>
      <Button
        onPress={() => callNumber(Ambulance.ambulance.number)}
        title="Call Ambulance"
      ></Button>
      <Button
        title="Go to Ambulance list"
        onPress={() => navigation.navigate("Ambulance")}
      ></Button>
    </View>
  );
};

export default AmbulanceDetails;
