import React, { Component } from 'react'; 
import { Alert, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
//import loginform from './loginform';
export default class logout extends Component {  

  logoutFunc = () => {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/logout', { // Posts to log out using this api key.
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "X-Authorization": window.$TOKEN
        
      }
    }).then((response) => { // The repsonse from server

      if(response.status == 200) { // If response code is 200
        //console.log(response)
        this.props.navigation.navigate('splashscreen') // Navigate back to splashscreen
      }
      if(response.status == 401){ // If response code is 401
        Alert.alert("Unauthorised request") // Token in not correct or not authorised.
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {   
    return (   
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 6}}>
          <View style={{ flex: 3}}></View>
          <View style={{ flex: 2}}
          ><Text style={{textAlign: 'center', fontWeight: 'bold'}}>Are you sure you'd like to logout?</Text></View>
          <View style={{ flex: 1}}><TouchableOpacity style={styling.btnPosition}
            onPress={this.logoutFunc}>
            <View style={styling.btnStyle}><Text style={styling.btntxt}> logout </Text></View>
            </TouchableOpacity>
          </View>
        </View>        
      </View>     
    );   
  } 
}  

const styling = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  btnPosition: {
    alignItems: 'center'
  },
  btnStyle: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
    width: 100
  },
  btntxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center'
  }
});

