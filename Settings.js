import React, { Component } from 'react';
import{
    Platform,
    View,
    Text,
    StyleSheet,
    Image,
    Slider,
    TouchableOpacity
} from 'react-native';

import { Icon, Button, Container, Header, Content, Left, Body, Right, Title} from 'native-base'


class SettingsScreen extends Component{
    constructor(props) {
        super(props);
      }

    static navigationOptions = {
        drawerLabel:(
            <Text style={{fontSize:20, color: 'white', padding:20}}>Settings</Text>
        ),
        drawerIcon:(
            <Image source={require('./assets/settings.png')}/>
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
                        <Title style={{left: 70, fontSize: 25, color: '#E0224F', paddingTop: 20,
                        paddingBottom: 20}}>Settings</Title>
                    </Body>
                  <Right>
                    <Image source={require('./assets/netwerk.png')} style={{left: 0, height: 40, width: 40}}/>
                  </Right>
                </Header>

                <Content contentContainerStyle={{flex: 1, backgroundColor: '#f0f0f0'}}>
                    <Text style={styles.settingHeader}>DISCOVERY SETTINGS</Text>
                    <TouchableOpacity activeOpacity={0.7} style={styles.settingItem} onPress={() => this.props.navigation.navigate('LocationChange')}>
                        <Text style={styles.settingItemBold}>Location</Text>
                        <Text style={styles.settingItemLight}>{this.props.navigation.getParam('location', 'Los Angeles, CA, California')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.settingItem}>
                        <Text style={styles.settingItemBold}>Display</Text>
                        <Text style={styles.settingItemLight}>Within 30 mi</Text>
                    </TouchableOpacity>

                    <Text style={styles.settingHeader}>ACCOUNT SETTINGS</Text>
                    <TouchableOpacity activeOpacity={0.7} style={styles.settingItem}>
                        <Text style={styles.settingItemBold}>Change Name</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.settingItem}>
                        <Text style={styles.settingItemBold}>Change Password</Text>
                    </TouchableOpacity>

                    <Text style={styles.settingHeader}>CONTACT US</Text>
                    <TouchableOpacity activeOpacity={0.7} style={styles.settingItem}>
                        <Text style={styles.settingItemBold}>Help & Support</Text>
                    </TouchableOpacity>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        color: '#E0224F',
        padding:20
    },
    settingHeader: {
        fontFamily: 'Montserrat',
        fontSize: 19,
        padding: 15,
        borderBottomWidth: 0.8,
        borderBottomColor: '#979797',
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    settingItem: {
        letterSpacing: 0.5,
        backgroundColor: '#ffffff',
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
        padding: 15,
        paddingRight:20,
        paddingLeft: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    settingItemBold: {
        letterSpacing: 0.5,
        fontSize: 17,
        fontWeight: 'bold',
        color: '#979797'
    },
    settingItemLight: {
        letterSpacing: 0.5,
        fontSize: 17,
    },
});

export default SettingsScreen;