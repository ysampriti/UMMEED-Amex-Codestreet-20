import * as React from 'react';
import { Text, View, StyleSheet, Image, Button, Alert } from 'react-native';
import LandingPage from './LandingPage.js'
import Register from './Register.js'

import Navigator from "../routes/drawer";
import Ambulance from "../screens/Ambulance";
class Main extends React.Component {
  constructor(){
    super();
    this.state={
      loggedIn:false,
      registerState:false,
      profile:null, 
      ambulanceState : false
    }
  }
  changeRegisterState(regState){
    this.setState({
      registerState:regState
    })
  }
  changeAmbulanceState(ambState){
    this.setState({
      ambulanceState:ambState
    })
  }
  changeLoginState(logState,profile){
    this.setState({
      loggedIn : logState,
      profile : profile
    })
  }
  render(){
     if(this.state.loggedIn){
      console.log(this.state.profile);
       return (
          <Navigator />
       )
     }
     else if(this.state.registerState){
       return(
          <Register data={{
            changeLoginState : this.changeLoginState.bind(this)
          }} />
       )
     } 
     else if(this.state.ambulanceState){
      return(
        <Ambulance />
      )

     }
     else{
       return(
         <LandingPage data={{
           changeRegisterState:this.changeRegisterState.bind(this),
          changeAmbulanceState:this.changeAmbulanceState.bind(this)}} />
       )
     }
  }
}
export default Main