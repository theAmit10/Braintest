import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../components/molecule/Background';
import Header from '../components/molecule/Header';
import Question from '../components/molecule/Question';
import Footer from '../components/molecule/Footer';
import InputController from '../components/molecule/InputController';
import AnswerInput from '../components/molecule/AnswerInput';

const Play = () => {
  const [showInput, setShowInput] = useState(false);
  return (
    <Background>
      <Header title={'Play'} />
      <Question />
      {showInput && <AnswerInput />}
      {showInput && <InputController />}
      <Footer showInput={showInput} setShowInput={setShowInput} />
    </Background>
  );
};

export default Play;

const styles = StyleSheet.create({});
