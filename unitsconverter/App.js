import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Button,
  StatusBar
} from 'react-native';
import { Constants } from 'expo';
import { Navigation } from 'react-native-navigation';
import { registerScreens } from './screens';

registerScreens();

const ColoredStatusBar = ({backgroundColor, ...props}) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);

const Section = ({onPress, title, color, accessibilityLabel, ...props}) => (
  <View style={[styles.section]}>
    <Button 
      onPress={onPress}
      title={title}
      color={color}
      accessibilityLabel={accessibilityLabel}
      {...props}
    />
  </View>
);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ColoredStatusBar backgroundColor="#2c3571" barStyle="light-content"/>
        <Section 
          onPress={() => {
            Navigation.showModal({
              screen: 'unitsconverter.DistanceScreen',
              title: 'Distance',
              passProps: {},
              navigatorStyle: {},
              navigatorButtons: {},
              animationType: 'slide-up'
            });
          }}
          title="Distance"
          color="#00f"
          accessibilityLabel="Convert distance units" />
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
  statusBar: {
    height: StatusBar.currentHeight
  },
  section: {
    flex: 1,
    borderRadius: 4,
    borderWidth: 0.5,
    padding: 10,
    borderColor: '#b8b8b8',
    backgroundColor: '#bbb',
    flexDirection: 'row'
  }
});
