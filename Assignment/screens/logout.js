import React, { Component } from 'react'; 
import { Alert, View, StyleSheet, Text, TouchableOpacity } from 'react-native';

class logout extends Component {   

  logoutFunc = () => {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      }
    }).then((response) => {
      console.log(response)

      Alert.alert("Logged out")
      //if(response == 200) {
        this.props.navigation.navigate('splashscreen')
      //}
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
export default logout; 

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

