import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../../contrants';
import {FONT} from '../../../assets/constants';

const QuestionExp = ({question}) => {
  return (
    <View style={styles.container}>
      <Text style={{...styles.text, fontSize: 18}}>{question?.question}</Text>
      <Text style={styles.textbold}>Answer</Text>
      <Text style={styles.text}>{question?.answer}</Text>
      <Text style={styles.textbold}>Explantion</Text>
      <Text style={{...styles.text, fontSize: 15}}>
        {question?.explanation}
      </Text>
    </View>
  );
};

export default QuestionExp;

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

    letterSpacing: 1,
    textAlign: 'center', // 👈 ensures multiline text is centered
    paddingHorizontal: 30, // 👈 adds padding for longer lines
    paddingVertical: 10,
    borderRadius: 10,
    fontFamily: FONT.SF_PRO_REGULAR,
  },
  textbold: {
    color: COLORS.white,
    fontSize: 20,

    letterSpacing: 1,
    textAlign: 'center', // 👈 ensures multiline text is centered
    paddingHorizontal: 30, // 👈 adds padding for longer lines
    paddingVertical: 10,
    borderRadius: 10,
    fontFamily: FONT.Montserrat_Bold,
  },
});
