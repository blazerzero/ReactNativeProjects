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
        <ButtonGroup buttons={[0]} disabled='true' containerStyle={styles.result} textStyle={{color: 'white', fontSize: 72}}/>
        <ButtonGroup buttons={['+', '-', 'x', '÷']} containerStyle={styles.padrow} textStyle={{fontSize: 64}}/>
        <ButtonGroup buttons={['7', '8', '9']} containerStyle={styles.padrow} textStyle={{fontSize: 64}}/>
        <ButtonGroup buttons={['4', '5', '6']} containerStyle={styles.padrow} textStyle={{fontSize: 64}}/>
        <ButtonGroup buttons={['1', '2', '3']} containerStyle={styles.padrow} textStyle={{fontSize: 64}}/>
        <ButtonGroup buttons={['+/-', '0', '=']} containerStyle={styles.padrow} textStyle={{fontSize: 64}}/>
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
    paddingTop: Constants.statusBarHeight,
    paddingBottom: Constants.statusBarHeight
  },
  result: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    flexDirection: 'row',
    padding: 10,
  },
  padrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbb',
    flexDirection: 'row'
  }
});
