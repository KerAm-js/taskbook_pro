/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Root} from './src/app';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {KeyboardProvider} from 'react-native-keyboard-controller';

function App(): React.JSX.Element {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider>
        <Root />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

export default App;
