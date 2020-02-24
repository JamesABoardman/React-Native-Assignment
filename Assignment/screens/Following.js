import React, {Component} from 'react';
import {ActivityIndicator, Text, View, Button, ScrollView, FlatList, StyleSheet} from 'react-native';


class Following extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      FollowingList: []
    }
  }

  getFollowing() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+window.$ID+"/following/").then((response) => response.json()).then((responseJson) => {

      this.setState({isLoading: false, FollowingList: responseJson});

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
        <View style={styling.cont}>
        <FlatList style ={styling.con} nestedScrollEnabled={true} data={this.state.FollowingList} 
        renderItem= {({ item }) => (<View style={styling.listStyle}>
        <Text style={styling.txt}>{item.given_name+ " "+ item.family_name}</Text>
        <Text style={styling.tx2}>{}</Text><Text style={styling.tx2}>{item.email}</Text></View>
        )} keyExtractor={({ id }, index) => id}/>
      </View>);
  }
}
export default Following;

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
