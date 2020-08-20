import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Linking,
  TextInput,
  Alert,
  Button,
} from "react-native";
import Card from "../shared/card";
import { useForm, Controller } from "react-hook-form";
import { Switch } from "react-native-switch";

const BookBed = ({ route, navigation }) => {
  const selHospital = route.params.selectedHospital;
  const [switchval, handleSwitchval] = useState(false);
  const [history, handleHistory] = useState("");
  const { control, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    data["Medical History"] = history;
    console.log(data);
    navigation.goBack();
    //push data by api here
  };

  let Attachhistory = null;
  if (switchval) {
    Attachhistory = (
      <Card>
        <Text> Attach medical history</Text>
        <Button
          title="Add patient history"
          onPress={() => {
            handleHistory("This is the medical history of patient");
          }}
        />
      </Card>
    );
  }

  return (
    <View>
      <Card>
        <Text styles={{ alignItems: "center", justifyContent: "center" }}>
          {selHospital.name}
        </Text>
      </Card>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Card>
            <Text>Name of patient</Text>

            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          </Card>
        )}
        name="Name"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.Name && <Text>This is required.</Text>}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Card>
            <Text>Phone Number of patient</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          </Card>
        )}
        name="PhoneNumber"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.PhoneNumber && <Text>This is required.</Text>}
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <Card>
            <Text>What happened</Text>
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          </Card>
        )}
        name="Occurence"
        defaultValue=""
      />
      <Switch
        value={switchval}
        onValueChange={(val) => {
          handleSwitchval(val);
          console.log(val);
        }}
        disabled={false}
        activeText={"Yes"}
        inActiveText={"No"}
        backgroundActive={"green"}
        backgroundInactive={"gray"}
        circleActiveColor={"#30a566"}
        circleInActiveColor={"#000000"}
        useNativeDriver={false}
        style={{ justifyContent: "center", flex: "1", alignItems: "center" }}
      />
      {Attachhistory}

      <Card>
        <Text>{history}</Text>
      </Card>

      <Button title="Submit" onPress={handleSubmit(onSubmit)} />
    </View>
  );
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
  input: {
    backgroundColor: "white",
  },
});

export default BookBed;
