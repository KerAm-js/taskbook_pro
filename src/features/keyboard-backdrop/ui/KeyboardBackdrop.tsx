import { useKeyboard } from "@/shared";
import { useState } from "react";
import { Keyboard, Pressable, StyleSheet } from "react-native";
import { runOnJS, useAnimatedReaction } from "react-native-reanimated";

export const KeyboardBackdrop = () => {
  const [visible, setVisible] = useState(false);
  const keyboardHeight = useKeyboard();

  const onPress = () => {
    Keyboard.dismiss();
  };

  useAnimatedReaction(
    () => keyboardHeight.value,
    (curr) => {
      if (curr) {
        runOnJS(setVisible)(true);
      } else {
        runOnJS(setVisible)(false);
      }
    }
  );

  return visible ? (
    <Pressable onPress={onPress} style={styles.pressable} />
  ) : null;
};

const styles = StyleSheet.create({
  pressable: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
});
