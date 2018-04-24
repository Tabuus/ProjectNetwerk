import React, { Component } from 'react';

import {
    AppRegistry,
    StyleSheet,
    View,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    ImageBackground,
    Alert,
    AsyncStorage
} from 'react-native';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class LoginScreen extends React.Component{
static navigationOptions = {
    drawerLabel:(
        <Text style={{fontSize:20, color: 'white', padding:20}}>Log Out</Text>
    ),
    drawerIcon:(
        <Image source={require('./../assets/logOut.png')}/>
    )
}

constructor(props){
   super(props);
   this.state ={ 
        isLoading: true,
        userID: ''
    }
 }

verifyLogin = () => {
    console.log('Called verifyLogin');
    url = 'http://10.9.5.153:8080/NetwerkBackend/NetwerkBackend?functionToExecute=verifyLogin&username=' + this.state.username + '&password=' + this.state.password;
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
             if (responseJson != -1) {
                AsyncStorage.setItem('userID', this.state.userID);
                AsyncStorage.getItem('userID').then((value)=>{
                    console.log("Logged in user: " + value)
                })
                this.props.navigation.navigate('Home');
             }
             else Alert.alert("Invalid credentials. Please try again!");
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
                <View style={styles.formContainer}>
                    <Text style={styles.title}>NETWERK </Text>
                    <View style={styles.Rectangle} />
                    <TextInput
                        placeholder=" Username or Email"
                        style={styles.input}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ (username) => this.setState({username})}
                    />

                    <TextInput secureTextEntry={true} 
                        placeholder=" Password"
                        style={styles.input}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ (password) => this.setState({password})}
                    />

                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('GuestHomeScreen')}>
                        <Text style={styles.smallText}>preview as guest </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7} onPress={this.verifyLogin}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.smallText}>don't have an account?</Text>
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
        backgroundColor: 'white',
        marginBottom: 20
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