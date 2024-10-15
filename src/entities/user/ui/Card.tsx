import { FC } from "react";
import { User } from "../model/types";
import { TEXT_STYLES, ThemedPressable, ThemedText } from "@/shared";
import { StyleSheet, View } from "react-native";
import { ThemedIcon } from "@/shared";
import { arrowRightSvg } from "@/shared/assets/svg/arrowRight";
import { userFilledSvg } from "@/shared/assets/svg/userFilled";

type TPropTypes = {
  data: User;
  onPress: () => void;
};

export const UserCard: FC<TPropTypes> = ({
  data: { name, email },
  onPress,
}) => {
  return (
    <ThemedPressable
      onPress={onPress}
      colorName="backgroundSecond"
      style={styles.container}
    >
      <View style={styles.content}>
        <ThemedIcon
          colorName="accent"
          xmlGetter={userFilledSvg}
          width={34}
          height={34}
        />
        <View style={styles.userInfo}>
          <ThemedText style={styles.name}>{name}</ThemedText>
          <ThemedText colorName="textGrey" style={styles.email}>
            {email}
          </ThemedText>
        </View>
      </View>
      <ThemedIcon
        colorName="grey"
        xmlGetter={arrowRightSvg}
        width={16}
        height={16}
      />
    </ThemedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: "center",
    borderRadius: 12,
    borderCurve: "continuous",
    marginBottom: 10,
  },
  content: {
    alignItems: "center",
    flexDirection: "row",
  },
  userInfo: {
    marginLeft: 8,
  },
  name: { ...TEXT_STYLES.standartSemibold, marginBottom: 1 },
  email: { ...TEXT_STYLES.small },
});
