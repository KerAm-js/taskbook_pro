/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {Root} from './src/app';
import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
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

const styles = StyleSheet.create({});

export default App;
