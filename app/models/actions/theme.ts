interface IThemeSetAction {
  type: string;
  payload: { isDark: boolean };
}

export type { IThemeSetAction };
