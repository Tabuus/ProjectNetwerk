import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ImageBackground,
  AsyncStorage,
  Alert
} from 'react-native';

export default class SignupScreen extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            isLoading: true,
            userID: '',
            image: '',
        }
     }

     verifySignUp = () => {
       console.log('Called verifySignUp');
       url = 'http://10.9.5.153:8080/NetwerkBackend/NetwerkBackend?functionToExecute=addNewUser&displayName=' + this.state.displayName + '&username=' +
        this.state.username  + '&passwerd=' + this.state.passwerd + '&image=' + this.state.image +
        '&company=' + this.state.company + '&job=' + this.state.job  +'&description=  ';
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
                        userID : JSON.stringify(responseJson)
                  }, function(){
                       console.log(responseJson);
                       if(responseJson == -1){
                          Alert.alert("Username taken.");
                      }else if(responseJson == -2) Alert.alert("Please type in all the valid fields.");
                       else {
                          AsyncStorage.setItem('userID', this.state.userID);
                          AsyncStorage.getItem('userID').then((value)=>{
                              console.log("Signed up user: " + value);
                              this.props.navigation.navigate('Home');
                          })
                      }

                  });
               })
               .catch((error) =>{
                   console.error(error);
               });
    }

    render(){
        return(
          <ImageBackground style={styles.container} source={require('./../assets/bg.jpg')}>
             <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>

                <View style= {styles.formContainer} >

                     <TextInput
                        placeholder="First and Last Name"
                        style={styles.input}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ (displayName) => this.setState({displayName})}
                      />

                      <TextInput
                        placeholder="Image URL"
                        style={styles.input}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ (image) => this.setState({image}) }

                      />

                      <TextInput
                        placeholder="Username"
                        style={styles.input}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ (username) => this.setState({username}) }

                      />
                     <TextInput
                        placeholder="Password"
                        secureTextEntry={true} 
                        style={styles.input}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ (passwerd) => this.setState({passwerd}) }
                     />
                     <TextInput
                        placeholder="Company Name"
                        style={styles.input}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ (company) => this.setState({company}) }

                       />
                       <TextInput
                        placeholder="Position"
                        style={styles.input}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ (job) => this.setState({job}) }

                       />

                    <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7} onPress={this.verifySignUp}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={styles.smallText}>have an account?</Text>
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
        marginTop: 60,
        flex: 2.5,
        paddingVertical: 17,
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
        marginTop: 16,
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