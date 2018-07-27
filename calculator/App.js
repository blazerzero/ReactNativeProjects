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
global.operator = '+';
global.calculated = false;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      result: '0'
    }
  }
  
  buildOperand = (index, values) => {
    if (global.calculated) {
      global.result = '0';
      global.operand2 = '0';
      global.operator = '+';
      global.calculated = false;
    }
    global.operand2 += values[index];
    if (global.operand2[0] == 0) global.operand2 = global.operand2.substring(1);
    this.updateText(global.operand2);
  }
  
  doOperation = () => {
    if (global.calculated) {
      global.operand2 = '0';
      global.calculated = false;
    }
    if (global.operator == '+') {
      global.result = (parseFloat(global.result) + parseFloat(global.operand2)).toString();
      this.updateText(global.result);
    }
    else if (global.operator == '-') {
      global.result = (parseFloat(global.result) - parseFloat(global.operand2)).toString();
      this.updateText(global.result);
    }
    else if (global.operator == '*') {
      global.result = (parseFloat(global.result) * parseFloat(global.operand2)).toString();
      this.updateText(global.result);
    }
    else if (global.operator == '/') {
      global.result = (parseFloat(global.result) / parseFloat(global.operand2)).toString();
      this.updateText(global.result);
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
            Clipboard.setString(global.result);
            this.refs.toast.show('Copied to clipboard!', DURATION.LENGTH_LONG);
          }}>
          {this.state.result}
        </Text>
        <ButtonGroup 
          buttons={['+', '-', 'x', '÷', 'c']} 
          containerStyle={styles.padrow} 
          textStyle={{fontSize: 64}}
          onPress={(index) => {
            var operators = ['+', '-', '*', '/']
            if (index < 4) {
              this.doOperation();
              global.operator = operators[index];
            }
            else if (index == 4) {
              global.operand2 = '0';
              if (global.calculated) global.result = '0';
              this.updateText(0);
            }
            global.operand2 = '0';
          }}/>
        <ButtonGroup 
          buttons={['7', '8', '9']}
          containerStyle={styles.padrow}
          textStyle={{fontSize: 64}}
          onPress={(index) => {
            var values = [7, 8, 9];
            this.buildOperand(index, values);
          }}/>
        <ButtonGroup 
          buttons={['4', '5', '6']} 
          containerStyle={styles.padrow} 
          textStyle={{fontSize: 64}}
          onPress={(index) => {
            var values = [4, 5, 6];
            this.buildOperand(index, values);
          }}/>
        <ButtonGroup 
          buttons={['1', '2', '3']} 
          containerStyle={styles.padrow} 
          textStyle={{fontSize: 64}}
          onPress={(index) => {
            var values = [1, 2, 3];
            this.buildOperand(index, values);
          }}/>
        <ButtonGroup 
          buttons={['+/-', '0', '=']} 
          containerStyle={styles.padrow} 
          textStyle={{fontSize: 64}}
          onPress={(index) => {
            if (index == 0) {
              if (global.calculated) {
                global.operand2 = global.result;
                global.result = '0';
                global.calculated = false;
              }
              global.operand2 = (parseInt(global.operand2) * -1).toString();
              this.updateText(global.operand2);
            }
            else if (index == 1) {
              this.buildOperand(0, [0]);
            }
            else if (index == 2) {
              this.doOperation();
              global.calculated = true;
            }
          }}/>
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
