import AsyncStorage from '@react-native-async-storage/async-storage';
import {questiondata} from './data';
import {createTable} from '../../App';
import {insertQuestion} from '../database/databaseAction';

export const checkFirstInstall = async () => {
  const firstinstall = await AsyncStorage.getItem('firstinstall');
  console.log('First Install:', firstinstall);

  if (firstinstall === null) {
    console.log('Creating database and adding data');

    // Create Table
    createTable();

    // Add Questions to Database
    addDataToDatabase();

    // Mark first install as complete
    await AsyncStorage.setItem('firstinstall', 'yes');
  }
};

export const addDataToDatabase = () => {
  questiondata.questions.forEach(question => {
    insertQuestion(
      question.category,
      question.id,
      question.difficulty,
      question.question,
      question.hint,
      question.explanation,
      question.answer,
    );
  });
};
