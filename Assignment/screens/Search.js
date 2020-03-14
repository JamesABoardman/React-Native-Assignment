import React, {Component} from 'react';
import {ActivityIndicator, Text, View, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert, Image} from 'react-native';

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {

      FollowingList: [{
        user_id: 0,
        given_name: '',
        family_name: '',
        email: ''
      }],
      users: [],
      q: '',
      test: false,
    }
  }

  viewOtherUsers(id) {
    this.props.navigation.navigate('OtherProfiles')
  }

  getSearch = () => {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q='+this.state.q).then((response) => response.json())
    .then((responseJson) => {
      this.setState({isLoading: false, users: responseJson});
      window.$id = []; //Empty Array to parse the USERID into.
      //console.log(this.state.FollowingList[0].user_id)
  
      this.state.users.forEach(myFunction);
      function myFunction(item) {
        window.$id.push(item.user_id) //Pushes the user_id's to the array
        //console.log(window.$id)
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  render() {
      return (
        <View style={styling.container}>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <TextInput style={styling.txtInputStyle} placeholder = 'enter search here' placeholderTextColor='black' onChangeText={(q) => { this.setState({q})}} value={this.state.q}></TextInput>
        <TouchableOpacity style={styling.searchbtnPosition} onPress={this.getSearch}>
          <View style={styling.btnStyle}>
            <Text style={styling.searchbtntext}>Search</Text>
          </View>
        </TouchableOpacity>
        </View> 
          <FlatList nestedScrollEnabled={true} data={this.state.users} 
          renderItem= {({ item }) => (<View style={styling.listStyle}>
          <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'grey'}}>
          <Image style={styling.circle} source={{uri: 'http://10.0.2.2:3333/api/v0.0.5/user/'+item.user_id+'/photo/'}}/>
          <View style={{flexDirection: 'column', justifyContent: 'center'}}>
          <Text style={styling.txt}>{item.given_name+ " "+ item.family_name+'\n'+item.email}</Text>
          <TouchableOpacity style={styling.btnPosition} onPress={() => { this.viewOtherUsers(window.$otherUser = item.user_id); } }>
                <View style={styling.btnStyle}>
                  <Text style={styling.btntxt}>View 
                  Profile</Text>
                </View>
              </TouchableOpacity> 
          </View>

          </View></View> )} keyExtractor={({ id }, index) => id}/>
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
  txtInputStyle: {
    //backgroundColor: 'red'
  },
  txt: {
    paddingBottom: 30
  },
  searchbtnPosition: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnPosition: {
    alignItems: 'flex-start',
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
    fontSize: 10,
    fontWeight: '800',
    textAlign: 'center',
  },
  searchbtntext: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  circle: {
    height: 100,
    width: 100,
    borderRadius: 30,
  }
});
