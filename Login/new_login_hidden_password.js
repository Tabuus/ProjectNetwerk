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
    Dimensions
} from 'react-native';

import PasswordInputText from 'react-native-hide-show-password-input';

export default class LoginScreen extends React.Component{
static navigationOptions = {
    drawerLabel:(
        <Text style={{fontSize:20, color: 'white', padding:20}}>Log Out</Text>
    ),
    drawerIcon:(
        <Image source={require('./../assets/logOut.png')}/>
    )
}

state = {
    password: '',
};

render(){
    
 

    return(
        <ImageBackground style={styles.container} source={require('./../assets/bg.jpg')}>
            <KeyboardAvoidingView style={styles.container} behavior="padding" keyboardVerticalOffset="-150">
                <View style={styles.logoContainer}>
                    <Text style={styles.title}>NETWERK </Text>
                    <View style={styles.Rectangle} />
                </View>

                <View style={styles.formContainer}>
                    <TextInput
                        placeholder=" Username or Email"
                        style={styles.input}
                        underlineColorAndroid = 'transparent'
                        onChangeText={ (username) => this.setState({username})}
                    />

                    <PasswordInputText
                        style={styles.password}
                        onChangeText={ (password) => this.setState({ password }) }
                    />

                    <TouchableOpacity activeOpacity={0.7}>
                        <Text style={styles.smallText}>forgot your password?</Text>
                    </TouchableOpacity>
                </View>

                    <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7} onPress={() =>
                    this.props.navigation.navigate('Home')}>
                        <Text style={styles.buttonText}>LOGIN</Text>
                    </TouchableOpacity>

                    <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.navigate('Signup')}>
                        <Text style={styles.smallText}>don't have an account?</Text>
                    </TouchableOpacity>
                
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

    password: {
        
    },
    title: {
        marginTop: 100,
        fontSize: 40,
        fontFamily:'Montserrat-Regular',
        fontWeight: 'bold',
        textAlign: 'left',
        color: 'white',
        marginLeft: 60,
        letterSpacing: 3
    },

    formContainer: {
        flex: 2,
        paddingVertical: 15,
        width: Dimensions.get("window").width*5/7,
        left:60,
    },

    input: {
        height: 45,
        fontFamily:'Montserrat-Regular',
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

        marginLeft: 60,
        marginRight:60,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#E0224F',
    },

    buttonText: {
        textAlign: 'center',
        color: 'white',
        shadowColor: '#000',
        shadowOffset: {
            width: 0, 
            height: 2
        },
        fontFamily:'Montserrat-Regular',
        fontSize: 15,
        fontWeight: 'bold',
        shadowOpacity: 0.8,
        shadowRadius: 5
    },

    smallText: {
        fontFamily:'Montserrat-Regular.ttf',
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