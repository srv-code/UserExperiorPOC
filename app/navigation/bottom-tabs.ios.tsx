import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { bottomTabNames, screenNames } from '@constants/strings';
import { useSelector } from 'react-redux';
import { IState } from '@models/reducers/state';
import Icon from 'react-native-vector-icons/Ionicons';
import NotificationScreen from '@screens/notifications';
import { HomeStack } from './stacks';

/*
  drawer: [bottom-tabs], about screen
  [bottom-tabs]: [home-stack], notification screen (with badge)
  [home-stack]: home screen, profile screen
*/

const BottomTab = createBottomTabNavigator();

const BottomTabs: React.FC = () => {
  const { list } = useSelector((state: IState) => state.notif);

  return (
    <BottomTab.Navigator screenOptions={{ headerShown: false }}>
      <BottomTab.Screen
        name={bottomTabNames.home}
        component={HomeStack}
        options={{
          tabBarLabel: screenNames.home,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'home' : 'home-outline'}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name={bottomTabNames.notif}
        component={NotificationScreen}
        options={{
          tabBarLabel: screenNames.notifications,
          tabBarIcon: ({ color, size, focused }) => (
            <Icon
              name={focused ? 'notifications' : 'notifications-outline'}
              color={color}
              size={size}
            />
          ),
          tabBarBadge: list.length || undefined,
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabs;
