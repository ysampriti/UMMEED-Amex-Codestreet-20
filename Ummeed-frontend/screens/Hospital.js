import React, { useState,useEffect } from "react";
import {
  Linking,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { Button } from "react-native-elements";
import Card from "../shared/card";
//import HospitalDetails from "./HospitalDetails";


const Hospital = ({ navigation }) => {
  const [hospitals, setHospitals] = useState([]);
  useEffect(() => {
        async function fetchHospitals(){
           fetch('http://localhost:3001/', {
              method: 'GET',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              }
            }).then(res=>res.json()).then(res=>{console.log(res);setHospitals(res)}).catch(err=>{
              console.log(err);
            });
      }
      fetchHospitals();
  }, [])
     
    

  const HospitalList = hospitals.map((item, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => {
          navigation.navigate("HospitalDetails", { hospital: item });
        }}
      >
        <Card>
          <Text> Hospital Name : {item.name}</Text>
          <Text>Number of free beds : {item.freeBeds}</Text>
          <Text>Number of free ventilators : {item.freeVentilators}</Text>
          <Text>Phone Number : {item.phone}</Text>
        </Card>
      </TouchableOpacity>
    );
  });

  return <View style={styles.container}>{HospitalList}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 10,
  },
});

export default Hospital;

/*
export default function ReviewDetails({ navigation }) {
  const rating = navigation.getParam('rating');
  
  return (
    <View style={globalStyles.container}>
      <Card>
        <Text style={globalStyles.titleText}>
          { navigation.getParam('title') }
        </Text>
        <Text>{ navigation.getParam('body') }</Text>
        <View style={styles.rating}>
          <Text>GameZone rating: </Text>
          <Image source={images.ratings[rating]} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rating: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 16,
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  }
});*/
