import SQLite from 'react-native-sqlite-storage';
import RNFS from 'react-native-fs';
import {Platform} from 'react-native';

const dbName = 'math_riddles.db';
const dbDestPath = `${RNFS.DocumentDirectoryPath}/${dbName}`; // Destination path
const dbLocation = Platform.OS === 'ios' ? 'Library' : 'default';
const dbPath = `${RNFS.DocumentDirectoryPath}/${dbName}`;

// const assetDbPath =
//   Platform.OS === 'ios'
//     ? `${RNFS.MainBundlePath}/${dbName}` // iOS path
//     : `android/app/src/main/assets/${dbName}`; // Android path

const assetDbPath = dbName;

const copyDatabase = async () => {
  try {
    console.log('Asset DB Path:', assetDbPath);
    console.log('Destination DB Path:', dbDestPath);
    console.log('dbLocation :', dbLocation);
    console.log('dbPath DB Path:', dbPath);

    const fileExists = await RNFS.exists(dbPath);
    if (!fileExists) {
      console.log('Database not found, copying from assets...');
      await RNFS.copyFile(assetDbPath, dbPath);
      console.log('Database copied successfully.');
    } else {
      console.log('Database already exists.');
    }
  } catch (error) {
    console.error('Error copying database: ', error);
  }
};

copyDatabase();

const db = SQLite.openDatabase(
  {name: dbName, createFromLocation: 1},
  () => console.log('Database opened successfully'),
  error => console.error('Database error: ', error),
);

export default db;

// import SQLite from 'react-native-sqlite-storage';
// import RNFS from 'react-native-fs';
// import {Platform} from 'react-native';

// // Database file path
// const dbName = 'math_riddles.db';
// const dbLocation = Platform.OS === 'ios' ? 'Library' : 'default';
// const dbPath = `${RNFS.DocumentDirectoryPath}/${dbName}`;

// // Function to copy the database from assets to the app's file system
// const copyDatabase = async () => {
//   try {
//     // Check if the database file already exists
//     const fileExists = await RNFS.exists(dbPath);
//     if (!fileExists) {
//       // Copy the database file from assets to the app's file system
//       await RNFS.copyFileAssets(dbName, dbPath);
//       console.log('Database copied successfully');
//     }
//   } catch (error) {
//     console.error('Error copying database: ', error);
//   }
// };

// // Open the database
// const openDatabase = async () => {
//   try {
//     await copyDatabase();

//     const db = SQLite.openDatabase(
//       {name: dbName, location: dbLocation},
//       () => console.log('Database opened successfully'),
//       error => console.error('Database error: ', error),
//     );

//     console.log('Database object:', db); // Log the database object
//     return db;
//   } catch (error) {
//     console.error('Error opening database: ', error);
//     throw error; // Re-throw the error to ensure it's caught
//   }
// };
// export default openDatabase;

// import SQLite from 'react-native-sqlite-storage';

// // Open the database (or create if it doesn’t exist)
// const db = SQLite.openDatabase(
//   {name: 'math_riddles.db', location: 'default'},
//   () => console.log('Database opened successfully'),
//   error => console.error('Database error: ', error),
// );

// export default db;
