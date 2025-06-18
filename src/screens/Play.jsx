import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Background from '../components/molecule/Background';
import Header from '../components/molecule/Header';
import Question from '../components/molecule/Question';
import Footer from '../components/molecule/Footer';
import InputController from '../components/molecule/InputController';
import AnswerInput from '../components/molecule/AnswerInput';
import CustomAlert from '../components/molecule/CustomAlert';
import currentQuestion from '../store/currentQuestion';
import {getCurrentQuestion} from '../contrants/helper';
import {
  markAsSolved,
  setNextQuestionAsCurrent,
} from '../database/databaseAction';

const Play = () => {
  const [showInput, setShowInput] = useState(false);

  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const showAlert = () => {
    // Alert.alert('Action', 'Button Moved & Alert Shown');
    // <CustomAlert />;
    setIsAlertVisible(true); // Show the custom alert
  };

  // const {question} = currentQuestion();

  const [question, setQuestion] = useState('');

  const fetchQuestion = async () => {
    const quest = await getCurrentQuestion();
    setQuestion(quest);
    console.log('Current Question TA :', quest);
  };

  useEffect(() => {
    fetchQuestion();
    // handleCorrectAnswer(question);
  }, []);

  const handleCorrectAnswer = async currentQuestion => {
    await markAsSolved(currentQuestion.id);
    const nextQuestion = await setNextQuestionAsCurrent();

    if (!nextQuestion) {
      // Show end-of-quiz message or restart option
      console.log('All questions solved!');
    } else {
      console.log('Loaded next question:', nextQuestion.question);
    }
  };

  // const question = getCurrentQuestion();
  // console.log('Current Question:', question);

  return (
    <Background>
      <Header title={`Level ${question.id}`} />
      <Question question={question} />
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
