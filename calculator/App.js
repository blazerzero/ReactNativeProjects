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
import { Constants, Font } from 'expo';

global.result = '0';
global.operand2 = '0';
global.operators = ['+', '-', '*', '/'];
global.opIndex = 0;
global.calculated = false; // flag for whether or not a result has been calculated yet
global.doOpAgain = false; // flag for repeating the last operator and second operand again
global.opOnSelf = false; // flag for performing the operation using the result as the both the first and second operand
global.op2Saved = false; // flag for whether or not the operand being reused has been saved

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      result: '0',
      fontLoaded: false
    }
  }
  
  async componentDidMount() {
    await Font.loadAsync({
      'stratum2-thin': require('./assets/fonts/stratum2_thin.otf'),
      'stratum2-bold': require('./assets/fonts/stratum2_bold.otf'),
      'stratum2-light': require('./assets/fonts/stratum2_light.otf'),
      'stratum2-medium': require('./assets/fonts/stratum2_medium.otf'),
      'stratum2-black': require('./assets/fonts/stratum2_black.otf'),
      'stratum2-regular': require('./assets/fonts/stratum2_regular.otf'),      
    });
    
    this.setState({ fontLoaded: true });
  }
  
  buildOperand = (index, values) => {
    if (global.calculated) {
      global.result = '0';
      global.operand2 = '0';
      global.opIndex = 0;
      global.calculated = false;
    }
    global.operand2 += values[index];
    if (global.operand2[0] == 0) global.operand2 = global.operand2.substring(1);
    else if (global.operand2.length > 8 && global.operand2[0] != '-') global.operand2 = global.operand2.substring(0, 8);
    else if (global.operand2.length > 9 && global.operand2[0] == '-') global.operand2 = global.operand2.substring(0, 9);
    this.updateText(global.operand2);
  }
  
  doOperation = () => {
    if (global.calculated) {
      if (!global.doOpAgain) global.operand2 = '0';
      global.calculated = false;
    }
    global.opOnSelf = true;
    if (global.opIndex == 0) {
      global.result = (parseFloat(global.result) + parseFloat(global.operand2)).toString();
    }
    else if (global.opIndex == 1) {
      global.result = (parseFloat(global.result) - parseFloat(global.operand2)).toString();
    }
    else if (global.opIndex == 2) {
      global.result = (parseFloat(global.result) * parseFloat(global.operand2)).toString();
    }
    else if (global.opIndex == 3) {
      global.result = (parseFloat(global.result) / parseFloat(global.operand2)).toString();
    }
    if (global.result[global.result.length - 1] == '.') global.result = global.result.substring(0, global.result.length - 1);
    this.updateText(global.result);
  }
  
  updateText = (newValue) => {
    if (newValue.toString()[0] != '-') this.setState({result: newValue.toString().substring(0, 8)});
    else this.setState({result: newValue.toString().substring(0, 9)});
  }
  
  render() {
    return (
      this.state.fontLoaded ? (
        <View style={styles.container}>
          <Toast ref="toast"/> 
          <Text
            style={styles.result}
            onPress={() => {
              /*Clipboard.setString(global.result);
              this.refs.toast.show('Copied to clipboard!', DURATION.LENGTH_LONG);*/
            }}>
            {this.state.result}
          </Text>
          <ButtonGroup 
            buttons={['+', '-', 'x', '÷', 'c']} 
            containerStyle={styles.padrow} 
            textStyle={{ fontFamily: 'stratum2-medium', fontSize: 64}}
            onPress={(index) => {
              global.doOpAgain = false;
              if (index < 4) {
                global.opIndex = 0;
                this.doOperation();
                global.opIndex = index;
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
            textStyle={{ fontFamily: 'stratum2-medium', fontSize: 64}}
            onPress={(index) => {
              var values = [7, 8, 9];
              global.opOnSelf = false;
              this.buildOperand(index, values);
            }}/>
          <ButtonGroup 
            buttons={['4', '5', '6']} 
            containerStyle={styles.padrow} 
            textStyle={{ fontFamily: 'stratum2-medium', fontSize: 64}}
            onPress={(index) => {
              var values = [4, 5, 6];
              global.opOnSelf = false;
              this.buildOperand(index, values);
            }}/>
          <ButtonGroup 
            buttons={['1', '2', '3']} 
            containerStyle={styles.padrow} 
            textStyle={{ fontFamily: 'stratum2-medium', fontSize: 64}}
            onPress={(index) => {
              var values = [1, 2, 3];
              global.opOnSelf = false;
              this.buildOperand(index, values);
            }}/>
          <ButtonGroup 
            buttons={['+/-', '0', '=']} 
            containerStyle={styles.padrow} 
            textStyle={{ fontFamily: 'stratum2-medium', fontSize: 64}}
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
                if (global.opOnSelf && !global.op2Saved) {
                  global.operand2 = global.result;
                }
                this.doOperation();
                global.calculated = true;
                global.doOpAgain = true;
                if (global.opOnSelf && !global.op2Saved) {
                   global.op2Saved = true;
                }
                //global.opIndex = 0;
              }
            }}/>
        </View>
      ) : null
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
    fontFamily: 'stratum2-medium',
    fontSize: 72,
    flexDirection: 'row',
    padding: 10,
    margin: 10
  },
  padrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#bbb',
    flexDirection: 'row',
  }
});
