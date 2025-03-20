import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Question = () => {
  return (
    <View style={styles.container}>
      <Text>Question</Text>
    </View>
  );
};

export default Question;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
});
