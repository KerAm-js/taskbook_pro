import { arrowLeftSvg } from "@/shared/assets/svg/arrowLeft";
import { useTaskActions } from "@/entities/task";
import { endOfDay, THEME_COLORS } from "@/shared";
import { FC } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";

export const ScrollToStartButton: FC<{ onPress: () => void }> = ({
  onPress,
}) => {
  const { selectDate } = useTaskActions();
  const onPressHandler = () => {
    selectDate(endOfDay());
    onPress();
  };
  return (
    <Pressable onPress={onPressHandler} style={styles.container}>
      <View style={styles.circle}>
        <SvgXml
          xml={arrowLeftSvg(THEME_COLORS.night.accent)}
          width={12}
          height={12}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: {
    backgroundColor: THEME_COLORS.night.accent_opacity,
    height: 24,
    width: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    paddingTop: 2,
    color: THEME_COLORS.night.accent,
  },
});
