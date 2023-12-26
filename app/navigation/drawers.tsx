import React from 'react';
import { drawerTabNames, screenNames } from '@constants/strings';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import BottomTabs from './bottom-tabs';
import AboutScreen from '@screens/about';

const Drawer = createDrawerNavigator();

const AppDrawer: React.FC = () => (
  <Drawer.Navigator
    screenOptions={{
      headerShown: false,

      /* NOTE: In case headerShown is set to true, 
        this will control the header text & icon color wrt light/dark theme,
        here props being the props passed from navigator to this component (AppDrawer),
        for that uncomment the initialParams prop in NavigationStack's return Element */
      // headerTintColor:
      //   AppStyles.colors[props.route.params.isDark ? 'GREY_WHITE' : 'BLACK'],
    }}>
    <Drawer.Screen
      name={drawerTabNames.home}
      options={{
        // headerTitle: screenNames.home,
        drawerLabel: screenNames.home,
        drawerIcon: ({ color, focused }) => (
          <Icon
            name={focused ? 'home' : 'home-outline'}
            color={color}
            size={wp(5)}
          />
        ),
      }}
      component={BottomTabs}
    />
    <Drawer.Screen
      name={drawerTabNames.about}
      options={{
        // headerTitle: screenNames.about,
        drawerLabel: screenNames.about,
        drawerIcon: ({ color, focused }) => (
          <Icon
            name={focused ? 'information-circle' : 'information-circle-outline'}
            color={color}
            size={wp(5)}
          />
        ),
      }}
      component={AboutScreen}
    />
  </Drawer.Navigator>
);

export default AppDrawer;
