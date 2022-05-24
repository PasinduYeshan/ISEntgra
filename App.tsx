// import "react-native-gesture-handler";
import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthProvider} from '@asgardeo/auth-react-native';

import {LoginContextProvider} from './src//context/LoginContext';

// Screens
import DeviceAttributesScreen from './src/screens/DeviceAttributesScreen';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import ConsentScreen from './src/screens/ConsentScreen';
import LoadingScreen from './src/screens/LoadingScreen';


const App = () => {
  const Stack = createStackNavigator();
  return (
    <AuthProvider>
      <LoginContextProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName={'LoadingScreen'}>
            <Stack.Screen
              name="DeviceAttributes"
              component={DeviceAttributesScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ConsentScreen"
              component={ConsentScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LoadingScreen"
              component={LoadingScreen}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LoginContextProvider>
    </AuthProvider>
  );
};

export default App;