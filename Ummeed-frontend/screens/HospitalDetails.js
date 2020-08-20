import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Linking, Image, Button } from "react-native";
import Card from "../shared/card";

const HospitalDetails = ({ route, navigation }) => {
  

  const Hospital = route.params.hospital;
  console.log(Hospital.image);
  console.log(typeof Hospital.image);

  return (
    <View>
      <Card>
        <Text>{Hospital.name}</Text>
        <Text>{Hospital.body}</Text>
        <Image source={{ uri: Hospital.image }} />
      </Card>
      <Button
        title="Go to hospital list"
        onPress={() => navigation.navigate("Hospital")}
      ></Button>
      <Button
        title="Book a Bed"
        onPress={() => {
          navigation.navigate("Book Bed", { selectedHospital: Hospital });
        }}
      ></Button>
    </View>
  );
};

export default HospitalDetails;
