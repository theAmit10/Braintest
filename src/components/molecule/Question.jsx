import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef} from 'react';
import {COLORS} from '../../contrants';

const Question = ({question, adsLoading}) => {
  return (
    <View style={styles.container}>
      {adsLoading ? (
        <ActivityIndicator size="large" color={'cyan'} />
      ) : (
        <Text style={styles.text}>{question?.question}</Text>
      )}
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
    textAlign: 'center', // 👈 ensures multiline text is centered
    paddingHorizontal: 30, // 👈 adds padding for longer lines
    paddingVertical: 10,
    borderRadius: 10,
  },
});
