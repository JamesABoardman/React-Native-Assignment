import React, { Component } from 'react'; 
import {View, TextInput, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native'; 

class UserSettings extends Component { 
  constructor(props) {     
    super(props);   

    this.state = {
        given_name: '', //State Firstname
        family_name: '', //State Lastname
        email: '', //State email
        password: '' //State password
    }
}

    UpdateUser = () => {
      return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+window.$ID+'/', {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": window.$TOKEN
        },
        body: JSON.stringify({
          given_name: this.state.given_name,
          family_name: this.state.family_name,
          email: this.state.email,
          password: this.state.password,}),

      }).then((response) => {
        console.log(response);
        Alert.alert("User details updated!");
        if(response.status == 201) {
          this.props.navigation.navigate('splashscreen')
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    render(){   
        return(     
          <View style={styling.container}>
          <Text style={styling.headerStyle}>Chittr</Text>
          <View style={[{flex: 1 }, styling.elementsContainer,]}>
            <View style={{ flex: 2 }}></View>
            <View style={[{ flex: 4 }, styling.txtContainer]}>
            <TextInput style={styling.txtInputStyle} placeholder = 'enter firstname here' placeholderTextColor='black' onChangeText={(given_name) => {
                this.setState({given_name})}} value={this.state.given_name}></TextInput>
              <TextInput style={styling.txtInputStyle} placeholder = 'enter lastname here' placeholderTextColor='black' onChangeText={(family_name) => {
                this.setState({family_name})}} value={this.state.family_name}></TextInput>
              <TextInput style={styling.txtInputStyle} placeholder = 'enter email here' placeholderTextColor='black' onChangeText={(email) => {
                this.setState({email})}} value={this.state.email}></TextInput>
              <TextInput style={styling.txtInputStyle} placeholder = 'enter password here' placeholderTextColor='black' onChangeText={(password) => {
                this.setState({password})}} value={this.state.password}></TextInput>
            </View><View style={{ flex: 2, }}></View>
            <TouchableOpacity
              style={styling.btnPosition}
              onPress={this.UpdateUser}>
              <View style={styling.btnStyle}>
                <Text style={styling.txt}>Register</Text>
              </View>
            </TouchableOpacity> 
          </View>
        </View>
        );   
    } 
}
export default UserSettings; 

const styling = StyleSheet.create({
      container: {
        flex: 1,
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
        //justifyContent: 'center'
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
        marginBottom: 10,
        //backgroundColor: 'white'
      }
    });
  