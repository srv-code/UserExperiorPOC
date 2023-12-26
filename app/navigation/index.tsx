import React from 'react';
import { useSelector } from 'react-redux';
import { Theme } from '@react-navigation/native';
import { IState } from '@models/reducers/state';
import { NavigationStack } from './stacks';

interface IProps {
  theme: Theme;
}

const Navigator: React.FC<IProps> = (props: IProps) => {
  const { theme } = props;
  const { isLoggedIn } = useSelector((state: IState) => state.auth);

  return <NavigationStack theme={theme} isLoggedIn={isLoggedIn} />;
};

export default Navigator;
