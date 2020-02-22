import React, { Component } from 'react'; 
import {View, TextInput, StyleSheet, Text, TouchableOpacity} from 'react-native'; 

class loginform extends Component{ 
  constructor(props){     
    super(props);   
    this.state = {
      email: '', //State email
      password: '', //State password
    }
  } 
    render() {
        return(     
          <View style={styling.container}>
          <Text style={styling.headerStyle}>Chittr</Text>
          <View style={[{flex: 1 }, styling.elementsContainer,]}>
            <View style={{ flex: 3 }}></View>
            <View style={[{ flex: 4 }, styling.txtContainer]}>
              <TextInput style={styling.txtInputStyle} placeholder = 'enter email here' placeholderTextColor='black' onChangeText={(email) => {
                this.setState({email})}} value={this.state.email}></TextInput>
              <TextInput style={styling.txtInputStyle} placeholder = 'enter password here' placeholderTextColor='black' onChangeText={(password) => {
                this.setState({password})}} value={this.state.password}></TextInput>
            </View>
            <View style={{ flex: 3, }}>

            <TouchableOpacity
              style={styling.btnPosition}
              onPress={() => this.props.navigation.navigate('HomeScreen')}>
              <View style={styling.btnStyle}>
                <Text style={styling.txt}>login</Text>
              </View>
            </TouchableOpacity>    
            </View>
          </View>
        </View>
        );   
    } 
} 
export default loginform; 

const styling = StyleSheet.create({
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
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
      },
      txtInputStyle: {
        alignItems: 'center',
        borderColor: 'black',
        textAlign: 'center',
        marginBottom: 15
      }
    });
  