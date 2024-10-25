import {useSelectedDate} from '@/entities/task';
import {SelectDay} from '@/features/tasks/select-date';
import {isDatesEqual, SCREEN_PADDING, TCalendarWeek} from '@/shared';
import React, {FC} from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';

const WIDTH = Dimensions.get('screen').width;
const BUTTON_WIDTH = WIDTH * 0.132;

export const WeekDays: FC<{
  data: TCalendarWeek;
}> = React.memo(({data}) => {
  const selectedDate = useSelectedDate();
  return (
    <View style={styles.container}>
      {data.days.map(day => {
        const isSelected = isDatesEqual(day, selectedDate);
        return (
          <SelectDay
            key={day.toString()}
            isSelected={isSelected}
            day={day}
          />
        );
      })}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: SCREEN_PADDING - (BUTTON_WIDTH - 30) / 2,
    justifyContent: 'space-between',
    width: WIDTH,
  },

  first: {
    alignSelf: 'flex-start',
  },
  last: {
    alignSelf: 'flex-end',
  },
});
