import {useTaskActions} from '@/entities/task';
import {useDateTasksCount} from '@/entities/task/model/hooks';
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
    const tasksCount = useDateTasksCount(day);
    const {colors} = useThemeColors();
    const isExpired = Date.now() > day;

    const textColor = isSelected ? colors.header : COLORS.white;

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
            isExpired && {opacity: 0.5},
          ]}>
          <CustomText
            style={[
              styles.dateTitle,
              isSelected && styles.selectedDateTitle,
              {color: textColor},
            ]}
            translate={false}>
            {getDate(day)}
          </CustomText>
          {tasksCount > 0 && (
            <View style={[styles.circle, {backgroundColor: textColor}]} />
          )}
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
  circle: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    position: 'absolute',
    bottom: 3,
    marginHorizontal: 'auto',
  },
  titleWrapper: {
    borderRadius: 8,
    borderCurve: 'continuous',
    height: 32,
    width: 32,
    paddingTop: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateTitle: {
    color: THEME_COLORS.night.text,
    textAlign: 'center',
    ...TEXT_STYLES.standart,
  },
  selectedDateTitle: {
    ...TEXT_STYLES.standartSemibold,
  },
});
