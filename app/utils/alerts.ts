import Snackbar, { SnackbarAction } from 'react-native-snackbar';
import AppStyles from '@config/styles';
import { labels } from '@constants/strings';

const showSnackMessage = (
  message: string,
  isError?: boolean,
  longerDuration?: boolean,
  indefiniteDuration?: boolean,
  action: SnackbarAction = { text: labels.ok, onPress: Snackbar.dismiss },
) =>
  Snackbar.show({
    text: message,
    duration:
      Snackbar[
        indefiniteDuration
          ? 'LENGTH_INDEFINITE'
          : longerDuration
          ? 'LENGTH_LONG'
          : 'LENGTH_SHORT'
      ],
    backgroundColor: AppStyles.colors[isError ? 'INDIAN_RED' : 'LIGHT_ORANGE'],
    // fontFamily: AppStyles.fonts.POPPINS_MEDIUM, /* NOTE: To add custom font */
    action,
  });

export { showSnackMessage };
