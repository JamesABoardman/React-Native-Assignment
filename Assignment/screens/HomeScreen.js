import React, {Component} from 'react';
import {ActivityIndicator, Text, View, Button, ScrollView, FlatList, StyleSheet, Timestamp} from 'react-native';
import Moment from 'moment';

class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      Chitdatalist: []
    }
  }

  getChits() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/chits/').then((response) => response.json())
    .then((responseJson) => {
      this.setState({isLoading: false, Chitdatalist: responseJson});
    }).catch((error) => {
      console.log(error);
    });
  }
  
  componentDidMount() {
    this.getChits();
  }

  render() {
    if (this.state.isLoading) {
      return (<View>
        <ActivityIndicator/>
      </View>)
    }

    return (
      <View style={styling.container}>
        <FlatList nestedScrollEnabled={true} data={this.state.Chitdatalist} 
        renderItem= {({ item }) => (<View style={styling.listStyle}>
        <Text style={styling.txt}>{item.user.given_name+ " "+ item.user.family_name+" "+item.longitude+" "+ Moment(item.timestamp).format("DD:MM:YYYY HH:mm:ss")}</Text>
        <Text>{item.chit_content}</Text></View> )} keyExtractor={({ id }) => id}/>
      </View>);
  }
}
export default HomeScreen;

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
});
