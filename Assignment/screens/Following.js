import React, {Component} from 'react';
import {ActivityIndicator, Text, View, Button, ScrollView, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

class Following extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      FollowingList: []
    }
  }

  getFollowing() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+window.$ID+"/following/").then((response) => response.json())
    .then((responseJson) => {
      this.setState({isLoading: false, FollowingList: responseJson});
    }).catch((error) => {
      console.log(error);
    });
  }

  unFollow(id){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/follow/', {method: 'delete', headers: {
      "Content-Type": "application/json",
      "X-Authorization": window.$TOKEN
    },
  }).then((response) => {
      if(response.status == 200) {
        Alert.alert("User Unfollowed")
      }
      if(response.status == 400){
        Alert.alert("User Not following")
      }
    }).catch((error) => {
      
      console.log(error);
    });
  }
  
  componentDidMount() {
    this.getFollowing();
  }

  render() {
    if (this.state.isLoading) {
      return (<View>
        <ActivityIndicator/>
      </View>)
    }

    return (
      <View style={styling.container}>
        <FlatList nestedScrollEnabled={true} data={this.state.FollowingList} 
        renderItem= {({ item }) => (<View style={styling.listStyle}>
        <Text style={styling.txt}>{item.given_name+ " "+ item.family_name}</Text>
        <Text>{item.email}</Text>
        <TouchableOpacity style={styling.btnPosition} onPress={() => { this.unFollow(item.user_id); } }>
                <View style={styling.btnStyle}>
                  <Text style={styling.btntxt}>Unfollow</Text>
                </View>
              </TouchableOpacity>
        </View> )} keyExtractor={({ id }, index) => id}/>
      </View>);
  }
}
export default Following;

const styling = StyleSheet.create({
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
  btnPosition: {
    alignItems: 'flex-start'
  },
  btnStyle: {
    backgroundColor: 'black',
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
    width: 100,
  },
  btntxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  }
});
