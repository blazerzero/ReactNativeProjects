import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Platform,
  Text,
  View,
  Clipboard
} from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import { Constants } from 'expo';

global.result = 0;
global.operand2 = 0;
global.calculated = true;

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Toast ref="toast"/>
        <ButtonGroup 
          buttons={[global.result]} 
          containerStyle={styles.result} 
          textStyle={{color: 'white', fontSize: 72}}
          onPress={() => {
            Clipboard.setString(global.result.toString());
            this.refs.toast.show('Copied to clipboard!', DURATION.LENGTH_LONG);
          }}/>
        <ButtonGroup buttons={['+', '-', 'x', '÷', 'c']} containerStyle={styles.padrow} textStyle={{fontSize: 64}}/>
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
