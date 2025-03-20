import React from 'react';
import Main from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Main />
    </GestureHandlerRootView>
  );
};

export default App;
