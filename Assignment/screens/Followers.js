import React, {Component} from 'react';
import {ActivityIndicator, Text, View, FlatList, StyleSheet, Image} from 'react-native';

export default class Followers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      FollowersList: []
      
    }
  }

  // This method uses a GET/ REQUEST to get all of a users followers.
  async getFollowers() {
    try {
      const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + window.$ID + "/followers/");
      const responseJson = await response.json();
      if (response.status == 200) { // This will only redirect if the status code == 200 "OK".
        this.setState({ isLoading: false, FollowersList: responseJson }); // Sets the response to the object inside the state.
      }
      if (response.status == 404) { // This will display an alert to screen if there is an Error with getting the user Followers.
        Alert.alert(" User Followers could not be found ")
      }
    }
    catch (error) { // Catches any errors and shows the warning in console.
      console.warn(error);
    }
  }

  componentDidMount() {
    this.getFollowers();
  }

  render() {
    if (this.state.isLoading) {
      return (<View>
        <ActivityIndicator/>
      </View>)
    }
    return (
      <View style={styles.Container}>
        <FlatList nestedScrollEnabled={true} data={this.state.FollowersList} 
        renderItem= {({ item }) => (<View style={styles.ListStyle}>
        <View style={styles.FollowingContainer}>
          <Image style={styles.UserImageStyle} source={{uri: 'http://10.0.2.2:3333/api/v0.0.5/user/'+ item.user_id +'/photo'}}/>
          <View style={styles.UserDetailContainer}>
            <Text style={styles.UserNameStyle}>{item.given_name+ " "+ item.family_name}</Text>
            <Text>{item.email}</Text>
          </View>
        </View>
      </View> )} keyExtractor={({ id }, index) => id}/>
        
        </View>);
  }
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    padding: 0,
  },
  ListStyle: {
    padding: 10,
    borderWidth: 5,
    borderColor: 'lightgrey',
  },
  FollowingContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  UserImageStyle: {
    backgroundColor: 'red',
    height: 50,
    width: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: 'black'
  },
  UserDetailContainer: {
    flexDirection: 'column',
    paddingLeft: 10
  },
  UserNameStyle: {
    fontWeight: 'bold'
  },
});
