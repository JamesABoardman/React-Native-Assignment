import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, Text, StyleSheet, Image } from 'react-native';
import Geocoder from 'react-native-geocoding';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isHidden: false,
      Chitslistdata: [{
        chit_id: '',
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
      }],
    }
  }

  reversegeocoder() {
    Geocoder.init("MY_API_KEY");
  //  if (typeof (window.$lat === 'undefinded') || typeof (window.$long === 'undefinded')) {
  //    window.$addressComponent = 'NO LOCATION'
  //    console.log(window.$lat);
  //  }
  //  else {
      Geocoder.from(window.$lat, window.$long).then(json => {
        window.$addressComponent = json.results[0].formatted_address;
      }).catch(error => console.warn(error));
   //y }
  }
  async getChits() {
    try {
      const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits?start=5&count=1');
      const responseJson = await response.json();
      this.setState({ isLoading: false, Chitslistdata: responseJson });
    }
    catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getChits();
    this.reversegeocoder();
  }

  render() {
    if (this.state.isLoading) {
      return (<View>
        <ActivityIndicator />
      </View>)
    }

    return (
      <View style={styles.container}>
        <FlatList nestedScrollEnabled={true} data={this.state.Chitslistdata} renderItem={({ item }) => (
          <View style={styles.listStyle}>
            <Image style={styles.circle} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + item.user.user_id + '/photo/' }} />
            <Text style={styles.txt}>{new Date(item.timestamp) + '\n' + item.user.email}</Text>
            <Text>{item.chit_content}</Text>
            <Text>{window.$long = item.location.longitude}</Text>
            <Text>{window.$lat = item.location.latitude} </Text>
            <Text>{window.$addressComponent}</Text>
            <Image style={styles.ChitImg} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + item.chit_id + '/photo' }} />
          </View>)} keyExtractor={({ id }) => id} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 0,
  },
  listStyle: {
    padding: 10,
    borderWidth: 15,
    borderColor: 'lightgrey',
  },
  txt: {
    paddingBottom: 30
  },
  circle: {
    //backgroundColor: 'red',
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  ChitImg: {
    height: 50,
    width: 100,
    //borderRadius: 30,
  },
});
