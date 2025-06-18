import React, {useEffect} from 'react';
import Main from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import db from './src/database/database';
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
  useEffect(() => {
    checkFirstInstall();
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Main />
    </GestureHandlerRootView>
  );
};

export default App;
