import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat'
import {StyleSheet} from 'react-native'

export default class Chat extends React.Component {
  state = {
    messages: [],
  }

  componentWillMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'Any questions?',
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Aaron Cote',
            avatar: 'http://bits.usc.edu/cs104/wp-content/uploads/sites/12/2014/08/Aaron-300x300.png',
          },
        },
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }))
  }

  render() {
    return (
      <GiftedChat
        style={styles.messageContainer}
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    )
  }
}

const styles = StyleSheet.create({
})