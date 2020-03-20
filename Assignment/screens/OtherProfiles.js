import React, {Component} from 'react';
import { ActivityIndicator, Text, View, FlatList, StyleSheet, TouchableOpacity, Image, TouchableHighlight } from 'react-native';
//import base64 from 'react-native-base64'

export default class OtherProfiles extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      image: '',
      new: {
          user_id: 0,
          given_name: '',
          family_name: '',
          email: '',
          recent_chits: [],
      }
    }
  }

  follow(id){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/follow/', {method: 'POST', headers: { // Makes a post request to follow a user.
      "Content-Type": "application/json",
      "X-Authorization": window.$TOKEN
    },
  }).then((response) => { // Response to request
    if(response.status == 200) {  // response status 200 OK
      console.log("Followed Successfully")
    }
    if(response.status == 401){   // response status 400
      Alert.alert("Unauthorised request") // Not the authentication to do this
    }
    if(response.status == 404) { // can't find user error
      Alert.alert("Not found")
    }
    }).catch((error) => {
      console.log(error);
    });
  }

  unFollow(id){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/follow/', {method: 'delete', headers: { // Makes a delete request to unfollow a user.
      "Content-Type": "application/json",
      "X-Authorization": window.$TOKEN
    },
  }).then((response) => { // Response to request
      if(response.status == 200) { // response status 200 OK
        console.log("Unfollowed Successfully")
      }
      if(response.status == 401) { // response status 400
        Alert.alert("Unauthorised request") // Not the authentication to do this
      }
      if(response.status == 404) { // can't find user error
        Alert.alert("Not found")
      }
    }).catch((error) => {
      
      console.log(error);
    });
  }

  getprofile() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+ window.$otherUser +"/") // Used to get the user details for a another user.
    .then((response) => {
      if (response.status == 200) { //If response is 200
      response.json().then((responseJson) => {
      this.setState({isLoading: false, new: responseJson}); // set the state.
      })}
      if (response.status == 400) { // If the response is 400.
        Alert.alert("Bad Request") // Bad request response.
      }
      if (response.status == 404) { // If the response is 404.
        Alert.alert("User details cannot be found") // User not found response.
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  TestFunc = () => {
    console.log(window.$otherUser)
    console.log(window.$ez)
    return window.$ez.includes(window.$otherUser);
    }


  componentDidMount() {
    this.getprofile();
  }

  render() {
    if (this.state.isLoading) {
      return (<View>
        <ActivityIndicator/>
      </View>)
    }

    return (
      <View>
        <View style ={styles.FirstContainer}>
          <Image style={styles.ProfileImage} source={{uri: 'http://10.0.2.2:3333/api/v0.0.5/user/'+ window.$otherUser +'/photo'}}/>
          <Text style={styles.NameStyle}>{this.state.new.given_name+" "+this.state.new.family_name}</Text>
        </View>
        <View style={styles.NavigationSection}>
        {this.TestFunc() ? <TouchableOpacity style={styles.btnPosition} onPress={() => { this.unFollow(window.$otherUser); } }>
                <View style={styles.btnStyle}>
                  <Text style={styles.btntxt}>Unfollow</Text>
                </View>
              </TouchableOpacity> : <TouchableOpacity style={styles.btnPosition} onPress={() => { this.follow(window.$otherUser); } }>
                  <View style={styles.btnStyle}>
                    <Text style={styles.btntxt}>Follow</Text>
                  </View>
          </TouchableOpacity>
          }
          <TouchableOpacity style={styles.btnPosition} onPress={() => {this.props.navigation.navigate('HomeScreen') } }>
                  <View style={styles.btnStyle}>
                    <Text style={styles.btntxt}>Back</Text>
                  </View>
          </TouchableOpacity>
        </View>

<FlatList style ={styles.SecondContainer} nestedScrollEnabled={true} data={this.state.new.recent_chits} 
renderItem= {({ item }) => (
  <View style={styles.ListStyle}>

  <View style={styles.UpperSection}>
    <Image style={styles.UserChitImage} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + window.$otherUser + '/photo' }} />

    <View style={styles.UpperTextSplit}>

      <View style={styles.UpperTextRow}>
        <Text style={styles.EmailStyle}>{this.state.new.email}</Text>
      </View>

        <Text style={styles.DateStyle}>{new Date(item.timestamp).toDateString()}</Text>
    </View>
  </View>
  <View style={styles.LowerSection}>

    <Text style={styles.ChitContentStyle}>{item.chit_content}</Text>
    <Image style={styles.ChitImageStyle} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + item.chit_id + '/photo' }} />
    </View></View>)} keyExtractor={({ id }) => id} />
    </View>);
  }
}

const styles = StyleSheet.create({

  FirstContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'grey'
  },
  ProfileImage: {
    height: 150,
    width: 150,
    borderRadius: 75,
    borderColor: 'black',
    borderWidth: 2
  },
  NameStyle: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  UpperSplitSection: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: 'grey'
  },
  ButtonPosition: {
    alignItems: 'center',
  },
  ButtonStyle: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
    width: 50,
  },
  NavigationSection: {
    backgroundColor: 'darkgrey',
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  NavigationButtonStyle: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
    width: 100,
  },
  NavigationButtonTextStyle: {
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  SecondContainer: {
    //backgroundColor: 'white',
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
    //borderWidth: 1,
    //borderColor: 'black',
    //backgroundColor: 'red',
  },
  UserChitImage: {
    //backgroundColor: 'red',
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
    //borderWidth: 2,
    //borderColor: 'black',
    //borderRadius: 1,
    //backgroundColor: 'grey'
  },
});
