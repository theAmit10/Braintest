import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../contrants';

const HomeScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: COLORS.success}}>
      <Text>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
