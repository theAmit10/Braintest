import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('screen');
const NeuButton = ({onPress, children, style}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.neumorphicButton, style]}>
      {children}
    </TouchableOpacity>
  );
};
export default NeuButton;

const styles = StyleSheet.create({
  neumorphicButton: {
    width: width - 20,
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
