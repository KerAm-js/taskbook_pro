import { Pressable, StyleSheet } from "react-native";
import { TEXT_STYLES } from "../config/style/texts";
import { FC } from "react";
import { AnimatedCheck } from "./AnimatedCheck/ui/AnimatedCheck";
import { useThemeColors } from "../hooks/useTheme";
import { CustomText } from "./CustomText";
import { ThemedView } from "./Theme/ui/ThemedView";

export type CheckListValue = { title: string; value: any };

type TPropTypes = {
  data: Array<CheckListValue>;
  disabled?: boolean;
  checkMethod: (value: any) => boolean;
  onPress: (value: any) => void;
  translateTitle?: boolean;
};

export const CheckList: FC<TPropTypes> = ({
  data,
  checkMethod,
  disabled,
  onPress,
  translateTitle = false,
}) => {
  const { colors } = useThemeColors();

  return (
    <ThemedView colorName="backgroundSecond" style={[styles.listContainer, disabled && styles.containerDisabled]}>
      {data.map((item, index) => {
        const isChecked = checkMethod(item.value);

        return (
          <Pressable
            key={item.title}
            onPress={() => onPress(item.value)}
            disabled={disabled}
            style={[
              styles.item,
              index !== 0 && {
                borderColor: colors.background,
                borderTopWidth: 1,
              },
            ]}
          >
            <CustomText
              translate={translateTitle}
              style={[
                isChecked ? TEXT_STYLES.standartBold : TEXT_STYLES.standart,
              ]}
              colorName="text"
              themed
            >
              {item.title}
            </CustomText>
            <AnimatedCheck size={22} isChecked={isChecked} />
          </Pressable>
        );
      })}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 12,
    borderCurve: "continuous",
    paddingVertical: 5,
  },
  containerDisabled: {
    opacity: 0.5
  },
  item: {
    flexDirection: "row",
    gap: 20,
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    ...TEXT_STYLES.standart,
  },
});
