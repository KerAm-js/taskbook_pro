import { THEME_GRADIENTS } from "@/shared/config/style/colors";
import { useTheme } from "@/shared/hooks/useTheme";
import { FC } from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

export const ThemedGradient: FC = () => {
  const theme = useTheme();

  const colors = THEME_GRADIENTS[theme];

  return <LinearGradient style={styles.background} colors={colors} />;
};

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    zIndex: 0,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});
