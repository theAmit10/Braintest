import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const NeumorphicButton = ({onPress, children, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.neumorphicButton, style]}>
      {children}
    </TouchableOpacity>
  );
};
export default NeumorphicButton;

const styles = StyleSheet.create({
  neumorphicButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#222',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#aaa',
    shadowOffset: {width: -10, height: -10},
    shadowOpacity: 0.5,
    shadowRadius: 15,
  },
});
