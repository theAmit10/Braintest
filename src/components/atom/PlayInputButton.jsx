import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {COLORS, screenWidth} from '../../contrants';

const PlayInputButton = ({number}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Text style={styles.text}>{number}</Text>
    </TouchableOpacity>
  );
};

export default PlayInputButton;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: screenWidth / 7,
    margin: 5,
    backgroundColor: COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 10,
    shadowColor: 'cyan',
    shadowOffset: {width: -10, height: -10},
    shadowOpacity: 0.5,
    shadowRadius: 15,
    borderColor: 'cyan',
    borderWidth: 1,
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
