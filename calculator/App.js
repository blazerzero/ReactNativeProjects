import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Platform,
  Text,
  View,
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Constants } from 'expo';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.result}>
          0
        </Text>
        <ButtonGroup buttons={['7', '8', '9']} containerStyle={styles.padrow}/>
        <ButtonGroup buttons={['4', '5', '6']} containerStyle={styles.padrow}/>
        <ButtonGroup buttons={['1', '2', '3']} containerStyle={styles.padrow}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d73f09',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight
  },
  result: {
    flex: 1,
    color: 'white',
    fontSize: 72,
    fontWeight: 'normal',
    fontFamily:  'System',
    backgroundColor: 'black',
    justifyContent: 'center',
    textAlign: 'right',
    padding: 10,
    flexDirection: 'row'
  },
  padrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbb',
    flexDirection: 'row'
  }
});
