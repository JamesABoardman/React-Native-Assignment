import React, {Component} from 'react';
import {ActivityIndicator, Text, View, Button, ScrollView, FlatList, StyleSheet, Alert} from 'react-native';

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      UserProfile: {
        user_id: '',
        given_name: '',
        family_name: '',
        email: '',
        Chitdatalist: [],
      }   
    }
  }

  getprofile() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+window.$ID+"/")
    .then((response) => {
      response.json().then((responseJson) => {
      this.setState({isLoading: false, Profiles: responseJson});
      })
    }).catch((error) => {
      console.log(error);
    });
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
      <View style={styling.cont}>
        <FlatList style ={styling.con} nestedScrollEnabled={true} data={this.state.Chitdatalist} 
        renderItem= {({ item }) => (<View style={styling.listStyle}>
        <Text style={styling.txt}>{item.given_name+ " "+ item.family_name}</Text>
        <Text style={styling.tx2}>{item.chit_content}</Text></View>
        )} keyExtractor={({ id }, index) => id}/>
      </View>);
  }
}
export default Profile;

const styling = StyleSheet.create({
  cont: {
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
});
