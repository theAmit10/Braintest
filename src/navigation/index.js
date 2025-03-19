import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import Levels from '../screens/Levels';

const Stack = createNativeStackNavigator();

const Main = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="HomeScreen">
        <Stack.Group>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Levels" component={Levels} />
        </Stack.Group>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;

const styles = StyleSheet.create({});
