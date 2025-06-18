import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../contrants';

const Question = ({question}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{question?.hint}</Text>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});
