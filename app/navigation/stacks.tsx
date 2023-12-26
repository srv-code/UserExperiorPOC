import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import { IState } from '@models/reducers/state';
import { screenNames, stackNames } from '@constants/strings';
import { NavigationContainer, Theme } from '@react-navigation/native';
import AppDrawer from './drawers';
import ThemeSwitch from '@components/theme-switch';
import HomeScreen from '@screens/home';
import ProfileScreen from '@screens/profile';
import LoginScreen from '@screens/login';
import ForgotPasswordScreen from '@screens/forgot-password';

const Stack = createStackNavigator();

const AuthStack: React.FC = () => {
  const { isLoggedIn } = useSelector((state: IState) => state.auth);

  const screenOptions = {
    /* NOTE: When logging out, a pop animation feels intuitive
        You can remove this if you want the default 'push' animation */
    animationTypeForReplace: isLoggedIn ? 'push' : 'pop',
    headerRight: () => <ThemeSwitch />,
    headerTitleStyle: { fontWeight: 'bold' },
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name={screenNames.login}
        component={LoginScreen}
        options={screenOptions}
      />
      <Stack.Screen
        name={screenNames.forgotPassword}
        component={ForgotPasswordScreen}
        options={screenOptions}
      />
    </Stack.Navigator>
  );
};

const HomeStack: React.FC = () => (
  <Stack.Navigator>
    <Stack.Screen
      name={screenNames.home}
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen name={screenNames.profile} component={ProfileScreen} />
  </Stack.Navigator>
);

interface INavigationStackProps {
  theme: Theme;
  isLoggedIn: boolean;
}

const NavigationStack: React.FC<INavigationStackProps> = props => {
  const screenOptions = {
    /* NOTE: When logging out, a pop animation feels intuitive
        You can remove this if you want the default 'push' animation */
    animationTypeForReplace: props.isLoggedIn ? 'push' : 'pop',
    headerRight: () => <ThemeSwitch />,
  };

  return (
    <NavigationContainer theme={props.theme}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {props.isLoggedIn ? (
          <Stack.Screen
            name={stackNames.home}
            // component={BottomTabs} /* NOTE: Enable to show only bottom tabs */
            component={AppDrawer}
            // initialParams={{ isDark: theme.dark }} /* NOTE: To pass additional info to this component */
            options={screenOptions}
          />
        ) : (
          <Stack.Screen
            name={stackNames.auth}
            component={AuthStack}
            options={screenOptions}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export { NavigationStack, AuthStack, HomeStack };
