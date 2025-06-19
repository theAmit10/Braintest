import {Platform, StatusBar, StyleSheet, Text, View} from 'react-native';
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
import CustomHintAleart from '../components/molecule/CustomHintAleart';
import AnswerToast from '../components/molecule/AnswerToast';
import {useNavigation} from '@react-navigation/native';
import SkipAnswer from '../components/molecule/SkipAnswer';
import {
  InterstitialAd,
  AdEventType,
  TestIds,
  RewardedAd,
  RewardedAdEventType,
  RewardedInterstitialAd,
} from 'react-native-google-mobile-ads';

const adUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const adUnitIdAnswer = __DEV__
  ? TestIds.REWARDED_INTERSTITIAL
  : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';

const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(
  adUnitIdAnswer,
  {
    keywords: ['fashion', 'clothing'],
  },
);

const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
  keywords: ['fashion', 'clothing'],
});

const Play = () => {
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

  const [question, setQuestion] = useState('');

  const fetchQuestion = async () => {
    const quest = await getCurrentQuestion();
    setQuestion(quest);
    console.log('Current Question TA :', quest);
  };

  useEffect(() => {
    fetchQuestion();
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

  const checkAnswerIsCorrectOrNot = (mineAnswer, correctAnswer) => {
    if (mineAnswer === correctAnswer) {
      handleCorrectAnswer(question);
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

  // FOR REWARDED ADS
  const [loaded, setLoaded] = useState(false);

  // const showAd = () => {
  //   const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  //     requestNonPersonalizedAdsOnly: true,
  //     keywords: ['fashion', 'clothing'],
  //   });

  //   const unsubscribeLoaded = rewarded.addAdEventListener(
  //     RewardedAdEventType.LOADED,
  //     () => {
  //       rewarded.show();
  //     },
  //   );

  //   const unsubscribeEarned = rewarded.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     reward => {
  //       console.log('Callback called!');
  //     },
  //   );

  //   rewarded.load();

  //   setHintView(true);
  // };

  const showAd = () => {
    const rewarded = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['education', 'fun'],
    });

    console.log('Ad is loading...');

    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('Ad Loaded!');
        rewarded.show();
        setHintView(true); // This should now run
      },
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('Reward earned:', reward);
        setHintView(true); // This should now run
        cleanup();
      },
    );

    rewarded.load();

    const cleanup = () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  };

  const showAnswerAd = () => {
    const rewarded = RewardedAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
      keywords: ['education', 'fun'],
    });

    console.log('Ad is loading...');

    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log('Ad Loaded!');
        rewarded.show();
        setAnswerView(true);
      },
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('Reward earned:', reward);
        setAnswerView(true);
        cleanup();
      },
    );

    rewarded.load();

    const cleanup = () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  };

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

      {/**  FOR HINT */}
      {showHint && (
        <CustomAlert
          title="Watch Ads to get the Hint?"
          onConfirm={() => {
            setShowHint(false);
            showAd();
          }} // Close on Yes
          onCancel={() => setShowHint(false)} // Close on No
        />
      )}

      {hintView && (
        <CustomHintAleart
          title={question.hint}
          onConfirm={() => setHintView(false)} // Close on Yes
          onCancel={() => setHintView(false)} // Close on No
        />
      )}

      {/* Show Custom Alert */}
      {isAlertVisible && (
        <AnswerToast
          title="Your answer is"
          subtitle={correctAnswer}
          onConfirm={() => {
            setIsAlertVisible(false);
            navigation.replace('Play');
          }} // Close on Yes
          onCancel={() => setIsAlertVisible(false)} // Close on No
        />
      )}

      {showNextQuestion && (
        <CustomAlert
          title="Watch Ads to skip this question ?"
          onConfirm={() => {
            setShowNextQuestion(false);
            showAnswerAd();
          }} // Close on Yes
          onCancel={() => setShowNextQuestion(false)} // Close on No
        />
      )}

      {answerView && (
        <SkipAnswer
          title="Your answer is"
          subtitle={question.answer}
          explanation={question.explanation}
          onConfirm={skipThisQuestion} // Close on Yes
          onCancel={() => setAnswerView(false)} // Close on No
        />
      )}
    </Background>
  );
};

export default Play;

const styles = StyleSheet.create({});
