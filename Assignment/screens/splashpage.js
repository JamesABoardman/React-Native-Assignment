import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

class splashpage extends Component {
  render() {
    return (
      <View style={styling.container}>
        <Text style={styling.headerStyle}>Chittr</Text>
        <View style={[{flex: 1 }, styling.elementsContainer,]}>
          <View style={{ flex: 3 }}></View>
          <View style={{ flex: 4 }}>
            <Text style={styling.headerStyle2}>Welcome to Chittr.</Text>
          </View>
          <View
            style={{
              flex: 3,
            }}>
            <TouchableOpacity
              style={styling.btnPosition}
              onPress={() => this.props.navigation.navigate('Register')}>
              <View style={styling.btnStyle}>
                <Text style={styling.txt}>Sign Up</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styling.btnPosition}
              onPress={() => this.props.navigation.navigate('Login')}>
              <View style={styling.btnStyle}>
                <Text style={styling.txt}>Log in</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
export default splashpage;

const styling = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3A999C',
  },
  headerStyle: {
    fontSize: 70,
    fontWeight: '100',
    marginBottom: 24,
    marginLeft: 24,
    marginRight: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  elementsContainer: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },
  headerStyle2: {
    textAlign: 'center',
    fontSize: 30,
    color: '#383636',
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
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
});
