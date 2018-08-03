import { Navigation } from 'react-native-navigation';

import DistanceScreen from './DistanceScreen';
import WeightScreen from './WeightScreen';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('unitsconverter.DistanceScreen', () => DistanceScreen);
  Navigation.registerComponent('unitsconverter.WeightScreen', () => WeightScreen);
}