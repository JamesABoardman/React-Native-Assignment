import React, { Component } from 'react'; 
import {View, TextInput, StyleSheet, Text, TouchableOpacity, Alert} from 'react-native'; 

export default class registerform extends Component { 
  constructor(props) {     
    super(props);   

    this.state = {
        given_name: '',
        family_name: '',
        email: '',
        password: ''
    }
}

    createUser = () => {
      if (this.state.given_name != '' && this.state.family_name !='' && this.state.email !='' && this.state.password !='') {  // Checks if the input is empty if so it will give an alert.
      return fetch('http://10.0.2.2:3333/api/v0.0.5/user/', { // Used to create a new user
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ // passes in all the params to create a new object.
          given_name: this.state.given_name, 
          family_name: this.state.family_name,
          email: this.state.email,
          password: this.state.password,}),

      }).then((response) => {
        if(response.status == 201) { // Response code 200.
          this.props.navigation.navigate('Login') // Navigate back to splash page
        }
        if(response.status == 400) { // If the request is made wrong
          Alert.alert("Bad Request") // Bad Request alert.
        }
      }).catch((error) => {
        console.error(error);
      });
     } else {
        Alert.alert("You're missing details"); // missinf values inside text inputs.
      }
    }

    render(){   
        return(     
          <View style={styling.container}>
          <Text style={styling.headerStyle}>Chittr</Text>
          <View style={[{flex: 1 }, styling.elementsContainer,]}>
          <TextInput style={styling.txtInputStyle} placeholder = 'enter firstname here' placeholderTextColor='black' onChangeText={(given_name) => {
                this.setState({given_name})}} value={this.state.given_name}></TextInput>
              <TextInput style={styling.txtInputStyle} placeholder = 'enter lastname here' placeholderTextColor='black' onChangeText={(family_name) => {
                this.setState({family_name})}} value={this.state.family_name}></TextInput>
              <TextInput style={styling.txtInputStyle} placeholder = 'enter email here' placeholderTextColor='black' onChangeText={(email) => {
                this.setState({email})}} value={this.state.email}></TextInput>
              <TextInput style={styling.txtInputStyle} placeholder = 'enter password here' placeholderTextColor='black' onChangeText={(password) => {
                this.setState({password})}} value={this.state.password}></TextInput>
            <View style={{ flex: 2 }}></View>

            <View style={[{ flex: 4 }, styling.txtContainer]}>

            </View><View style={{ flex: 2, }}></View>

          </View>
          <View></View>
          <TouchableOpacity
              style={styling.btnPosition}
              onPress={this.createUser}>
              <View style={styling.btnStyle}>
                <Text style={styling.txt}>Register</Text>
              </View>
            </TouchableOpacity> 
            <TouchableOpacity
              style={styling.btnPosition}
              onPress={() =>this.props.navigation.navigate('splashscreen')}>
              <View style={styling.btnStyle}>
                <Text style={styling.txt}>Back</Text>
              </View>
            </TouchableOpacity> 
        </View>
        );   
    } 
}

const styling = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'darkorange',
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
        fontSize: 15,
        fontWeight: '800',
        textAlign: 'center',
      },
      txtInputStyle: {
        alignItems: 'center',
        borderColor: 'black',
        textAlign: 'center',
       // marginBottom: 10,
        //backgroundColor: 'white'
      }
    });
  