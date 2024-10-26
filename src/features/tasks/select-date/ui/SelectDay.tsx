import {useTaskActions} from '@/entities/task';
import {
  COLORS,
  CustomText,
  getDate,
  isToday,
  TEXT_STYLES,
  THEME_COLORS,
  useThemeColors,
} from '@/shared';
import React, {FC} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';

type TPropTypes = {
  day: number;
  isSelected: boolean;
};

const WIDTH = Dimensions.get('screen').width;
const BUTTON_WIDTH = WIDTH * 0.132;

export const SelectDay: FC<TPropTypes> = React.memo(
  ({day, isSelected}) => {
    const {selectDate} = useTaskActions();
    const {colors} = useThemeColors();
    const isExpired = Date.now() > day;
    return (
      <Pressable
        disabled={isExpired}
        onPress={() => selectDate(day)}
        style={styles.container}>
        <View
          style={[
            styles.titleWrapper,
            isSelected
              ? styles.selected
              : isToday(day) && styles.todayTitleWrapper,
          ]}>
          <CustomText
            style={[
              styles.dateTitle,
              isSelected && styles.selectedDateTitle,
              {color: isSelected ? colors.accent : COLORS.white},
              isExpired && {opacity: 0.5},
            ]}
            translate={false}>
            {getDate(day)}
          </CustomText>
        </View>
      </Pressable>
    );
  },
  (prev, curr) => {
    return prev.isSelected === curr.isSelected;
  },
);

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    width: BUTTON_WIDTH,
    height: 60,
    alignItems: 'center',
  },
  todayTitleWrapper: {
    borderWidth: 1.5,
    borderColor: COLORS.whiteOpacity,
  },
  selected: {
    backgroundColor: COLORS.white,
  },
  titleWrapper: {
    borderRadius: 7,
    borderCurve: 'continuous',
    height: 30,
    width: 30,
    paddingTop: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTitle: {
    color: THEME_COLORS.night.text,
    ...TEXT_STYLES.standart,
  },
  selectedDateTitle: {
    ...TEXT_STYLES.standartSemibold,
  },
});
