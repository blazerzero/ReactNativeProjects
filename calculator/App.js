import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Platform,
  Text,
  View,
  Clipboard,
} from 'react-native'
import { ButtonGroup } from 'react-native-elements';
import Toast, {DURATION} from 'react-native-easy-toast';
import { Constants } from 'expo';

global.result = '0';
global.operand2 = '0';
global.operator = "";
global.op1made = false;
global.calculated = true;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      result: '0'
    }
  }
  
  updateText = (newValue) => {
    this.setState({result: newValue.toString()})
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Toast ref="toast"/> 
        <Text
          style={styles.result}
          onPress={() => {
            Clipboard.setString(global.result.toString());
            this.refs.toast.show('Copied to clipboard!', DURATION.LENGTH_LONG);
          }}>
          {this.state.result}
        </Text>
        <ButtonGroup 
          buttons={['+', '-', 'x', '÷', 'c']} 
          containerStyle={styles.padrow} 
          textStyle={{fontSize: 64}}
          onPress={(index) => {
            this.setState({index});
            if (index == 0) {
              if (global.op1made) global.result = parseInt(global.result) + parseInt(global.operand2);
              this.updateText(global.result);
            } 
            else if (index == 1) {
              if (global.op1made) global.result = parseInt(global.result) - parseInt(global.operand2);
              this.updateText(global.result);
            }
            else if (index == 2) {
              if (global.op1made) global.result = parseInt(global.result) * parseInt(global.operand2);
              this.updateText(global.result);
            }
            else if (index == 3) {
              if (global.op1made) global.result = parseInt(global.result) / parseInt(global.operand2);
              this.updateText(global.result);
            }
            else if (index == 4) {
              if (global.op1made) global.operand2 = 0;
              else global.result = 0;
              this.updateText(0);
            }
            global.op1made = true;
          }}/>
        <ButtonGroup 
          buttons={['7', '8', '9']}
          containerStyle={styles.padrow}
          textStyle={{fontSize: 64}}
          onPress={(index) => {
            var values = [7, 8, 9];
            if (!global.op1made) {
              global.result += values[index];
              if (global.result[0] == 0) global.result = global.result.substring(1);
              this.updateText(global.result);
            }
            else {
              global.operand2 += values[index];
              if (global.operand2[0] == 0) global.operand2 = global.operand2.substring(1);
              this.updateText(global.operand2);
            }
          }}/>
        <ButtonGroup 
          buttons={['4', '5', '6']} 
          containerStyle={styles.padrow} 
          textStyle={{fontSize: 64}}
          onPress={(index) => {
            var values = [4, 5, 6];
            if (!global.op1made) {
              global.result += values[index];
              if (global.result[0] == 0) global.result = global.result.substring(1);
              this.updateText(global.result);
            }
            else {
              global.operand2 += values[index];
              if (global.operand2[0] == 0) global.operand2 = global.operand2.substring(1);
              this.updateText(global.operand2);
            }
          }}/>
        <ButtonGroup 
          buttons={['1', '2', '3']} 
          containerStyle={styles.padrow} 
          textStyle={{fontSize: 64}}
          onPress={(index) => {
            var values = [1, 2, 3];
            if (!global.op1made) {
              global.result += values[index];
              if (global.result[0] == 0) global.result = global.result.substring(1);
              this.updateText(global.result);
            }
            else {
              global.operand2 += values[index];
              if (global.operand2[0] == 0) global.operand2 = global.operand2.substring(1);
              this.updateText(global.operand2);
            }
          }}/>
        <ButtonGroup 
          buttons={['+/-', '0', '=']} 
          containerStyle={styles.padrow} 
          textStyle={{fontSize: 64}}/>
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
    alignSelf: 'stretch',
    textAlign: 'right',
    backgroundColor: 'black',
    color: 'white',
    fontSize: 72,
    fontWeight: 'bold',
    flexDirection: 'row',
    padding: 10,
    margin: 10
  },
  padrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbb',
    flexDirection: 'row'
  }
});
