import { TEXT_STYLES } from "@/shared/config/style/texts";
import { WEEK_DAYS } from "@/shared/consts/datetime";
import { CustomText } from "@/shared/ui/CustomText";
import { ThemedView } from "@/shared/ui/Theme";
import { StyleSheet } from "react-native";

export const WeekDayTitles = () => {
  return <ThemedView colorName="background" borderColorName="lineGrey" style={[styles.weekDaysList]}>
    {WEEK_DAYS.map((item) => (
      <CustomText themed colorName="textGrey" key={item.full} style={styles.weekDay}>
        {item.short}
      </CustomText>
    ))}
  </ThemedView>;
};

const styles = StyleSheet.create({
  weekDaysList: {
    flexDirection: "row",
    paddingBottom: 5,
    paddingTop: 7,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginVertical: 10
  },
  weekDay: {
    width: 38,
    textAlign: "center",
    marginBottom: 2,
    lineHeight: 18,
    ...TEXT_STYLES.small,
  },
});
