import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../contrants';
import Background from '../components/molecule/Background';
import Section from '../components/molecule/Section';
import Header from '../components/molecule/Header';
import NeuButton from '../components/atom/NeuButton';
import TextView from '../components/atom/TextView';

const HomeScreen = () => {
  return (
    <Background>
      <View style={styles.container}>
        <Header />
        <NeuButton>
          <TextView title={'Play'} />
        </NeuButton>
      </View>
    </Background>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  text: {
    fontSize: 20,
    color: 'black', // ✅ Ensure it's visible
  },
});
