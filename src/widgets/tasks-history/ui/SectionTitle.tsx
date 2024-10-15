import { TEXT_STYLES, ThemedText } from "@/shared";
import { FC, PropsWithChildren } from "react";
import { StyleSheet } from "react-native";

export const SectionTitle: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemedText colorName="textGrey" style={styles.title}>
      {children}
    </ThemedText>
  );
};

const styles = StyleSheet.create({
  title: {
    ...TEXT_STYLES.title,
    marginVertical: 10,
  },
});
