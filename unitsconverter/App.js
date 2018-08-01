import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  StatusBar,
  NavigatorIOS} from 'react-native';
import { Constants } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View>
        <StatusBar
          backgroundColor="#2c3571"
          barStyle="light-content"
        />
        <View style={styles.container}>
          <View style={styles.section}>
            <Text>Open up App.js to start working on your app!</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c3571',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight
  },
  section: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#b8b8b8',
    backgroundColor: '#4a9dff',
    flexDirection: 'row'
  }
});
