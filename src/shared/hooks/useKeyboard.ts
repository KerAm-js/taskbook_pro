import { useEffect } from "react";
import { Keyboard, KeyboardEvent } from "react-native";
import { useSharedValue } from "react-native-reanimated";

export const useKeyboard = () => {
  const keyboardHeight = useSharedValue(0);

  function onKeyboardWillShow(e: KeyboardEvent) {
    keyboardHeight.value = e.endCoordinates.height;
  }

  function onKeyboardWillHide() {
    keyboardHeight.value = 0;
  }

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardWillShow', onKeyboardWillShow);
    const hideSubscription = Keyboard.addListener('keyboardWillHide', onKeyboardWillHide);
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardHeight;
}