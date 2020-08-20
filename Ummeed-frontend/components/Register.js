import React from 'react'
import {
  View,
  Button,
  TextInput,
  StyleSheet
} from 'react-native'

export default class SignUp extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '', password: '', email: '', phone: null, age:'',
      bloodgrp:'', gender:'', history:'', insurance:'', level:0,userId:null,
      ec1 : '', ec2 : ''
    }
  }
  onChangeText = (key, val) => {
    this.setState({ [key]: val })
  }
  changeLevel(){
    const { name, password, email, phone } = this.state
    
    this.setState({
      level:1
    })
  }
  updateProfile = () => {
    const { age, gender, bloodgrp, history, insurance } = this.state
    var id;
     fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: this.state.name,
          phone: this.state.phone,
          age:this.state.age,
          bloodgrp:this.state.bloodgrp,
          history:this.state.history,
          insurance:this.state.insurance,
          password:this.state.password,
        })
      }).then(res=>res.json()).then(res=>{id = res._id}).catch(err=>{
        console.log(err);
      });
      this.setState({
        level: 2,
        userId : id
      })
  }

  updateEC(){
    const { ec1, ec2 } = this.state
    var newEC = [];
    if(ec1.length>0) newEC.push(ec1);
    if(ec2.length>0) newEC.push(ec2);
    fetch('http://localhost:3001/addEmergencyContact', {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userPhone: this.state.phone,
          newEC : newEC
        })
      }).then(res=>res.json()).then(res=>{}).catch(err=>{
        console.log(err);
      });
      console.log(this.state);
      this.props.data.changeLoginState(true,{
        name : this.state.name,
        phone : this.state.phone,
        age : this.state.age,
        bloodgrp : this.state.bloodgrp,
        history : this.state.history,
        insurance : this.state.insurance,
        userId : this.state.userId,
      })
  }
 
  render() {
    if(this.state.level==0){
      return (
        <View style={styles.container}>
          <TextInput id
            style={styles.input}
            placeholder='Name'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('name', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Password'
            secureTextEntry={true}
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('password', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Email'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('email', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Phone Number'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('phone', val)}
          />
          <Button
            title='Register'
            onPress={this.changeLevel.bind(this)}
          />
        </ View>
      )
    }
    else if(this.state.level == 1){
      return(
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            value = {this.state.age}
            placeholder='Age'
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('age', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Gender'
            value = {this.state.gender}
            defaultValue = ''
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('gender', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Blood Group'
            value = {this.state.bloodgrp}
            defaultValue = ''
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('bloodgrp', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='History'
            value = {this.state.history}
            defaultValue = ''
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('history', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Insurance Number(if applicable)'
            value = {this.state.insurance}
            defaultValue = ''
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('insurance', val)}
          />
          <Button
            title='Update Profile'
            onPress={this.updateProfile.bind(this)}
          />
        </View>
      )
    }
    else{
      return (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            placeholder='Emergency Contact 1'
            value = {this.state.ec1}
            defaultValue = ''
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('ec1', val)}
          />
          <TextInput
            style={styles.input}
            placeholder='Emergency Contact 2(optional)'
            defaultValue = ''
            default = ''
            value = {this.state.ec2}
            autoCapitalize="none"
            placeholderTextColor='white'
            onChangeText={val => this.onChangeText('ec2', val)}
          />
          <Button
            title='Finish'
            onPress={this.updateEC.bind(this)}
          />
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  input: {
    width: 350,
    height: 55,
    backgroundColor: '#42A5F5',
    margin: 10,
    padding: 8,
    color: 'white',
    borderRadius: 14,
    fontSize: 18,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})