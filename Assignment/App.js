import React from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import { Icon } from 'react-native-elements';

// Navigation
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';

// Screens
import splashscreen from './screens/splashpage'
import registerform from './screens/registerform'
import loginform from './screens/loginform'
import HomeScreen from './screens/HomeScreen'
import Profile from './screens/Profile'
import Search from './screens/Search'
import Chit from './screens/Chit'
import UserSettings from './screens/UserSettings'
import Followers from './screens/Followers'
import Following from './screens/Following'
import Logout from './screens/logout'
import CameraPage from './screens/CameraPage'
import OtherProfiles from './screens/OtherProfiles'
import ViewDrafts from './screens/ViewDrafts'
import UserPicture from './screens/UserPicture'

// Images
import burgerimage from './image/drawer.png'

//Primary page (Homapage) children (Draw / Bottom)

// StackNavigation for AboutScreen.
const HomeScreenStackNavigators = createStackNavigator({
  HomeScreen
},
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={burgerimage} style={{
            width: 25,
            height: 25,
            marginLeft: 5 }}/>
          </TouchableOpacity>
        )
      };
    }
  }
);

// StackNavigation for AboutScreen.
const ProfileScreenStackNavigators = createStackNavigator({
  Profile
},
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={burgerimage} style={{
            width: 25,
            height: 25,
            marginLeft: 5 }}/>
          </TouchableOpacity>
        )
      };
    }
  }
);

// StackNavigation for Logout.
const FollowersStackNavigators = createStackNavigator({
  Followers
},
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={burgerimage} style={{
              width: 25,
              height: 25,
              marginLeft: 5 }}/>
          </TouchableOpacity>
        )
      };
    }
  }
);
// StackNavigation for Logout.
const FollowingStackNavigators = createStackNavigator({
  Following
},
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={burgerimage} style={{
              width: 25,
              height: 25,
              marginLeft: 5 }}/>
          </TouchableOpacity>
        )
      };
    }
  }
);

// StackNavigation for Logout.
const UserSettingsStackNavigators = createStackNavigator({
  UserSettings
},
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={burgerimage} style={{
              width: 25,
              height: 25,
              marginLeft: 5 }}/>
          </TouchableOpacity>
        )
      };
    }
  }
);

// StackNavigation for Logout.
const LogoutStackNavigators = createStackNavigator({
  Logout
},
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={burgerimage} style={{
              width: 25,
              height: 25,
              marginLeft: 5 }}/>
          </TouchableOpacity>
        )
      };
    }
  }
);

// Creates the parent draw navigation using the stackNavigation's childs.
const AppDrawerNavigator = createDrawerNavigator({
  HomeScreen: {screen: HomeScreenStackNavigators },
  Followers: { screen: FollowersStackNavigators },
  Following: { screen: FollowingStackNavigators },
  Logout: { screen: LogoutStackNavigators },
});

// Bottom nav
const DashboardTabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: AppDrawerNavigator,
      navigationOptions: {
        tabBarIcon: ({}) => (
        <View>
          <Icon
          name='home' size={30}/>
        </View>

        ),
      }
    },
    Search: {
      screen: Search,
      navigationOptions: {
        tabBarIcon: ({}) => (
        <View>
          <Icon
          name='search' size={30}/>
        </View>

        ),
      }
    },
    Chit: {
      screen: Chit,
      navigationOptions: {
        tabBarIcon: ({}) => (
        <View>
          <Icon
          name='add' size={30}/>
        </View>

        ),
      }
    },
    Profile: {
      screen: Profile,
      navigationOptions: {
        tabBarIcon: ({}) => (
        <View>
          <Icon
          name='person' size={30}/>
        </View>

        ),
      }
    }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);

// Creates the switch naviagtion for switching between pages using forms.
const AppSwitchNavigator = createSwitchNavigator({
  splashscreen: { screen: splashscreen },
  Register: { screen: registerform },
  Login: { screen: loginform },
  UserSettings: { screen: UserSettings },
  Followers: { screen: Followers },
  Following: { screen: Following },
  CameraPage: { screen: CameraPage },
  HomeScreen: { screen: DashboardTabNavigator },
  OtherProfiles: { screen: OtherProfiles },
  ViewDrafts: { screen: ViewDrafts },
  UserPicture: { screen: UserPicture },
  Chit: { screen: Chit},
  Search: { screen: Search }
   });


const AppContainer = createAppContainer(AppSwitchNavigator);
export default AppContainer;
