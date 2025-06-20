import AsyncStorage from '@react-native-async-storage/async-storage';
import {questiondata} from './data';
import {createTable} from '../../App';
import {getQuestions, insertQuestion} from '../database/databaseAction';

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

// export const addDataToDatabase = () => {
//   questiondata.questions.forEach(question => {
//     insertQuestion(
//       question.category,
//       question.id,
//       question.difficulty,
//       question.question,
//       question.hint,
//       question.explanation,
//       question.answer,
//     );
//   });
// };

export const addDataToDatabase = () => {
  questiondata.questions.forEach((question, index) => {
    console.log(`Inserting question ${index + 1}:`, question); // ✅ Log this

    insertQuestion(
      question.category,
      question.difficulty,
      question.question,
      question.hint,
      question.explanation,
      question.answer,
    );
  });
};

export const getCurrentQuestion = async () => {
  let currentQuestion = await AsyncStorage.getItem('currentQuestion');
  console.log('Raw currentQuestion from storage:', currentQuestion);

  if (!currentQuestion) {
    console.log('currentQuestion is null, fetching first question...');

    try {
      const questions = await getQuestions();
      console.log('Fetched questions:', questions.length);

      if (questions.length === 0) {
        console.error('No questions available.');
        return null;
      }

      currentQuestion = JSON.stringify(questions[0]);
      await AsyncStorage.setItem('currentQuestion', currentQuestion);
      console.log('Stored first question:', currentQuestion);
    } catch (err) {
      console.error('Error fetching questions:', err);
      return null;
    }
  }

  return JSON.parse(currentQuestion);
};

// export const getCurrentQuestion = async () => {
//   let currentQuestion = await AsyncStorage.getItem('currentQuestion');
//   console.log('Raw currentQuestion from storage:', currentQuestion);

//   if (!currentQuestion) {
//     // null or undefined
//     console.log('currentQuestion is null, fetching first question...');

//     const questions = getQuestions(); // Ensure it is awaited
//     console.log('Fetched questions:', questions.length);

//     if (questions.length === 0) {
//       console.error('No questions available.');
//       return null; // Prevent storing undefined
//     }

//     // Convert first question to JSON and store it
//     currentQuestion = JSON.stringify(questions[0]);
//     await AsyncStorage.setItem('currentQuestion', currentQuestion);

//     console.log('Stored first question:', currentQuestion);
//   }

//   return JSON.parse(currentQuestion); // Ensure it returns an object
// };
