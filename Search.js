import React from 'react';
import {StyleSheet, Text, View, Image, TextInput, Linking, Dimensions, AsyncStorage, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Icon, Button, Container, Header, Content, Left, Body, Right, Title} from 'native-base'

export default class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cards: []};

  }

  clickPicture = (userID) => {
   console.log("in click pictures" + userID);
   AsyncStorage.setItem('user', userID.toString());
   this.props.navigation.navigate('OtherProfile')
  }


searchUser = () => {
    url = 'http://10.9.5.153:8080/NetwerkBackend/NetwerkBackend?functionToExecute=getUsersByName&name=' + this.state.search;
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
    .catch((error) =>{
        console.error(error);
    });
}


static navigationOptions = {
        drawerLabel:(
            <Text style={{fontSize:20, color: 'white', padding:20}}>Search</Text>
        ),
        drawerIcon:(
            <Image source={require('./assets/search.png')}/>
        )
}
render() {


    return (
        <Container>
            <Header style={{height: 80, backgroundColor: '#FCFCFC'}}>
                <Left>
                    <Icon name="menu" style={{left:10}} iconSize={60} onPress={() =>
                    this.props.navigation.navigate('DrawerOpen')}/>
                </Left>
                <Body>
                    <Title style={{left: 70, fontSize: 25, color: '#E0224F', paddingTop: 20,
                    paddingBottom: 20}}>Search</Title>
                </Body>
                <Right>
                    <Image source={require('./assets/netwerk.png')} style={{left: 0, height: 40, width: 40}}/>
                </Right>
            </Header>
            <View style={styles.searchContainer}>
              <TextInput
                  underlineColorAndroid='transparent'
                  style={styles.searchForm}
                  onChangeText={(search) => this.setState({search: search}, () => { this.searchUser()})}
                  placeholder = 'Search for a user...' />
              <Text style={{color: '#E0224F', fontFamily: 'Montserrat', textAlign: 'right', top:15, right:20, textDecorationLine: 'underline'}}
                  onPress={() => Linking.openURL('http://google.com')}>
                Advanced Search
              </Text>
            </View>

            <View style = {styles.flexbox}>
           {this.state.cards.map((v,index)=>{
                 return <TouchableOpacity key={index} style = {styles.searchItem} onPress = {AsyncStorage.setItem('user', v.userID.toString()), () => {this.props.navigation.navigate('OtherProfile')}}>

                 <Image style={styles.roundImage} source={{uri: v.image}} />
                 <Text style={styles.nameText}>{v.name}</Text>
                 </TouchableOpacity>
            })}

           </View>
        </Container>
    )
  }
}

const styles = StyleSheet.create({
netwerkText: {
    fontFamily:'Montserrat',
    fontSize: 20,
    color: '#E0224F',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
},
netwerk:{
     height:30,
     width:30,
     position: 'absolute',
     left: 370,
     top: 14 ,
 },
 searchContainer: {
    backgroundColor: '#f0f0f0',
    height: 100,
    alignSelf: 'center',
 },
 searchForm: {
    fontFamily:'Montserrat',
    borderRadius: 20,
    backgroundColor: '#ffffff',
    top:20,
    width:340,
    fontFamily: 'Montserrat',
    fontStyle: 'italic',
    letterSpacing: 0.5,
    padding: 5,
    paddingLeft:13
 },
roundImage:{
    height: 100,
    width: 100,
    borderRadius: 50,
    marginBottom:5,
    padding: 5,

},
nameText:{
    fontFamily:'Montserrat',
    fontWeight: '300',
    color: 'black',
    textAlign: 'center',
    fontSize : 12,
},
flexbox:{
    height:'50%',
    flex:1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 5,
    backgroundColor:'#ffffff',
    borderTopWidth: 0.5,
    borderTopColor: 'black',
},
searchItem:{
    marginTop:45,
    padding:1,
    width: Dimensions.get("window").width/4,
    height: Dimensions.get("window").height/6,
},
searchIcon:{
    height: 20,
    width:20,
    left:330,
    top:-8,





}
})