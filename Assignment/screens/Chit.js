import React, { Component } from 'react'; 
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, PermissionsAndroid, AsyncStorage } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Icon } from 'react-native-elements';

// This function is used to create a a permission request on the android application.
async function requestLocationPermission() {
  try {
      const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Lab04 Location Permission',
        message: 'This app requires access to your location.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
  } catch (error) {
      console.warn(error);
  }
}

export default class Chit extends Component {
  constructor(props) {     
    super(props);   

    this.state = {
      timestamp: 0,
      chit_content: '',
      location: {
        longitude: 0,
        latitude: 0,
      },
        user: {
          user_id: 0,
          given_name: '',
          family_name: '',
          email: ''
        },
          locationPermission: false,
    }
  }

  // Get's the user information using a GET/ REQUEST.
  async getprofile() {
    try {
      const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + window.$ID + "/"); // Makes the request setting it as a const getting the response stored in that variable.
      response.json().then((responseJson) => {
        if (response.status == 200) { // This will only redirect if the status code == 200 "OK"
          this.setState({ user: responseJson }); // Sets the response to the object inside the state.
        }
        if (response.status == 404) { // This will display an alert to screen if there is an Error with getting the user details.
          Alert.alert(" User Details could not be found ")
        }
      });
    }
    catch (error) { // Catches any errors and shows the warning in console.
        console.warn(error);
    }
} 

  // Finds the current coordinates and saves them in state to be used for tagging a location.
  findCoordinates = () => {
    if(!this.state.locationPermission) { // Asks for permissions to use location using the function requestLocationPermission().
      this.state.locationPermission = requestLocationPermission();
    }

    Geolocation.getCurrentPosition((position) => { // Get's the current location using Geolocation API.
      let longitude = JSON.stringify(position.coords.longitude); // Sets the longitude to a local variable "longitude"
      let latitude = JSON.stringify(position.coords.latitude); // Sets the latitude to a local variable "latitude"
      this.state.location.longitude = Number(longitude);  
      this.state.location.latitude = Number(latitude);
    },
      (error) => { // Catches any errors and shows the warning in console.
        console.warn(error.message)
      },
        {
          enableHighAccuracy: true, 
          timeout: 20000,
          maximumAge: 1000
        }
      );
    };
    
componentDidMount() {
  this.getprofile();
}

    // This function makes a POST/ REQUEST sending the data to create a chit.
    createPost = async () => {
      if (this.state.chit_content != '') {  // If to prevent sending an empty chit.
      try {
        const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits/', {
          method: 'POST',
          // Sets the header for authentication and to declare that the data being sent is in JSON.
          headers: {
            "Content-Type": "application/json",
            "X-Authorization": window.$TOKEN
          },
          // sets the variables in the body to be sent to the server.
          body: JSON.stringify({
            timestamp: Number(new Date()),
            chit_content: this.state.chit_content,
            location: this.state.location,
            user_id: this.state.user.user_id,
            given_name: this.state.user.given_name,
            family_name: this.state.user.family_name,
            email: this.state.user.email,
          })
        });
        if (response.status == 201) { // This will only redirect if the status code == 201 "OK"
          response.json().then((responsejson) => {
            window.$chit_id = responsejson.chit_id; // Sets the chit in a global variable to be used to add a picture.
            //this.props.navigation.navigate('HomeScreen'); // Navgates to the homepage if the request is bad.
      
          });
          if (response.status == 401) { // This will display an alert to screen if there is an Error with posting the chit.
            Alert.alert(" Cannot process response (Unauthorised)");
          }
        }
      }
      catch (error) {
        console.warn(error);
      }
      } else {
        Alert.alert("Urm, this is awkward. You need to type a chit"); 
      }
    }

    render(){   
      if (this.state.isLoading) {
        return (<View>
          <ActivityIndicator/>
        </View>)
      }
        return(     
          <View style={styles.Container}>
          <Text style={styles.HeaderStyle}>Chittr</Text>
          <View style={[{flex: 1 }, styles.ComponentsContainer]}>
            <View style={{ flex: 2 }}></View>
            <View style={[{ flex: 4 }, styles.TextInputPosition]}>
            <TextInput maxLength={141} style={styles.TextInputStyle} placeholder = 'Type Chit' placeholderTextColor='black' onChangeText={(chit_content) => {
                this.setState({chit_content})}} value={this.state.chit_content}></TextInput>
                            <TouchableOpacity
              style={styles.ButtonPosition}
              onPress={this.findCoordinates}>
              <View style={styles.ButtonStyle}>
              <Icon name='add-location' size={30}/>
              </View>
            </TouchableOpacity> 
            </View><View style={{ flex: 2 }}></View>

            <TouchableOpacity
              style={styles.ButtonPosition}
              onPress={() => this.props.navigation.navigate('CameraPage')}>
              <View style={styles.ButtonStyle}>
              <Icon name='add-a-photo' size={30}/>
              </View>
            </TouchableOpacity> 
            <TouchableOpacity
              style={styles.ButtonPosition}
              onPress={this.createPost}>
              <View style={styles.ButtonStyle}>
              <Icon name='add' size={30}/>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.ButtonPosition}
              onPress={() => this.props.navigation.navigate('ViewDrafts')}>
              <View style={styles.ButtonStyle}>
                <Text style={styles.ButtonText}>View Drafts</Text>
              </View>
            </TouchableOpacity> 
          </View>
        </View>
        );   
    } 
}

const styles = StyleSheet.create({
      Container: {
        flex: 1,
        backgroundColor: 'darkorange',
      },
      HeaderStyle: {
        fontSize: 70,
        fontWeight: '100',
        marginBottom: 24,
        marginLeft: 24,
        marginRight: 24,
        fontWeight: 'bold',
        fontStyle: 'italic',
        textAlign: 'left',
      },
      ComponentsContainer: {
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 24,
      },
      TextInputPosition: {
        alignItems: 'stretch',
        //justifyContent: 'center'
      },
      TextInputStyle: {
        alignItems: 'center',
        borderColor: 'black',
        textAlign: 'center',
        marginBottom: 10,
        //backgroundColor: 'white'
      },
      ButtonPosition: {
        alignItems: 'center'
      },
      ButtonStyle: {
        backgroundColor: 'grey',
        borderRadius: 20,
        padding: 5,
        marginBottom: 10,
        width: 100,
      },
      ButtonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: '800',
        textAlign: 'center',
      },

    });