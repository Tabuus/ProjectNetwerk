import React, { Component } from 'react';
import{
    Platform,
    View,
    Text,
    StyleSheet,
    Image,
    Dimensions,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import { Icon, Button, Container, Header, Content, Left, Body, Right, Title} from 'native-base'

class MessagesScreen extends Component{
    constructor(props){
            super(props);
            this.state = {cards: []};
         }

     componentWillMount() {
         AsyncStorage.getItem('userID').then((value)=>{
             console.log("Logged in user: " + value);
             url = 'http://10.9.5.153:8080/NetwerkBackend/NetwerkBackend?functionToExecute=getMatches&userID=' + value;
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
               console.log("here");
               console.log(responseJson.users);

               var arr = [];
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
       }).done();
     };


    static navigationOptions = {
        drawerLabel:(
            <Text style={{fontSize:20, color: 'white', padding:20}}>Messages</Text>
        ),
        drawerIcon:(
            <Image source={require('./assets/messages.png')}/>
        )
    }
    render(){
        return(
            <Container>
                <Header style={{height: 80, backgroundColor: '#FCFCFC'}}>
                    <Left>
                        <Icon name="menu" style={{left:10}} iconSize={60} onPress={() =>
                        this.props.navigation.navigate('DrawerOpen')}/>
                    </Left>
                    <Body>
                        <Title style={{left: 60, fontSize: 25, color: '#E0224F', paddingTop: 20,
                        paddingBottom: 20}}>Messages</Title>
                    </Body>
                    <Right>
                        <Image source={require('./assets/netwerk.png')} style={{left: 0, height: 40, width: 40}}/>
                    </Right>
                </Header>


               <Text style={styles.matches}>MATCHES</Text>
               <View style = {styles.flexbox}>

              {this.state.cards.map((v,index)=>{
                    return <TouchableOpacity key={index} style = {styles.searchItem} onPress={() => this.props.navigation.navigate('Chat')} >
                        <Image style={styles.roundImage} source={{uri: v.image}} />

                            <Text style={styles.nameText}>{v.displayName}</Text>

                    </TouchableOpacity>
               })}

               </View>

            </Container>
        );
    }
}


const styles = StyleSheet.create({
roundImage:{
    height: 70,
    width: 70,
    borderRadius: 50,
    marginBottom:5,
    padding: 5,
},
recentMessage: {
    fontWeight: 'normal',
   color: '#979797',
    textAlign: 'center',
    fontSize : 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    paddingLeft: 28,
    paddingLeft: 30,
    paddingTop: 10,
    letterSpacing: 0.5
},
nameText:{
   fontWeight: 'bold',
   color: 'black',
    textAlign: 'center',
    fontSize : 16,
    fontWeight: 'bold',
    letterSpacing: 0.5,
    paddingLeft: 28,
    paddingLeft: 30,
    paddingTop: 10,
    letterSpacing: 0.5

},
matches: {
    fontFamily: 'Montserrat',
    fontSize: 19,
    padding: 20,
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    letterSpacing: 0.5
},
flexbox:{
 flex:1,
},
searchItem:{
    letterSpacing: 0.5,
    backgroundColor: '#ffffff',
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    padding: 15,
    paddingRight:20,
    paddingLeft: 20,
    width: Dimensions.get("window").width,
    flexDirection: 'row',
}

 })

export default MessagesScreen;
