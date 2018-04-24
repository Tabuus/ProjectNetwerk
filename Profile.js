import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity, Dimensions, AsyncStorage} from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Right, Title} from 'native-base'


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        image : '',
        company : '',
        displayName : '',
        experience : '',
        description : ''
    }
  }
  componentWillMount() {
        AsyncStorage.getItem('userID').then((value)=>{
            console.log("Logged in user: " + value);
            url = 'http://10.9.5.153:8080/NetwerkBackend/NetwerkBackend?functionToExecute=getUserDetailsByID&userID=' + value;
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
                    image: responseJson.image,
                    company: responseJson.company,
                    displayName: responseJson.displayName,
                    experience: responseJson.experience,
                    description: responseJson.description
               }, function(){
                    console.log(responseJson);
               });
            })
            .catch((error) => {
              console.log(responseJson);
                console.error(error);
            });
        }).done();
      };
static navigationOptions = {
        drawerLabel:(
            <Text style={{fontSize:20, color: 'white', padding:20, fontFamily: 'Montserrat'}}>Profile</Text>
        ),
        drawerIcon:(
            <Image source={require('./assets/profile.png')}/>
        )
    }
render() {
    return (
        <Container style={{backgroundColor:'white'}}>
            <Header style={{height: 80, backgroundColor: '#FCFCFC'}}>
              <Left>
                  <Icon name="menu" style={{left:10}} iconSize={60} onPress={() =>
                  this.props.navigation.navigate('DrawerOpen')}/>
              </Left>
              <Body>
                  <Title style={{left: 70, fontSize: 25, color: '#E0224F', paddingTop: 20,
                  paddingBottom: 20}}>Profile</Title>
              </Body>
              <Right>
                  <Image source={require('./assets/netwerk.png')} style={{left: 0, height: 40, width: 40}}/>
              </Right>
          </Header>
          <Body>
            <View style={styles.profileContainer}>
                <Image style={styles.roundImage} source={{uri: this.state.image}} />
                <Text style = {styles.nameText}>{this.state.displayName}</Text>
                <Text style = {styles.description}>{this.state.company}</Text>
                <Text style = {styles.description}>{this.state.experience}</Text>
            </View>
                
            <Text style = {styles.headline}>Headline</Text>
            <Text style = {styles.headlineText}>{this.state.description}</Text>

            <TouchableOpacity style={styles.buttonContainer} activeOpacity={0.7} onPress={() =>
                this.props.navigation.navigate('Profile')}>
                    <Text style={styles.buttonText}>EDIT INFO</Text>
                </TouchableOpacity>

            </Body>
        </Container>
    )
  }
}

const styles = StyleSheet.create({
    roundImage:{
        height: 150,
        width: 150,
        borderRadius: 100,
        top:40,
        alignItems: 'center'
    },
    nameText:{
        fontFamily: 'Montserrat',
        fontWeight: 'bold',
        fontSize: 25,
        color: 'black',
        textAlign: 'center',
        top:35,
        paddingTop: 20,
        letterSpacing: 0.5
    },
    description: {
      fontFamily: 'Montserrat',
        color: 'black',
        textAlign: 'center',
        top: 45,
        letterSpacing: 0.5,
        fontSize:18
    },
    profileContainer: {
      backgroundColor: '#f0f0f0',
      height: 330,
      width: Dimensions.get("window").width,
      alignItems: 'center',
      borderBottomWidth: 0.25,
      borderBottomColor: '#979797'
    },
    headline:{
      fontFamily: 'Montserrat',
        color: '#E0224F',
        fontSize:20,
        top:30,
        paddingLeft: 10,
        letterSpacing: 0.5,
        textAlign: 'left',
        fontWeight: '600'
    },
    headlineText:{
      fontFamily: 'Montserrat',
        color: 'black',
        top:40,
        paddingLeft: 10,
        letterSpacing: 0.5,
        fontSize: 18
    },
     buttonContainer: {
        marginTop: 70,
        marginLeft: 60,
        marginRight:60,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: '#E0224F',
        width: 150
    },
    buttonText: {
      fontFamily: 'Montserrat',
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
 })