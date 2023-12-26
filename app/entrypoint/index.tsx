/**
 * React Native App
 * Everything starts from the Entry-point
 */
import React from 'react';
import { ActivityIndicator, LogBox, StatusBar } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { Provider as PaperProvider } from 'react-native-paper';
import {
  PaperThemeDefault,
  PaperThemeDark,
  CombinedDefaultTheme,
  CombinedDarkTheme,
} from '@config/themes';
import Navigator from '@navigation';
import configureStore from '@store';
import { IState } from '@models/reducers/state';
import 'react-native-gesture-handler';
import styles from './styles';
import AppStyles from '@config/styles';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

const { persistor, store } = configureStore();

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
]);

const RootNavigation: React.FC = () => {
  const { isDark } = useSelector((state: IState) => state.theme);

  return (
    <PaperProvider theme={isDark ? PaperThemeDark : PaperThemeDefault}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={AppStyles.colors[isDark ? 'BLACK' : 'WHITE']}
      />
      <Navigator theme={isDark ? CombinedDarkTheme : CombinedDefaultTheme} />
    </PaperProvider>
  );
};

const EntryPoint: React.FC = () => (
  <Provider store={store}>
    <PersistGate
      loading={<ActivityIndicator size={hp(10)} style={styles.loader} />}
      persistor={persistor}>
      <RootNavigation />
    </PersistGate>
  </Provider>
);

export default EntryPoint;
