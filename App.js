/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

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
import LoginScreen from './Login/Login'
import SignupScreen from './Signup/Signup'
import SignupScreen2 from './Signup/SignUpCompanyInfo'
import {MyApp, LoginApp} from './Navigators'

import {Container, Content, Header, Body, Icon} from 'native-base'

class App extends Component{
    render(){
        return(
            <MyApp />,
            <LoginApp />
        );
    }
}

export default App;
console.disableYellowBox = true;