import db from './database';

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
      [category, difficulty, question, hint, explanation, answer, 0], // Ensure all columns are provided
      (_, result) => console.log('Inserted question ID:', result.insertId),
      error => console.error('Insert error:', error),
    );
  });
};

const getQuestions = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Questions',
      [],
      (_, {rows}) => callback(rows.raw()), // Convert result set to array
      error => console.error('Query error: ', error),
    );
  });
};

const markAsSolved = questionId => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Questions SET solved = 1 WHERE id = ?',
      [questionId],
      () => console.log(`Question ${questionId} marked as solved`),
      error => console.error('Update error: ', error),
    );
  });
};

const getUnsolvedQuestions = callback => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM Questions WHERE solved = 0',
      [],
      (_, {rows}) => callback(rows.raw()),
      error => console.error('Query error: ', error),
    );
  });
};

const deleteQuestion = questionId => {
  db.transaction(tx => {
    tx.executeSql(
      'DELETE FROM Questions WHERE id = ?',
      [questionId],
      () => console.log(`Question ${questionId} deleted`),
      error => console.error('Delete error: ', error),
    );
  });
};

const resetSolvedStatus = () => {
  db.transaction(tx => {
    tx.executeSql(
      'UPDATE Questions SET solved = 0',
      [],
      () => console.log('All questions reset to unsolved'),
      error => console.error('Reset error: ', error),
    );
  });
};

export {
  insertQuestion,
  getQuestions,
  markAsSolved,
  getUnsolvedQuestions,
  deleteQuestion,
  resetSolvedStatus,
};
