import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../components/molecule/Background';
import Header from '../components/molecule/Header';
import Question from '../components/molecule/Question';
import Footer from '../components/molecule/Footer';
import InputController from '../components/molecule/InputController';
import AnswerInput from '../components/molecule/AnswerInput';
import CustomAlert from '../components/molecule/CustomAlert';

const Play = () => {
  const [showInput, setShowInput] = useState(false);

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
    // Alert.alert('Action', 'Button Moved & Alert Shown');
    // <CustomAlert />;
    setIsAlertVisible(true); // Show the custom alert
  };

  return (
    <Background>
      <Header title={'Level 1'} />
      <Question />
      {showInput && <AnswerInput showAlert={showAlert} />}
      {showInput && <InputController />}
      <Footer showInput={showInput} setShowInput={setShowInput} />

      {/* Show Custom Alert */}
      {isAlertVisible && (
        <CustomAlert
          title="Are you sure?"
          onConfirm={() => setIsAlertVisible(false)} // Close on Yes
          onCancel={() => setIsAlertVisible(false)} // Close on No
        />
      )}
    </Background>
  );
};

export default Play;

const styles = StyleSheet.create({});
