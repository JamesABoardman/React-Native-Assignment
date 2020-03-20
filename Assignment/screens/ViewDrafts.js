import React, {Component} from 'react';
import {ActivityIndicator, Text, View, FlatList, StyleSheet, AsyncStorage, Button, TouchableOpacity, TextInput} from 'react-native';

export default class ViewDrafts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timestamp: 0,
      chit_content: '',
      location: {
        longitude: 0,
        latitude: 0,
      },
        user: {
          user_id: 0,
          given_name: '',
          family_name: '',
          email: ''
        },
    }
  }
     // Method for storing a draft in AsyncStorage (Local Storage).
     _storeDraft = async () => {
      try { 
        this._DisplayDrafts().then(result => {
          console.log("Result"+result);
          var DraftArray = result;
          console.log("Here"+DraftArray)
          DraftArray.push({ data: this.state.chit_content })
          AsyncStorage.setItem("@DRAFTLIST", {data: DraftArray}); // Passes the Draft array back into local storage.
          var test = AsyncStorage.getItem('@DRAFTLIST')
          console.log("Herere" + test);
        })
      } catch(error) { // Catches any errors and shows the warning in console.
          console.warn(error);
      }
    }
    
      _DisplayDrafts = async () => {
          try {
            var DraftArray = [];
          
            DraftArray = AsyncStorage.getItem('@DRAFTLIST'); // Gets the objects already saved in local storage.
            DraftArray = JSON.parse(DraftArray)
            console.log("Type"+typeof(DraftArray), DraftArray);
            if (DraftArray.length > 0 ) {
            console.log("DRaft arara"+DraftArray[0])
            DraftArray = JSON.parse(DraftArray); // Parses the objects to JSON.
            DraftArray.push({chit_content: this.state.chit_content}); // Pushes the data to the array.
            AsyncStorage.setItem("@DRAFTLIST", JSON.stringify(DraftArray)); // Passes the Draft array back into local storage.
            console.log(DraftArray);
            } else {
              DraftArray.push({chit_content: this.state.chit_content}); // Pushes the data to the array.
              AsyncStorage.setItem("@DRAFTLIST", JSON.stringify(DraftArray)); // Passes the Draft array back into local storage.
            }
          }
          catch(error) {
              console.warn(error);
          }
      }
      
      
      /*_DisplayDrafts = async () => {
      try {
        var DraftArray =[];
        DraftArray.push({chit_content: this.state.chit_content}); // Pushes the data to the array.
        await AsyncStorage.setItem('DRAFTLIST', JSON.stringify(DraftArray));
        DraftArray = await AsyncStorage.getItem('DRAFTLIST');
        if (DraftArray !== null) {
          // We have data!!
          console.log(JSON.parse(DraftArray));
        }
      } catch (error) {
        // Error saving data
      }
    }*/

      


  componentDidMount() {
    //this._storeDraft;
    this._DisplayDrafts;
  }
  componentDidUpdate() {
    this._DisplayDrafts;
  }



  render() {
    if (this.state.isLoading) {
      return (<View>
        <ActivityIndicator/>
      </View>)
    }
    return (
      <View style={styles.container}>
        <TextInput maxLength={141} style={styles.txtInputStyle} placeholder = 'Type Chit' placeholderTextColor='black' onChangeText={(chit_content) => {
         this.setState({chit_content})}} value={this.state.chit_content}></TextInput>
            <TouchableOpacity
              style={styles.btnPosition}
              onPress={() => this.props.navigation.navigate('HomeScreen')}>
              <View style={styles.btnStyle}>
                <Text style={styles.txt}>Back to chit</Text>
              </View>
            </TouchableOpacity> 
            <TouchableOpacity
              style={styles.btnPosition}
              onPress={this._storeDraft}>
              <View style={styles.btnStyle}>
                <Text style={styles.txt}>Draft a chit</Text>
              </View>
            </TouchableOpacity> 
        <FlatList nestedScrollEnabled={true} data={window.$test} 
        renderItem= {({ item }) => (<View style={styles.listStyle}>
        <Text style={styles.txt}>{item.data}</Text>
        <Button title={'Remove item'} onPress={this._removeDraft}></Button>
        </View> )} keyExtractor={({ id }, index) => id}/>
      </View>);
  }
}

const styles = StyleSheet.create({
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
  headerStyle: {
    fontSize: 70,
    fontWeight: '100',
    marginBottom: 24,
    marginLeft: 24,
    marginRight: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
    textAlign: 'left',
  },
  elementsContainer: {
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24,
  },
  txtContainer: {
    alignItems: 'stretch',
    //justifyContent: 'center'
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
  txt: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  txtInputStyle: {
    alignItems: 'center',
    borderColor: 'black',
    textAlign: 'center',
    marginBottom: 10,
    //backgroundColor: 'white'
  }
});
