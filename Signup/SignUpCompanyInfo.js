import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground
} from 'react-native';

export default class SignupScreen2 extends React.Component{
    constructor(props){
        super(props);
       this.state = {
            displayName:this.props.navigation.state.params.displayName,
            photo:this.props.navigation.state.params.photo,
            username:this.props.navigation.state.params.username,
            passwerd:this.props.navigation.state.params.passwerd,
            company: "",
       }
     }


     verifySignUp = () => {
          console.log('Called verifySignUp');

          url = 'http://10.9.5.153:8080/Netwerk/NetwerkBackend?functionToExecute=addNewUser&displayName=' + this.state.displayName + '&username=' + this.state.username
          + '&passwerd=' + this.state.passwerd + '&image=' + this.state.image + '&company=' + this.state.company + '&job=' + this.state.job + '&company=' + this.state.company +'&description=  ';
          fetch(url, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          })
          .then((response) => response.json())
          .then((responseJson) => {
             this.setState({
                  isLoading: false,
                  userData: responseJson.userData,
             }, function(){
                  console.log(responseJson);
                  if (responseJson != -1) {
                      this.props.navigation.navigate('Home', {userID: responseJson});
                  }
                  else Alert.alert("Username already taken.");
             });
          })
          .catch((error) =>{
              console.error(error);
          });
      }

    render(){

        return(
          <ImageBackground style={styles.container} source={require('./../assets/bg.jpg')}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>NETWERK </Text>
                    <View style={styles.Rectangle} />
                </View>
                <View style= {styles.formContainer} >
                     <TextInput
                        placeholder="Company Name"
                        style={styles.input}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ (companyName) => this.setState({companyName}) }

                      />
                      <TextInput
                        placeholder="Position"
                        style={styles.input}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ (position) => this.setState({position})}

                      />

                    <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7} onPress={() =>
                    this.props.navigation.navigate('Home')} >
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>


                </View>
            </ KeyboardAvoidingView>
          </ImageBackground>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    logoContainer: {
        flex: 1,
        marginBottom: 0,
    },

    Rectangle: {
        marginTop: 20,
        marginLeft: 63,
        width: 60,
        height: 8,
        backgroundColor: 'white'
    },

    title: {
        marginTop: 100,
        fontSize: 40,
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'white',
        marginLeft: 60,
        letterSpacing: 3
    },

    formContainer: {
        flex: 2,
        paddingVertical: 15,
    },

    input: {
        height: 45,
        backgroundColor: 'white',
        color: 'black',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        marginTop: 12,
        marginLeft: 60,
        marginRight: 60,
        letterSpacing: 0.5
    },

    buttonContainer: {
        marginTop: 40,
        marginLeft: 60,
        marginRight:60,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#E0224F'
    },

    buttonText: {
        textAlign: 'center',
        color: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0, 
            height: 2
        },
        fontSize: 15,
        fontWeight: 'bold',
        shadowOpacity: 0.8,
        shadowRadius: 5
    },

    smallText: {
        textAlign:'right', 
        color:'white', 
        marginTop:4, 
        marginRight: 64, 
        letterSpacing: 0.5
    },

    error: {
        color: 'red'
    }
});