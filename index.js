import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import { enableScreens } from 'react-native-screens';
import App from '@entrypoint';

enableScreens();

AppRegistry.registerComponent(appName, () => App);
