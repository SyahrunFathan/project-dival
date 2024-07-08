import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  HistoryScreen,
  HomeSecreen,
  LoginScreen,
  ProfileScreen,
  SplashScreen,
} from '../Screen';
import {COLORS} from '../Assets';
import {IonIcon} from '../Components';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, size, color}) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
            size = focused ? size + 10 : size + 7;
          } else if (route.name === 'History') {
            iconName = focused ? 'alarm' : 'alarm-outline';
            size = focused ? size + 10 : size + 7;
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
            size = focused ? size + 10 : size + 7;
          }

          return <IonIcon name={iconName} size={size} color={color} />;
        },
        tabBarInactiveTintColor: COLORS.grey,
        tabBarActiveTintColor: COLORS.white,
        tabBarStyle: {
          backgroundColor: COLORS.primary,
          height: 60,
          borderTopStartRadius: 20,
          borderTopEndRadius: 20,
        },
        tabBarLabelStyle: {
          marginBottom: -10,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeSecreen}
        options={{headerShown: false, title: ''}}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{headerShown: false, title: ''}}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{headerShown: false, title: ''}}
      />
    </Tab.Navigator>
  );
};

const Routes = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{
          statusBarColor: COLORS.primary,
          statusBarStyle: 'light',
          contentStyle: {
            backgroundColor: COLORS.primary,
          },
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          statusBarColor: COLORS.white,
          statusBarStyle: 'dark',
          contentStyle: {
            backgroundColor: COLORS.white,
          },
        }}
      />
      <Stack.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
          statusBarColor: COLORS.primary,
          statusBarStyle: 'light',
        }}
      />
    </Stack.Navigator>
  );
};

export default Routes;
