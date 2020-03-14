import React, { Component } from 'react'; 
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Alert, PermissionsAndroid, AsyncStorage } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

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

  _storeDraft = async () => {
    //Get Object 
    try { 
    var DraftArray = AsyncStorage.getItem('DRAFTLIST');
    DraftArray = JSON.parse(DraftArray);
    DraftArray.push({data: this.state.chit_content.chit_id});
    AsyncStorage.setItem("DRAFTLIST", JSON.stringify(DraftArray));
    } catch(error){
      console.log(error);
    }
  }
  _DisplayDrafts = async () => {
    try {
    var response = AsyncStorage.getItem('DRAFTLIST');
    console.log(response);
    } catch(error){
      console.log(error);
    }
  }
  _removeDraft = async () => {
    try {

    } catch(error){
      console.log(error);
    }
  }

  async getprofile() {
    try {
      const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + window.$ID + "/");
      response.json().then((responseJson) => {
        this.setState({ user: responseJson });
      });
    }
    catch (error) {
      console.log(error);
    }
} 

  findCoordinates = () => {
    if(!this.state.locationPermission){
      this.state.locationPermission = requestLocationPermission();
    }

    Geolocation.getCurrentPosition((position) => {
      let longitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      let latitude = JSON.stringify(position.coords.latitude);
      this.state.location.longitude = Number(longitude);
      this.state.location.latitude = Number(latitude);
    },
      (error) => {
        Alert.alert(error.message)
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

    createPost = () => {
      return fetch('http://10.0.2.2:3333/api/v0.0.5/chits/', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          "X-Authorization": window.$TOKEN
        },
        
        body: JSON.stringify({
          timestamp: Number(new Date()),
          chit_content: this.state.chit_content,
          location: this.state.location,
          user_id: this.state.user.user_id,
          given_name: this.state.user.given_name,
          family_name: this.state.user.family_name,
          email: this.state.user.email,
          
          })
        }).then((response) => {
          if (response.status == 201) { // This will only redirect if the status code == 200 "OK"
            response.json().then((responsejson) => {
              window.$chit_id = responsejson.chit_id;
              this.props.navigation.navigate('HomeScreen')
            })
        }
      }).catch((error) => {
        console.error(error);
      });
    }

    render(){   
      if (this.state.isLoading) {
        return (<View>
          <ActivityIndicator/>
        </View>)
      }
        return(     
          <View style={styling.container}>
          <Text style={styling.headerStyle}>Chittr</Text>
          <View style={[{flex: 1 }, styling.elementsContainer,]}>
            <View style={{ flex: 2 }}></View>
            <View style={[{ flex: 4 }, styling.txtContainer]}>
            <TextInput maxLength={141} style={styling.txtInputStyle} placeholder = 'Type Chit' placeholderTextColor='black' onChangeText={(chit_content) => {
                this.setState({chit_content})}} value={this.state.chit_content}></TextInput>
            </View><View style={{ flex: 2 }}></View>
            <TouchableOpacity
              style={styling.btnPosition}
              onPress={this.findCoordinates}>
              <View style={styling.btnStyle}>
                <Text style={styling.txt}>Tag Location</Text>
              </View>
            </TouchableOpacity> 
            <TouchableOpacity
              style={styling.btnPosition}
              onPress={this.createPost}>
              <View style={styling.btnStyle}>
                <Text style={styling.txt}>Chit</Text>
              </View>
            </TouchableOpacity> 
            <TouchableOpacity
              style={styling.btnPosition}
              onPress={this._storeDraft}>
              <View style={styling.btnStyle}>
                <Text style={styling.txt}>Draft a chit</Text>
              </View>
            </TouchableOpacity> 

            <TouchableOpacity
              style={styling.btnPosition}
              onPress={this._DisplayDrafts}>
              <View style={styling.btnStyle}>
                <Text style={styling.txt}>View Drafts</Text>
              </View>
            </TouchableOpacity> 


          </View>

        </View>
        );   
    } 
}

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    {
    title: 'Lab04 Location Permission',
    message:
    'This app requires access to your location.',
    buttonNeutral: 'Ask Me Later',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
    },
    );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can access location');
        return true;
      } else {
        console.log('Location permission denied');
        return false;
      }
  } catch (err) {
      console.warn(err);
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