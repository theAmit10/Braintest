import db from './database';

export const markAsSolved = questionId => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Questions SET solved = 1 WHERE id = ?',
      [questionId],
      () => console.log(`Question ${questionId} marked as solved`),
      error => console.error('Update error: ', error),
    );
  });
};
export const getUnsolvedQuestions = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Questions WHERE solved = 0',
      [],
      (_, {rows}) => callback(rows.raw()),
      error => console.error('Query error: ', error),
    );
  });
};

export const getSolvedQuestions = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Questions WHERE solved = 1',
      [],
      (_, {rows}) => callback(rows.raw()),
      error => console.error('Query error: ', error),
    );
  });
};

export const resetSolvedStatus = () => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Questions SET solved = 0',
      [],
      () => console.log('All questions reset to unsolved'),
      error => console.error('Reset error: ', error),
    );
  });
};

export const insertQuestion = (
  category,
  difficulty,
  question,
  hint,
  explanation,
  answer,
) => {
  db.transaction(tx => {
    tx.executeSql(
      `INSERT INTO Questions (category, difficulty, question, hint, explanation, answer) VALUES (?, ?, ?, ?, ?, ?)`,
      [category, difficulty, question, hint, explanation, answer],
      (_, result) => console.log('Inserted question ID: ', result.insertId),
      error => console.error('Insert error: ', error),
    );
  });
};

export const insertAllQuestions = () => {
  questionsData.questions.forEach(q => {
    insertQuestion(
      q.category,
      q.difficulty,
      q.question,
      q.hint,
      q.explanation,
      q.answer,
    );
  });
};

export const getQuestions = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Questions',
      [],
      (_, {rows}) => {
        callback(rows.raw()); // Convert result set into array
      },
      error => console.error('Query error: ', error),
    );
  });
};

// export const getQuestions = async callback => {
//   try {
//     const db = await openDatabase();

//     db.transaction(tx => {
//       tx.executeSql(
//         'SELECT * FROM Questions',
//         [],
//         (_, {rows}) => {
//           callback(rows.raw());
//         },
//         error => {
//           console.error('Query error: ', error);
//           throw error; // Re-throw the error to ensure it's caught
//         },
//       );
//     });
//   } catch (error) {
//     console.error('Database error: ', error);
//   }
// };

export const deleteAllQuestions = () => {
  db.transaction(tx => {
    tx.executeSql('DELETE FROM Questions', [], () =>
      console.log('All questions deleted'),
    );
  });
};

export const deleteQuestion = (id, callback) => {
  db.transaction(tx => {
    tx.executeSql(
      `DELETE FROM Questions WHERE id = ?`,
      [id], // Passing id as a parameter
      (_, result) => {
        console.log(`Question with ID ${id} deleted successfully`);
        if (callback) callback(true);
      },
      error => {
        console.error('Error deleting question:', error);
        if (callback) callback(false);
      },
    );
  });
};
