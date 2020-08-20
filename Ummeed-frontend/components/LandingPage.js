import * as React from 'react';
import { Text, View, StyleSheet, Image, Button, Alert } from 'react-native';

const Separator = () => (
  <View style={styles.separator} />
);
export default function LandingPage(props) {
  return (
      <View>
  
          <View style={styles.container}>
          <Text style={styles.paragraph}>
          Local files and assets can be imported by dragging and dropping them into the editor
          </Text>
          <Image style={styles.logo} source={require('../assets/logo1.png')} />
          </View>
      <Separator />
      <Button
        title="Register"
        onPress={() => props.data.changeRegisterState(true)} />
      <Separator />
      <Button
        title="Login" />
      <Separator />
      <Button
        title="Call an Ambulance"
        onPress={() => props.data.changeAmbulanceState(true)}/>
      <Separator />
      </View>  
  );
}

const styles = StyleSheet.create({
    container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 120,
    width: 200,
  },
  separator: {
    marginVertical: 8,
  },
});
