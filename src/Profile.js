import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Right, Title} from 'native-base'


export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    card = {name: 'Jeffrey Miller, PhD', bio:'Professor of Computer Science', experience:'University of Southern California', image: 'https://viterbi.usc.edu/directory/images/2dafc9bc59c736884ae57b7235d5bc67.jpg', description:'Buy cookies from me haha.'}

  }
static navigationOptions = {
        drawerLabel:(
            <Text style={{fontSize:20, color: 'white', padding:20}}>Profile</Text>
        ),
        drawerIcon:(
            <Image source={require('./assets/profile.png')}/>
        )
    }
render() {
    return (
        <Container>
            <Header style={{height: 80, backgroundColor: '#FCFCFC'}}>
              <Left>
                  <Icon name="menu" iconSize={60} onPress={() =>
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
                <Image style={styles.roundImage} source={{uri: card.image}} />
                <Text style = {styles.nameText}>{card.name}</Text>
                <Text style = {styles.description}>{card.bio}</Text>
                <Text style = {styles.description}>{card.experience}</Text>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                     top:75,
                  }}
                />
                <Text style = {styles.headline}>Headline</Text>
                <Text style = {styles.headlineText}>{card.description}</Text>
            </Body>
        </Container>
    )
  }
}

const styles = StyleSheet.create({
    roundImage:{
        height: 200,
        width: 200,
        borderRadius: 100,
        top:60,
        alignItems: 'center'
    },
    nameText:{
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        top:60,

    },
    description: {
        color: 'black',
        textAlign: 'center',
        top:65,

    },
    headline:{
        color: '#E0224F',
        fontSize:20,
        top:80,
        paddingLeft: 10,

    },
    headlineText:{
        color: 'black',
        top:90,
        paddingLeft: 10,

    }
 })

