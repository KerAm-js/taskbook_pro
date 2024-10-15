import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { FC, PropsWithChildren } from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { CustomText } from "@/shared/ui/CustomText";
import { ThemedView } from "@/shared/ui/Theme/ui/ThemedView";
import { TEXT_STYLES } from "@/shared/config/style/texts";
import { Button } from "./Button";
import { COLORS } from "@/shared/config/style/colors";

export type TPopupPropTypes = {
  hide: () => void;
  title?: string;
  onSubmit: () => void;
  onDestructive?: () => void;
  destructiveTitle?: string;
};

export const Popup: FC<TPopupPropTypes & PropsWithChildren> = ({
  onSubmit,
  onDestructive,
  destructiveTitle,
  title,
  hide,
  children,
}) => {
  const onDestructiveHandler = () => {
    if (onDestructive) onDestructive();
    hide();
  };
  const onSubmitHandler = () => {
    onSubmit();
    hide();
  };
  return (
    <Animated.View
      style={styles.container}
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(100)}
    >
      <ThemedView style={styles.componentContainer} colorName="background">
        {title && (
          <CustomText themed colorName="text" style={styles.title}>
            {title}
          </CustomText>
        )}
        {children}
        <View style={styles.buttonsContainer}>
          {onDestructive && (
            <Button title={destructiveTitle} type="destructive" onPress={onDestructiveHandler} />
          )}
          <Button type="submit" onPress={onSubmitHandler} />
        </View>
      </ThemedView>
      <Pressable style={styles.backdrop} onPress={hide}></Pressable>
    </Animated.View>
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
    flex: 1,
    backgroundColor: COLORS.textGrey,
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  componentContainer: {
    paddingTop: 15,
    minHeight: 280,
    maxHeight: 450,
    minWidth: 270,
    maxWidth: 300,
    gap: 10,
    borderRadius: 15,
    borderCurve: "continuous",
    alignItems: "center",
    marginBottom: 70,
  },
  title: {
    ...TEXT_STYLES.standartBold,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 8,
    padding: 12,
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
    ...TEXT_STYLES.smallBold,
  },
});
