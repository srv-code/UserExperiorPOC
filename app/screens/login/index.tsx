import React, { useState, useEffect } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  View,
  Platform,
  TextInput as TextInputRef,
} from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '@models/reducers/state';
import styles from './styles';
import { labels, screenNames } from '@constants/strings';
import { USERNAME_REGEX, PASSWORD_REGEX } from '@constants/regex';
import { showSnackMessage } from '@utils/alerts';
import useOrientation from '@hooks/orientation';
import { requestLogin } from '@store/auth/actions';
import Screen from '@components/screen';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import UserExperiorControls from '@components/user-experior-controls';

const LoginScreen: React.FC = ({ navigation }) => {
  const getComputedResponsiveStyles = () => ({
    container: { paddingHorizontal: wp(3), paddingVertical: hp(2) },
    inputContainer: { paddingBottom: hp(2) },
    forgotButton: { marginTop: hp(1) },
    buttonText: { fontSize: wp(3.5) },
    linkButtonText: { fontSize: wp(2.8) },
  });

  const [username, setUsername] = useState<string>('admin');
  const [password, setPassword] = useState<string>('Admin@123');
  const [hidePassword, setHidePassword] = useState<boolean>(true);
  const [responsiveStyles, setResponsiveStyles] = useState(
    getComputedResponsiveStyles(),
  );
  const [textInput, setTextInput] = useState<TextInputRef | null>(null);

  const { screenOrientation } = useOrientation();

  useEffect(
    () => setResponsiveStyles(getComputedResponsiveStyles()),
    [screenOrientation],
  );

  const {
    auth: { error, isLoggedIn },
    loading: { isLoggingIn },
  } = useSelector((state: IState) => state);

  useEffect(() => {
    if (error) showSnackMessage(`${labels.loginFailed}: ${error}`, true, true);
    else if (isLoggedIn) showSnackMessage(labels.loginSuccessful);
  }, [error, isLoggedIn]);

  const dispatch = useDispatch();

  const onLogin = () => {
    Keyboard.dismiss();
    if (USERNAME_REGEX.test(username) && PASSWORD_REGEX.test(password))
      dispatch(requestLogin(username, password));
    else showSnackMessage(labels.invalidCred, true, true);
  };

  /* NOTE: Sample of making use of the navigator's navigation object
      to navigate to another screen and passing data along with it */
  const onForgotPress = () =>
    navigation.navigate(screenNames.forgotPassword, { username });

  return (
    <Screen style={[styles.container, responsiveStyles.container]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : 'padding'}>
        <View style={responsiveStyles.inputContainer}>
          <TextInput
            label={labels.username}
            ref={setTextInput}
            value={username}
            onChangeText={setUsername}
            autoFocus
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="username"
          />
          <TextInput
            label={labels.password}
            value={password}
            secureTextEntry={hidePassword}
            onChangeText={setPassword}
            autoComplete="password"
            autoCapitalize="none"
            autoCorrect={false}
            right={
              <TextInput.Icon
                onPress={() => setHidePassword(value => !value)}
                name={hidePassword ? 'eye' : 'eye-off'}
              />
            }
          />
        </View>

        <View style={styles.buttonContainer}>
          <Button
            icon="login"
            mode="outlined"
            loading={isLoggingIn}
            disabled={isLoggingIn}
            uppercase={false}
            labelStyle={responsiveStyles.buttonText}
            onPress={onLogin}>
            {labels.login}
          </Button>
          <Button
            mode="text"
            uppercase={false}
            style={responsiveStyles.forgotButton}
            labelStyle={responsiveStyles.linkButtonText}
            onPress={onForgotPress}>
            {labels.forgotPassword}
          </Button>
        </View>

        <UserExperiorControls
          style={{ height: '65%' }}
          elementRef={textInput}
        />
      </KeyboardAvoidingView>
    </Screen>
  );
};

export default LoginScreen;
