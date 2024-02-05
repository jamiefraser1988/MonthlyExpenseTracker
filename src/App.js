import React from 'react';
import AppNavigator from './navigation/AppNavigator'; // Adjust the path based on your file structure
import {MenuProvider} from 'react-native-popup-menu';

const App = () => {
  return (
    <MenuProvider>
      <AppNavigator />
    </MenuProvider>
  );
};

export default App;
