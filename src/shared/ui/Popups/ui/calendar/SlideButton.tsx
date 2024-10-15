
import { arrowLeftSvg } from "@/shared/assets/svg/arrowLeft";
import { arrowRightSvg } from "@/shared/assets/svg/arrowRight";
import { useThemeColors } from "@/shared/hooks/useTheme";
import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import { SvgXml } from "react-native-svg";

type TPropTypes = {
  side: "left" | "right";
  onPress: () => void;
};

export const SlideButton: FC<TPropTypes> = ({ side, onPress }) => {
  const { colors } = useThemeColors();

  return (
    <Pressable hitSlop={12} style={[styles.cotainer, {backgroundColor: colors.accent_ultra_opacity}]} onPress={onPress}>
      <SvgXml
      width={14}
      height={14}
        xml={
          side === "left"
            ? arrowLeftSvg(colors.accent)
            : arrowRightSvg(colors.accent)
        }
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  cotainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
