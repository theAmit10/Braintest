import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Background from '../components/molecule/Background';
import Header from '../components/molecule/Header';
import Question from '../components/molecule/Question';
import Footer from '../components/molecule/Footer';

const Play = () => {
  return (
    <Background>
      <Header title={'Play'} />
      <Question />
      <Footer />
    </Background>
  );
};

export default Play;

const styles = StyleSheet.create({});
