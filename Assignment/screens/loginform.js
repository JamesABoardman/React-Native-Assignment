import React, { Component } from 'react'; 
import {View, TextInput, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native'; 

export default class loginform extends Component { 
  constructor(props){ 
    super(props);   

    this.state = {
        email: '',
        password: '',
    }
  }

    login = () => { 
      if (this.state.email != '' && this.state.password !='') {  // Checks if the input is empty if so it will give an alert.

      return fetch('http://10.0.2.2:3333/api/v0.0.5/login/', { // This will post the login if they match we'll get our response.
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: this.state.email,
            password: this.state.password
        })
      }).then((response) => {
        if (response.status == 200) { // This will only redirect if the status code == 200 "OK"
            response.json().then((responsejson) => {
              window.$TOKEN = responsejson.token; // Saves the the token response as a global variable.
              window.$ID = responsejson.id; // Saves the the id response as a global variable.
              //Alert.alert(responsejson.token+" "+ responsejson.id); // For Debugging.
              this.props.navigation.navigate('HomeScreen') // Navigates to the HomeScreen if login is correct
            })
          }
          if (response.status == 400) { // If the details are wrong it'll display an alert.
            alert('Wrong username or Password! Please try again!');
          }
        }).catch((error) => {
        console.error(error);
      });
      } else {
        Alert.alert("You're missing an email or password"); 
    }
  }

    render() {
        return(     
          <View style={styles.container}>
          <Text style={styles.headerStyle}>Chittr</Text>
          <View style={[{flex: 1 }, styles.elementsContainer]}>
            <View style={{ flex: 3 }}></View>
            <View style={[{ flex: 4 }, styles.txtContainer]}>
              <TextInput style={styles.txtInputStyle} placeholder = 'enter email here' placeholderTextColor='black' onChangeText={(email) => {
                this.setState({email})}} value={this.state.email}></TextInput>
              <TextInput secureTextEntry={true} style={styles.txtInputStyle} placeholder = 'enter password here' placeholderTextColor='black' onChangeText={(password) => {
                this.setState({password})}} value={this.state.password}></TextInput>
            </View>
            <View style={{ flex: 3, }}>
            </View>
            <TouchableOpacity
              style={styles.btnPosition}
              onPress={this.login}>
              <View style={styles.btnStyle}>
                <Text style={styles.txt}>login</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnPosition}
              onPress={() =>this.props.navigation.navigate('splashscreen')}>
              <View style={styles.btnStyle}>
                <Text style={styles.txt}>Back</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        );   
    } 
} 

const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'purple',
      },
      headerStyle: {
        fontSize: 70,
        fontWeight: '100',
        marginBottom: 24,
        marginLeft: 24,
        marginRight: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'left',
      },
      elementsContainer: {
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 24,
      },
      txtContainer: {
        alignItems: 'stretch',
      },
      btnPosition: {
        alignItems: 'center'
      },
      btnStyle: {
        backgroundColor: 'black',
        borderRadius: 20,
        padding: 5,
        marginBottom: 10,
        width: 100,
      },
      txt: {
        color: 'white',
        fontSize: 15,
        fontWeight: '800',
        textAlign: 'center',
      },
      txtInputStyle: {
        alignItems: 'center',
        borderColor: 'black',
        textAlign: 'center',
        marginBottom: 15,
      }
    });