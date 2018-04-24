import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native';

export default class SignupForm extends React.Component {
    render(){
      return(
        <KeyboardAvoidingView style={styles.container}>
            <TextInput
                placeholder="First Name"
                style={styles.input}
                underlineColorAndroid = 'transparent'
            />
            <TextInput
                placeholder="Last Name"
                style={styles.input}
                underlineColorAndroid = 'transparent'
             />
             <TextInput
                placeholder="Picture URL"
                style={styles.input}
                underlineColorAndroid = 'transparent'
             />
             <TextInput
                placeholder="Email"
                style={styles.input}
                underlineColorAndroid = 'transparent'
             />
             <TextInput
                 placeholder="Password"
                 style={styles.input}
                 underlineColorAndroid = 'transparent'
             />

            <TouchableOpacity style={styles.buttonContainer} >
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={{textAlign:'right'}}>Log In</Text>
            </TouchableOpacity>
        </ KeyboardAvoidingView>
       );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },

    input: {
        height: 40,
        backgroundColor: 'white',
        color: 'black',
        paddingHorizontal: 10,
        borderRadius: 10,
        marginTop: 10
    },

    buttonContainer: {
        marginTop: 20,
        backgroundColor: 'white',
        paddingVertical: 15,
        borderRadius: 10
    },

    buttonText: {
       textAlign: 'center',
       color: 'black'
    }
});