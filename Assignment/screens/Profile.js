import React, {Component} from 'react';
import { ActivityIndicator, Text, View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
//import base64 from 'react-native-base64'

class Profile extends Component {
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

  getprofile() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+window.$ID+"/")
    .then((response) => {
      response.json().then((responseJson) => {
      this.setState({isLoading: false, new: responseJson});
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
        <View style ={styling.container2}>
        <Image style={styling.profileImg} source={{uri: 'http://10.0.2.2:3333/api/v0.0.5/user/'+window.$ID+'/photo/'}}/>
          <Text style={styling.tx2}>{this.state.new.given_name+" "+this.state.new.family_name}</Text>
        </View>
        <FlatList style ={styling.con} nestedScrollEnabled={true} data={this.state.new.recent_chits} 
        renderItem= {({ item }) => (<View style={styling.listStyle}>
          <Image style={styling.circle} source={{uri: 'http://10.0.2.2:3333/api/v0.0.5/user/'+window.$ID+'/photo/'}}/>
          <Text style={styling.tx2}>{this.state.new.email}</Text>
        <Text style={styling.tx2}>{item.chit_content}</Text>
        <Image style={styling.ChitImg} source={{ uri: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + item.chit_id + '/photo' }} /></View> )} keyExtractor={({ id }) => id}/>
      </View>);
  }
}
export default Profile;

const styling = StyleSheet.create({
  cont: {
    //backgroundColor: 'white',
    padding: 0,
  },
  container2: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  circle: {
    //backgroundColor: 'red',
    height: 50,
    width: 50,
    borderRadius: 30,
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
  txtz: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  ChitImg: {
    height: 50,
    width: 100,
    //borderRadius: 30,
  },
  profileImg: {
    height: 100,
    width: 100
  }
});
