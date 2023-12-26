import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { bottomTabNames, screenNames } from '@constants/strings';
import { useSelector } from 'react-redux';
import { IState } from '@models/reducers/state';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationScreen from '@screens/notifications';
import { HomeStack } from './stacks';
import AppStyles from '@config/styles';

/*
  drawer: [bottom-tabs], about screen
  [bottom-tabs]: [home-stack], notification screen (with badge)
  [home-stack]: home screen, profile screen
*/

const BottomTab = createMaterialBottomTabNavigator();

const BottomTabs: React.FC = () => {
  const { list } = useSelector((state: IState) => state.notif);

  return (
    <BottomTab.Navigator shifting>
      <BottomTab.Screen
        name={bottomTabNames.home}
        component={HomeStack}
        options={{
          tabBarLabel: screenNames.home,
          tabBarColor: AppStyles.colors.PURPLE,
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={focused ? hp(3) : hp(2.7)}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={bottomTabNames.notif}
        component={NotificationScreen}
        options={{
          tabBarLabel: screenNames.notifications,
          tabBarColor: AppStyles.colors.INDIAN_RED,
          tabBarIcon: ({ color, focused }) => (
            <Icon
              name={focused ? 'notifications' : 'notifications-outline'}
              color={color}
              size={focused ? hp(3) : hp(2.7)}
            />
          ),
          tabBarBadge: list.length || undefined,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;
