import React, {useEffect} from 'react';
import Main from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import db from './src/database/database';
import openDatabase from './src/database/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {deleteQuestion, insertQuestion} from './src/database/databaseAction';
import {checkFirstInstall} from './src/contrants/helper';

export const createTable = () => {
  console.log('DB Object:', db); // Debug: Check if db is imported correctly
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS Questions (
        category TEXT, 
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        difficulty TEXT,
        question TEXT,
        hint TEXT,
        explanation TEXT,
        answer TEXT,
        solved INTEGER DEFAULT 0  -- 0 = Unsolved, 1 = Solved
      )`,
      [],
      () => console.log('Table created successfully'),
      error => console.error('Error creating table: ', error),
    );
  });
};

const App = () => {
  // useEffect(() => {
  //   openDatabase();
  // }, []);

  useEffect(() => {
    checkFirstInstall();
    // insertQuestion(
    //   'Number Puzzles',
    //   1,
    //   'Easy',
    //   'What number should replace the question mark? 2, 4, 6, ?, 10',
    //   "It's a simple addition pattern.",
    //   'Each number increases by 2. The missing number is 8.',
    //   '8',
    //   0,
    // );
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Main />
    </GestureHandlerRootView>
  );
};

export default App;
