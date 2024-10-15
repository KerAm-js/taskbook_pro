import { checkSvg } from "@/shared/assets/svg/check";
import { useThemeColors } from "@/shared";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";

export const DoneBtn: FC<{ onPress: () => void }> = ({ onPress }) => {
  const { colors } = useThemeColors();

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={[styles.circle, { backgroundColor: colors.accent }]}>
        <SvgXml width={14} height={14} xml={checkSvg(colors.background)} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: "center",
    alignItems: "center",
  },
});
