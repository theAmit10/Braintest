import React, {useEffect, useState} from 'react';
import Background from '../components/molecule/Background';
import Header from '../components/molecule/Header';
import Question from '../components/molecule/Question';
import Footer from '../components/molecule/Footer';
import InputController from '../components/molecule/InputController';
import AnswerInput from '../components/molecule/AnswerInput';
import CustomAlert from '../components/molecule/CustomAlert';
import {getCurrentQuestion} from '../contrants/helper';
import {
  markAsSolved,
  setNextQuestionAsCurrent,
} from '../database/databaseAction';
import CustomHintAleart from '../components/molecule/CustomHintAleart';
import AnswerToast from '../components/molecule/AnswerToast';
import {useNavigation, useRoute} from '@react-navigation/native';
import SkipAnswer from '../components/molecule/SkipAnswer';
import QuestionExp from '../components/molecule/QuestionExp';

const PreviousQuestion = () => {
  const route = useRoute();
  const {question} = route.params;
  const navigation = useNavigation();
  const [showInput, setShowInput] = useState(false);

  const [showHint, setShowHint] = useState(false);
  const [showNextQuestion, setShowNextQuestion] = useState(false);
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [answer, setAnswer] = useState('Answer');
  const [hintView, setHintView] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [answerView, setAnswerView] = useState(false);

  const showAlert = () => {
    setIsAlertVisible(true); // Show the custom alert
    checkAnswerIsCorrectOrNot(answer, question.answer);
  };

  //   const [question, setQuestion] = useState('');

  const fetchQuestion = async () => {
    const quest = await getCurrentQuestion();
    setQuestion(quest);
    console.log('Current Question TA :', quest);
  };

  const checkAnswerIsCorrectOrNot = (mineAnswer, correctAnswer) => {
    if (mineAnswer === correctAnswer) {
      //   handleCorrectAnswer(question);
      setCorrectAnswer('Correct');
    } else {
      setCorrectAnswer('Wrong');
    }
  };

  const skipThisQuestion = async () => {
    setAnswerView(false);

    await markAsSolved(question.id);
    const nextQuestion = await setNextQuestionAsCurrent();

    if (nextQuestion) {
      setQuestion(nextQuestion); // ✅ Set new question in state
    }
  };

  return (
    <Background>
      <Header title={`Level ${question?.id}`} fromscreen={'previousQuestion'} />
      <QuestionExp question={question} />
    </Background>
  );
};

export default PreviousQuestion;
