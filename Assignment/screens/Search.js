import React, {Component} from 'react';
import {ActivityIndicator, Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      q: '',
      FollowingList: []

    }
  }

  componentDidMount() {
    this.getFollowing();
  }

  getFollowing() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+window.$ID+"/following/").then((response) => response.json())
    .then((responseJson) => {
      this.setState({isLoading: false, FollowingList: responseJson});
    }).catch((error) => {
      console.log(error);
    });
  }

  componentDidMount() {
    this.getFollowing();
  }

  follow(id){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/follow/', {method: 'POST', headers: {
      "Content-Type": "application/json",
      "X-Authorization": window.$TOKEN
    },
  }).then((response) => {
      this.getFollowing();
    }).then((response) => {
      Alert.alert("User Followed")
    }).catch((error) => {
      console.log(error);
    });
  }

  unFollow(id){
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/follow/', {method: 'delete', headers: {
      "Content-Type": "application/json",
      "X-Authorization": window.$TOKEN
    },}).then((response) => {
      this.getFollowing();
    }).then((response) => {
      Alert.alert("User Unfollowed")
    }).catch((error) => {
      console.log(error);
    });
  }

  getSearch = () => {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+this.state.q).then((response) => response.json())
    .then((responseJson) => {
      this.setState({isLoading: false, users: responseJson});
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
    return (
      <View style={styling.container}>
        <TextInput style={styling.txtInputStyle} placeholder = 'enter search here' placeholderTextColor='black' onChangeText={(q) => { this.setState({q})}} value={this.state.q}></TextInput>
        <TouchableOpacity style={styling.btnPosition} onPress={this.getSearch}>
              <View style={styling.btnStyle}>
                <Text style={styling.btntxt}>Search</Text>
              </View>
            </TouchableOpacity>  
        <FlatList nestedScrollEnabled={true} data={this.state.users} 
        renderItem= {({ item }) => (<View style={styling.listStyle}>
        <Text style={styling.txt}>{item.given_name+ " "+ item.family_name+ " "+ item.email}</Text>
        
        <TouchableOpacity style={styling.btnPosition} onPress={() => { this.follow(item.user_id); } }>
              <View style={styling.btnStyle}>
                <Text style={styling.btntxt}>Follow</Text>
              </View>
            </TouchableOpacity>  

            <TouchableOpacity style={styling.btnPosition} onPress={() => { this.unFollow(item.user_id); } }>
              <View style={styling.btnStyle}>
                <Text style={styling.btntxt}>Unfollow</Text>
              </View>
            </TouchableOpacity>  
        </View> )} keyExtractor={({ id }, index) => id}/>
      </View>
      );
  }
}
export default Search;

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
    alignItems: 'center'
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
