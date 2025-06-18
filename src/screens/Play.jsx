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

  const [showHint, setShowHint] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [answer, setAnswer] = useState('Answer');

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
      {showInput && (
        <AnswerInput
          showAlert={showAlert}
          answer={answer}
          setAnswer={setAnswer}
        />
      )}
      {showInput && <InputController answer={answer} setAnswer={setAnswer} />}

      <Footer
        question={question}
        showInput={showInput}
        showHint={showHint}
        showNextQuestion={showNextQuestion}
        setShowInput={setShowInput}
        setShowHint={setShowHint}
        setShowNextQuestion={setShowNextQuestion}
      />

      {showHint && (
        <CustomAlert
          title="Watch Ads to get the Hint?"
          onConfirm={() => setShowHint(false)} // Close on Yes
          onCancel={() => setShowHint(false)} // Close on No
        />
      )}

      {/* Show Custom Alert */}
      {isAlertVisible && (
        <CustomAlert
          title="Are you sure?"
          onConfirm={() => setIsAlertVisible(false)} // Close on Yes
          onCancel={() => setIsAlertVisible(false)} // Close on No
        />
      )}

      {showNextQuestion && (
        <CustomAlert
          title="Watch Ads to skip this question ?"
          onConfirm={() => setShowNextQuestion(false)} // Close on Yes
          onCancel={() => setShowNextQuestion(false)} // Close on No
        />
      )}
    </Background>
  );
};

export default Play;

const styles = StyleSheet.create({});
