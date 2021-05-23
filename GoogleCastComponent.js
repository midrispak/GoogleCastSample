import React from 'react';
import {View, Text, Button} from 'react-native';
import {CastButton, SessionManager} from 'react-native-google-cast';

export class GoogleCastComponent extends React.Component {
  manager = new SessionManager();
  state = {};
  // note that unlike hooks, you'll need to use events to monitor when the client is connected
  componentDidMount() {
    this.startedListener = this.manager.onSessionStarted(session => {
      this.setState({client: session.client});
      console.log('onSessionStarted');
    });
    this.resumedListener = this.manager.onSessionResumed(session => {
      this.setState({client: session.client});
      console.log('onSessionResumed');
    });
    this.suspendedListener = this.manager.onSessionSuspended(session => {
      this.setState({client: undefined});
      console.log('onSessionResumed');
    });
    this.endingListener = this.manager.onSessionEnding(session => {
      this.setState({client: undefined});
      console.log('onSessionResumed');
    });
  }
  componentWillUnmount() {
    if (this.startedListener) {
      this.startedListener.remove();
    }
    if (this.resumedListener) {
      this.resumedListener.remove();
    }
    if (this.suspendedListener) {
      this.suspendedListener.remove();
    }
    if (this.endingListener) {
      this.endingListener.remove();
    }
  }

  playSoundButtonAction = () => {
    if (this.state.client) {
      let {client} = this.state;
      console.log('Google Cast Button Action');
      client.loadMedia({
        autoplay: true,
        mediaInfo: {
          contentUrl:
            'https://dl.dropboxusercontent.com/s/n4cgzczm53001lx/reminder.mp3',
        },
      });
    }
  };

  render() {
    if (this.state.client) {
      console.log('Google Cast Ready ...');
    }
    return (
      // reminder.mp3
      <View>
        <Text>Inner Component Here</Text>
        <CastButton style={{width: 50, height: 50}} />
        <Button
          onPress={this.playSoundButtonAction}
          title="Play"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    );
  }
}
