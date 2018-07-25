import React from 'react';
import {
  StyleSheet,
  PixelRatio,
  Platform,
  Text,
  View,
} from 'react-native'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.calcrow}>
        <Text style={styles.result}>
          0
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  calcrow: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:  '#d73f09',
    flexDirection: 'row'
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
    padding: 10
  },
  padrow: {
    flex: 2,
    color: '#bbb'
  }
});
