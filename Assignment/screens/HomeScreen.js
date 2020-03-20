import React, { Component } from 'react';
import { View, ActivityIndicator, FlatList, Text, StyleSheet, Image } from 'react-native';
import Geocoder from 'react-native-geocoding';

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      isHidden: false,
      isFetching: false,
      Chitslistdata: [],
      
    }
  }

      getChits() {
        Geocoder.init("AIzaSyCnhPmJgB1FJPP58ziM2PIPDf9CVBLJ4bk"); // Key to access an api.
        return fetch('http://10.0.2.2:3333/api/v0.0.5/chits').then((response) => response.json()) // Calls for data using a get.
        .then((responseJson) => {
          responseJson.forEach(item => { // Loops through the response.
            if (item.location) { // If the property location is undefined.
              Geocoder.from(item.location.latitude, item.location.longitude) // Get the reverse geo location using the latitude and longitude
              .then(json => {
                item.address = json.results[8].formatted_address; // Creates a new property and pushes the location to it.
                this.setState({ isFetching: false, isLoading: false, Chitslistdata: responseJson }); // sets the state to the response inside the loop so that we get the new property we created.
              }).catch(error => console.warn(error)); // Catches any errors and will warn them.
            }   
          });
        }).catch((error) => {
          console.log(error);
        });
      }

      onRefresh() {
        this.setState({ isFetching: true }, function() { this.getChits() });
     }

  componentDidMount() {
    this.getChits();
  }

  render() {
    if (this.state.isLoading) {
      return (<View>
        <ActivityIndicator />
      </View>)
    }

    return (
      <View style={styles.container}>
        <FlatList nestedScrollEnabled={true} data={this.state.Chitslistdata} onRefresh={() => this.onRefresh()}
      refreshing={this.state.isFetching} renderItem={({ item }) => (
          <View style={styles.ListStyle}>
            <View style={styles.UpperSection}>
              <Image style={styles.UserChitImage} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + item.user.user_id + '/photo' }} />
              <View style={styles.UpperTextSplit}>
                <View style={styles.UpperTextRow}>
                  <Text style={styles.EmailStyle}>{item.user.email}</Text>
                  <Text style={styles.LocationStyle}>{item.address}</Text>
                </View>
                  <Text style={styles.DateStyle}>{new Date(item.timestamp).toDateString()}</Text>
              </View>
            </View>
            <View style={styles.LowerSection}>
              <Text style={styles.ChitContentStyle}>{item.chit_content}</Text>
              <Image style={styles.ChitImageStyle} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + item.chit_id + '/photo' }} />
            </View>
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
  ListStyle: {
    padding: 10,
    borderWidth: 5,
    borderColor: 'lightgrey',
  },
  UpperSection: {
    flexDirection: 'row',
    paddingBottom: 10,
  },
  UserChitImage: {
    height: 50,
    width: 50,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
    padding: 30
  },
  UpperTextSplit: {
    paddingLeft: 5,
    paddingTop: 0,
    flexDirection: 'column',
  },
  UpperTextRow: {
    flexDirection: 'row'
  },
  EmailStyle: {
    paddingRight: 120,
    fontWeight: 'bold'
  },
  LocationStyle: {
    backgroundColor: 'green',
    borderRadius: 2,
    paddingLeft: 5,
    paddingRight: 5
  },
  DateStyle: {
    color: 'grey'
  },
  LowerSection: {
    backgroundColor: 'grey',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
  },
  ChitContentStyle: {
    paddingLeft: 5
  },
  ChitImageStyle: {
    height: 150,
    width: 300,
  },
});
