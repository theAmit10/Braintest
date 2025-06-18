import AsyncStorage from '@react-native-async-storage/async-storage';
import db from './database';

/**
 * Insert a new question into the database.
 */
const insertQuestion = (
  category,
  difficulty,
  question,
  hint,
  explanation,
  answer,
) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO Questions (category, difficulty, question, hint, explanation, answer, solved) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [category, difficulty, question, hint, explanation, answer, 0],
      (_, result) => console.log('Inserted question ID:', result.insertId),
      error => console.error('Insert error:', error),
    );
  });
};

/**
 * Get all questions from the database (Promise-based).
 */
const getQuestions = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Questions',
        [],
        (_, {rows}) => resolve(rows.raw()),
        error => {
          console.error('Query error:', error);
          reject(error);
        },
      );
    });
  });
};

/**
 * Mark a specific question as solved (Promise-based).
 */
const markAsSolved = questionId => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Questions SET solved = 1 WHERE id = ?',
        [questionId],
        () => {
          console.log(`Question ${questionId} marked as solved`);
          resolve();
        },
        error => {
          console.error('Update error:', error);
          reject(error);
        },
      );
    });
  });
};

/**
 * Get all unsolved questions (Promise-based).
 */
const getUnsolvedQuestions = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM Questions WHERE solved = 0',
        [],
        (_, {rows}) => resolve(rows.raw()),
        error => {
          console.error('Query error:', error);
          reject(error);
        },
      );
    });
  });
};

/**
 * Delete a question by ID (Promise-based).
 */
const deleteQuestion = questionId => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM Questions WHERE id = ?',
        [questionId],
        () => {
          console.log(`Question ${questionId} deleted`);
          resolve();
        },
        error => {
          console.error('Delete error:', error);
          reject(error);
        },
      );
    });
  });
};

/**
 * Reset all questions to unsolved (Promise-based).
 */
const resetSolvedStatus = () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE Questions SET solved = 0',
        [],
        () => {
          console.log('All questions reset to unsolved');
          resolve();
        },
        error => {
          console.error('Reset error:', error);
          reject(error);
        },
      );
    });
  });
};

/**
 * Set the next unsolved question as the current question in AsyncStorage.
 */
const setNextQuestionAsCurrent = async () => {
  try {
    const unsolvedQuestions = await getUnsolvedQuestions();

    if (unsolvedQuestions.length === 0) {
      console.log('No more unsolved questions.');
      await AsyncStorage.removeItem('currentQuestion');
      return null;
    }

    const nextQuestion = unsolvedQuestions[0];
    await AsyncStorage.setItem('currentQuestion', JSON.stringify(nextQuestion));
    console.log('Next question set as current:', nextQuestion);
    return nextQuestion;
  } catch (error) {
    console.error('Failed to set next question:', error);
    return null;
  }
};

/**
 * Get the current question from AsyncStorage.
 * If not found, fallback to the first unsolved question.
 */
const getCurrentQuestion = async () => {
  try {
    let current = await AsyncStorage.getItem('currentQuestion');
    if (current) {
      return JSON.parse(current);
    }

    console.log('No current question found, setting first unsolved...');
    const next = await setNextQuestionAsCurrent();
    return next;
  } catch (error) {
    console.error('Error getting current question:', error);
    return null;
  }
};

export {
  insertQuestion,
  getQuestions,
  markAsSolved,
  getUnsolvedQuestions,
  deleteQuestion,
  resetSolvedStatus,
  setNextQuestionAsCurrent,
  getCurrentQuestion,
};

// import AsyncStorage from '@react-native-async-storage/async-storage';
// import db from './database';

// const insertQuestion = (
//   category,
//   difficulty,
//   question,
//   hint,
//   explanation,
//   answer,
// ) => {
//   db.transaction(tx => {
//     tx.executeSql(
//       `INSERT INTO Questions (category, difficulty, question, hint, explanation, answer, solved)
//        VALUES (?, ?, ?, ?, ?, ?, ?)`,
//       [category, difficulty, question, hint, explanation, answer, 0], // Ensure all columns are provided
//       (_, result) => console.log('Inserted question ID:', result.insertId),
//       error => console.error('Insert error:', error),
//     );
//   });
// };

// // const getQuestions = callback => {
// //   db.transaction(tx => {
// //     tx.executeSql(
// //       'SELECT * FROM Questions',
// //       [],
// //       (_, {rows}) => callback(rows.raw()), // Convert result set to array
// //       error => console.error('Query error: ', error),
// //     );
// //   });
// // };

// const getQuestions = () => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM Questions',
//         [],
//         (_, {rows}) => resolve(rows.raw()),
//         error => {
//           console.error('Query error: ', error);
//           reject(error);
//         },
//       );
//     });
//   });
// };

// // const markAsSolved = questionId => {
// //   db.transaction(tx => {
// //     tx.executeSql(
// //       'UPDATE Questions SET solved = 1 WHERE id = ?',
// //       [questionId],
// //       () => console.log(`Question ${questionId} marked as solved`),
// //       error => console.error('Update error: ', error),
// //     );
// //   });
// // };

// const markAsSolved = questionId => {
//   return new Promise((resolve, reject) => {
//     db.transaction(tx => {
//       tx.executeSql(
//         'UPDATE Questions SET solved = 1 WHERE id = ?',
//         [questionId],
//         () => {
//           console.log(`Question ${questionId} marked as solved`);
//           resolve();
//         },
//         error => {
//           console.error('Update error: ', error);
//           reject(error);
//         },
//       );
//     });
//   });
// };

// const getUnsolvedQuestions = callback => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'SELECT * FROM Questions WHERE solved = 0',
//       [],
//       (_, {rows}) => callback(rows.raw()),
//       error => console.error('Query error: ', error),
//     );
//   });
// };

// const deleteQuestion = questionId => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'DELETE FROM Questions WHERE id = ?',
//       [questionId],
//       () => console.log(`Question ${questionId} deleted`),
//       error => console.error('Delete error: ', error),
//     );
//   });
// };

// const resetSolvedStatus = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       'UPDATE Questions SET solved = 0',
//       [],
//       () => console.log('All questions reset to unsolved'),
//       error => console.error('Reset error: ', error),
//     );
//   });
// };

// const setNextQuestionAsCurrent = async () => {
//   try {
//     const questions = await new Promise((resolve, reject) => {
//       db.transaction(tx => {
//         tx.executeSql(
//           'SELECT * FROM Questions WHERE solved = 0',
//           [],
//           (_, {rows}) => resolve(rows.raw()),
//           error => reject(error),
//         );
//       });
//     });

//     if (questions.length === 0) {
//       console.log('No more unsolved questions.');
//       await AsyncStorage.removeItem('currentQuestion');
//       return null;
//     }

//     const nextQuestion = questions[0];
//     await AsyncStorage.setItem('currentQuestion', JSON.stringify(nextQuestion));
//     console.log('Next question set as current:', nextQuestion);
//     return nextQuestion;
//   } catch (error) {
//     console.error('Failed to set next question:', error);
//     return null;
//   }
// };

// export {
//   insertQuestion,
//   getQuestions,
//   markAsSolved,
//   getUnsolvedQuestions,
//   deleteQuestion,
//   resetSolvedStatus,
//   setNextQuestionAsCurrent,
// };
