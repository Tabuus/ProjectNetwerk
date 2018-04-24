import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  AppRegistry
} from 'react-native';

import {DrawerNavigator, DrawerItems, StackNavigator} from 'react-navigation'
import MessagesScreen from './Messages'
import SettingsScreen from './Settings'
import ConnectScreen from './SwipeCards'
import ProfileScreen from './Profile'
import SearchScreen from './Search'
import LoginScreen from "./Login/Login"
import SignupScreen from "./Signup/Signup"
import SignupScreen2 from "./Signup/SignUpCompanyInfo"
import LocationChange from "./LocationChange"
import OtherProfile from "./OtherProfile.js"
import Chat from "./Chat"
import GuestHomeScreen from "./GuestHomeScreen"

import {Container, Content, Header, Body, Icon} from 'native-base'

AppRegistry.registerComponent('MyApp', () => MyApp);

const CustomDrawerContentComponent = (props) =>(
    <Container>
        <Content style={styles.drawerBackground}>
            <DrawerItems {...props} />
        </Content>
    </Container>
)

export const MyApp = DrawerNavigator({
    Home: {
        screen: ConnectScreen
    },
    Search: {
        screen: SearchScreen
    },
    Profile: {
        screen: ProfileScreen
    },
    Messages: {
        screen: MessagesScreen
    },
    Settings:{
        screen: SettingsScreen
    },
    LogOut:{
        screen: LoginScreen
    },
    
},{
    contentOptions: {
        activeTintColor: 'white',
        inactiveTintColor: 'white',
        activeBackgroundColor: '#bf1e44',
        itemsContainerStyle: {
          marginVertical: 0,
        },
       iconContainerStyle: {
         opacity: 1
       }
      },
    initialRouteName: 'Home',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'

});

export const LoginApp = StackNavigator({
    Login: {screen: LoginScreen},
    Signup: {screen: SignupScreen},
    Signup2: {screen: SignupScreen2},
    Drawer: {screen: MyApp},
    OtherProfile: {screen: OtherProfile},
    Chat:{screen: Chat},
    GuestHomeScreen:{screen:GuestHomeScreen},
    LocationChange: {screen: LocationChange},
    },{
        navigationOptions: {
          header: false,
        }
    },
    {
        initialRouteName: 'Login',
    }
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerBackground: {
    backgroundColor: '#E0224F',
    shadowRadius: 10
  }
});