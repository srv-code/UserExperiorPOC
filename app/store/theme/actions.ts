import { IThemeSetAction } from '@models/actions/theme';
import { SET_THEME } from './action-types';

const setIsDarkTheme = (value: boolean): IThemeSetAction => ({
  type: SET_THEME,
  payload: { isDark: value },
});

export { setIsDarkTheme };
