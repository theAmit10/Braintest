import SQLite from 'react-native-sqlite-storage';

// Open the database (or create if it doesn’t exist)
const db = SQLite.openDatabase(
  {name: 'math_riddles.db', location: 'default'},
  () => console.log('Database opened successfully'),
  error => console.error('Database error: ', error),
);

export default db;
