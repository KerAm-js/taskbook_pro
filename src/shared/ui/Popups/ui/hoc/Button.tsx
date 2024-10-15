import { TEXT_STYLES } from "@/shared/config/style/texts";
import { CustomText } from "@/shared/ui/CustomText";
import { ThemedPressable } from "@/shared/ui/Theme/ui/ThemedPressable";
import { FC } from "react";
import { StyleSheet } from "react-native";

type TButtonPropTypes = {
  type: "destructive" | "submit";
  title?: string;
  onPress: () => void;
};

export const Button: FC<TButtonPropTypes> = ({ type, title, onPress }) => {
  return (
    <ThemedPressable
      style={styles.button}
      hitSlop={{ top: 4, bottom: 4 }}
      colorName={
        type === "submit" ? "accent_ultra_opacity" : "destructiveOpacity"
      }
      onPress={onPress}
    >
      <CustomText
        style={
          type === "submit"
            ? TEXT_STYLES.standartBold
            : TEXT_STYLES.standartSemibold
        }
        themed
        colorName={type === "submit" ? "accent" : "destructive"}
      >
        {title || "done"}
      </CustomText>
    </ThemedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  flex: {
    flex: 1,
  },
  backdrop: {
    zIndex: -1,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  componentContainer: {
    padding: 12,
    paddingTop: 15,
    minHeight: 280,
    maxHeight: 450,
    minWidth: 270,
    maxWidth: 300,
    gap: 10,
    borderRadius: 15,
    borderCurve: "continuous",
    alignItems: "center",
  },
  title: {
    ...TEXT_STYLES.standartBold,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    marginTop: 5,
  },
  button: {
    height: 38,
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderCurve: "continuous",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonTitle: {
    ...TEXT_STYLES.smallSemibold,
  },
});
