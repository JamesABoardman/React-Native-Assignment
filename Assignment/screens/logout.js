import React, { Component } from 'react'; 
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'; 

class registerform extends Component {   
  render() {   
    return (   
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 6}}>
          <View style={{ flex: 3}}></View>
          <View style={{ flex: 2}}
          ><Text style={{textAlign: 'center', fontWeight: 'bold'}}>Are you sure you'd like to logout?</Text></View>
          <View style={{ flex: 1}}><TouchableOpacity style={styling.btnPosition}
            onPress={() => this.props.navigation.navigate('splashscreen')}>
            <View style={styling.btnStyle}><Text style={styling.btntxt}> logout </Text></View>
            </TouchableOpacity>
          </View>
        </View>        
      </View>     
    );   
  } 
} 
export default registerform; 

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

