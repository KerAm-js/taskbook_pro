import { arrowRightSvg } from "@/shared/assets/svg/arrowRight";
import { CustomText, TEXT_STYLES, ThemedIcon, ThemedPressable } from "@/shared";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

type TPropTypes = {
  title: string;
  value: string;
  onPress: () => void;
};

export const NavButton: FC<TPropTypes> = ({ title, value, onPress }) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title} themed colorName="grey">
        {title}
      </CustomText>
      <ThemedPressable
        colorName="backgroundSecond"
        style={styles.button}
        onPress={onPress}
      >
        <CustomText themed style={styles.value}>
          {value}
        </CustomText>
        <ThemedIcon
          colorName="grey"
          xmlGetter={arrowRightSvg}
          width={16}
          height={16}
        />
      </ThemedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  title: {
    ...TEXT_STYLES.standart,
    marginBottom: 5,
    marginLeft: 12
  },
  button: {
    flexDirection: "row",
    borderRadius: 10,
    borderCurve: "continuous",
    minHeight: 40,
    paddingHorizontal: 12,
    paddingVertical: 9,
    alignItems: "center",
    justifyContent: "space-between",
  },
  value: {
    ...TEXT_STYLES.standart,
  },
});
