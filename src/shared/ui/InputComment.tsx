import { FC, PropsWithChildren } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "./Theme";

export const InputComment: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemedText style={styles.text} colorName="textGrey">
      {children}
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  text: {
    paddingHorizontal: 12,
    paddingBottom: 15,
  },
});
