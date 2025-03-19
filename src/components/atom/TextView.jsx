import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../contrants';

const TextView = ({title}) => {
  return <Text style={styles.text}>{title}</Text>;
};

export default TextView;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.white || '#333', // ✅ Ensure color exists
  },
});
