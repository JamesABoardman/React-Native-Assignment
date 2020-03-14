import React, {Component} from 'react';
import { ActivityIndicator, Text, View, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
//import base64 from 'react-native-base64'

class OtherProfiles extends Component {
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
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + id + '/follow/', {method: 'POST', headers: {
      "Content-Type": "application/json",
      "X-Authorization": window.$TOKEN
    },
  }).then((response) => {
    if(response.status == 200) {

      Alert.alert("User Followed")
    }
    if(response.status == 400) {
      Alert.alert("Already Following")
    }
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

  getFollowing() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+window.$ID+"/following/").then((response) => response.json())
    .then((responseJson) => {
      this.setState({isLoading: false, FollowingList: responseJson});
      window.$ez = []; //Empty Array to parse the USERID into.
      //console.log(this.state.FollowingList[0].user_id)
      this.state.FollowingList.forEach(myFunction);
      function myFunction(item, index) {
        window.$ez.push(item.user_id) //Pushes the user_id's to the array
        //console.log(window.$ez)
      }
   
    }).catch((error) => {
      console.log(error);
    });
  }

  getprofile() {
    return fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+ window.$otherUser +"/")
    .then((response) => {
      response.json().then((responseJson) => {
      this.setState({isLoading: false, new: responseJson});
      })
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
        <View style ={styling.container2}>
        <Image style={styling.circle} source={{uri: 'http://10.0.2.2:3333/api/v0.0.5/user/'+window.$otherUser+'/photo/'}}/>
        <Text style={styling.tx2}>{this.state.new.given_name+" "+this.state.new.family_name}</Text>
        {this.TestFunc() ? <TouchableOpacity style={styling.btnPosition} onPress={() => { this.unFollow(window.$otherUser); } }>
                <View style={styling.btnStyle}>
                  <Text style={styling.btntxt}>Unfollow</Text>
                </View>
              </TouchableOpacity>: <TouchableOpacity style={styling.btnPosition} onPress={() => { this.follow(window.$otherUser); } }>
                  <View style={styling.btnStyle}>
                    <Text style={styling.btntxt}>Follow</Text>
                  </View>
          </TouchableOpacity>
          }

        </View>
        <FlatList style ={styling.con} nestedScrollEnabled={true} data={this.state.new.recent_chits} 
        renderItem= {({ item }) => (<View style={styling.listStyle}>
          <Text style={styling.tx2}>{this.state.new.email}</Text>
        <Text style={styling.tx2}>{item.chit_content}</Text></View> )} keyExtractor={({ id }) => id}/>
      </View>);
  }
}
export default OtherProfiles;

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
    height: 100,
    width: 100,
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
  btntxt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  }
});
