import React, { Component } from 'react'; 
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'; 
import { RNCamera } from 'react-native-camera';

export default class CameraPage extends Component { 

  constructor(props){
    super(props);
  }

  // This function is used to take a picture for a user and save the image in base64.
  takeUserPicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      console.log(data.uri);

      return fetch('http://10.0.2.2:3333/api/v0.0.5/user/photo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'image/jpeg',
          "X-Authorization": window.$TOKEN
        },
        body: data
      })
      .then((Response) => {
        if (Response.status == 201) { //If the post in successful then
          this.props.navigation.navigate('HomeScreen'); // Naviagte to homepage if successful
          }
          if (Response.status == 400) { //If the post had an error
            Alert.alert("This is a bad request") // give this response
          }
          if (Response.status == 401) { //If the post does not have authentication
            Alert.alert("You're not authorised to use this function"); // give this response
          }
          if (Response.status == 404) { //If the post does not contain a photo
            Alert.alert("Have you suddenly forgot how to take a photo"); // give this response
          }
      })
      .catch((error) => {
        console.log(error);
      });
      }
    }

    render() {
    return (
    <View style={styles.container}>
    <RNCamera ref= {ref => { this.camera = ref;}} style={styles.preview} />
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
      <TouchableOpacity
        onPress={this.takeUserPicture.bind(this)}
        style={styles.capture}>
        <Text style={{ fontSize: 16 }}>CAPTURE</Text>
      </TouchableOpacity>
      </View>
    </View>
    );
    }
   }
   
   const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      flexDirection: 'column' 
    },
    preview: { 
      flex: 1, 
      justifyContent: 'flex-end', 
      alignItems: 'center' 
    },
    capture: { 
      flex: 0, 
      borderRadius: 5, 
      padding: 15, 
      paddingHorizontal: 20,
      alignSelf: 'center', 
      margin: 20 
    }
   });
  