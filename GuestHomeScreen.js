'use strict';

import React from 'react';
import {StyleSheet, Text, View, Image, AsyncStorage, Alert} from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Right, Title, Segment} from 'native-base'
import SwipeCards from 'react-native-swipe-cards';

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container style={styles.card}>
        <Image style={styles.thumbnail} source={{uri: this.props.image}} />
        <Text style = {styles.text}>
            <Text style={styles.nameText}>{this.props.displayName}</Text>{"\n"}
            <Text style={styles.experienceText}>{this.props.company}</Text>{"\n"}
            <Text style={styles.experienceText}>{this.props.job}</Text>
        </Text>
      </Container>
    )
  }
}

class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards! Come back later for more!</Text>
      </View>
    )
  } 
}

export default class ConnectScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      outOfCards: false,
    }
  }

    componentWillMount() {
        fetch('http://10.9.5.153:8080/NetwerkBackend/NetwerkBackend?functionToExecute=getAllUsers&userID=#', {
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
              console.log("here");
              console.log(responseJson.users);

              var arr = [];
              var str = "";
              for (let i = 0; i < responseJson.users.length; i++) {
                console.log(responseJson.users[i]);
                arr.push(responseJson.users[i]);
              }
              console.log(arr.length);
              this.setState({cards: arr});
         });
        })
        .catch((error) => {
        console.log(responseJson);
          console.error(error);
        });
      
    };

   handleYup (card) {
      Alert.alert("Please sign up to connect with this user!");
    }
    handleNope (card) {
      console.log('Nope for ${card.text}')
    }
    handleMaybe (card) {
      console.log(card.userID);
      AsyncStorage.setItem('user', card.userID.toString());
      this.props.navigation.navigate('OtherProfile')
    }

  cardRemoved (index) {
    console.log('The index is ${index}');

    let CARD_REFRESH_LIMIT = 3

    if (this.state.cards.length - index - 1 <= CARD_REFRESH_LIMIT + 1) {
      console.log('There are only ${this.state.cards.length - index - 1} cards left.');
      outOfCards: true;
    }
  }
    static navigationOptions = {
        drawerLabel:(
            <Text style={{fontSize:20, color: 'white', padding:20}}>Home</Text>
        ),
        drawerIcon:(
            <Image source={require('./assets/home.png')}/>
        )
    }
  render() {
    return (
      <Container>
          <Header style={{height: 80, backgroundColor: '#FCFCFC'}}>
              <Left>
                  <Icon style={{left: 10}} name="menu" iconSize={60} onPress={() =>
                  this.props.navigation.navigate('Login')}/>
              </Left>
              <Body>
                  <Title style={{left: 70, fontSize: 25, color: '#E0224F', paddingTop: 20,
                  paddingBottom: 20}}>Netwerk</Title>
              </Body>
              <Right>
                <Image source={require('./assets/netwerk.png')} style={{left: 0, height: 40, width: 40}}/>
              </Right>
          </Header>
          <Body>
              <SwipeCards
                cards={this.state.cards}
                loop={false}

                renderCard={(cardData) => <Card {...cardData} />}
                renderNoMoreCards={() => <NoMoreCards />}
                showYup={true}
                showNope={true}
                hasMaybeAction
                yupText={"Connect!"}
                nopeText={"Skip"}
                maybeText={"View Profile"}
                handleYup={this.handleYup.bind(this)}
                handleNope={this.handleNope}
                handleMaybe={this.handleMaybe.bind(this)}
                cardRemoved={this.cardRemoved.bind(this)}
                onClickHandler={() => Alert.alert("Swipe left to skip to the next user. Swipe right to connect with the user!")}
              />
              <View style={{flexDirection:'row', padding: 10}}>
                 <Image source={require('./assets/nope.png')} style={styles.nope}/>
                 <Image source={require('./assets/like.png')} style={styles.like}/>
                 <Image source={require('./assets/superlike.png')}style={styles.superlike}/>
              </View>
          </Body>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    overflow: 'hidden',
    elevation: 1,
    top: 10,
    borderRadius: 10,
  },
  thumbnail: {
    width: 350,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Montserrat-Regular',
    backgroundColor:'#E0224F',
    color: 'white',
    textAlign: 'left',
    width: 350,
    padding: 13,
    elevation: 0,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15
  },
  nameText:{
    fontFamily: 'Montserrat',
    fontSize: 30,
  },

  experienceText: {
    fontFamily: 'Montserrat',
    fontSize: 15,
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nope: {
      height:50,
      width:50,
  },
  like: {
      height:50,
      width:50,
      } ,
  superlike: {
      height:50,
      width:50,
      }
})