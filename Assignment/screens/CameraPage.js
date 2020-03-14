import React, { Component } from 'react'; 
import { View, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'; 
import { RNCamera } from 'react-native-camera';

export default class CameraPage extends Component { 

  constructor(props){
    super(props);

    }

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
        Alert.alert("Picture Added!")
      })
      .catch((error) => {
        console.log(error);
      });
      }
    }

    takeChitPicture = async () => {
      if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);

      console.log(data.uri);

      return fetch('http://10.0.2.2:3333/api/v0.0.5/chits/'+window.$chit_id+'/photo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'image/jpeg',
          "X-Authorization": window.$TOKEN
        },
        body: data
      })
      .then((Response) => {
        Alert.alert("Picture Added!")
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
        onPress={this.takeChitPicture.bind(this)}
        style={styles.capture}>
        <Text style={{ fontSize: 16 }}>
        CAPTURE
        </Text>
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
  