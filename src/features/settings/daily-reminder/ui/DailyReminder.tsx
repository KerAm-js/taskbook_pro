import {ITasksState, useDailyReminder, useTaskActions} from '@/entities/task';
import {CheckList} from '@/shared';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';

type TDataType = {
  title: string;
  value: ITasksState['reminderSettings']['dailyReminder']['end'];
};

type TReminderType = keyof ITasksState['reminderSettings']['dailyReminder'];

const data: {[key in TReminderType]: Array<TDataType>} = {
  beginning: [
    {title: '02:00', value: {hour: 2, minute: 0}},
    {title: '03:00', value: {hour: 3, minute: 0}},
    {title: '04:00', value: {hour: 4, minute: 0}},
    {title: '05:00', value: {hour: 5, minute: 0}},
    {title: '06:00', value: {hour: 6, minute: 0}},
    {title: '07:00', value: {hour: 7, minute: 0}},
    {title: '08:00', value: {hour: 8, minute: 0}},
    {title: '09:00', value: {hour: 9, minute: 0}},
    {title: '10:00', value: {hour: 10, minute: 0}},
    {title: '11:00', value: {hour: 11, minute: 0}},
    {title: '12:00', value: {hour: 12, minute: 0}},
    {title: '13:00', value: {hour: 13, minute: 0}},
  ],
  end: [
    {title: '12:00', value: {hour: 12, minute: 0}},
    {title: '13:00', value: {hour: 13, minute: 0}},
    {title: '14:00', value: {hour: 14, minute: 0}},
    {title: '15:00', value: {hour: 15, minute: 0}},
    {title: '16:00', value: {hour: 16, minute: 0}},
    {title: '17:00', value: {hour: 17, minute: 0}},
    {title: '18:00', value: {hour: 18, minute: 0}},
    {title: '19:00', value: {hour: 19, minute: 0}},
    {title: '20:00', value: {hour: 20, minute: 0}},
    {title: '21:00', value: {hour: 21, minute: 0}},
    {title: '22:00', value: {hour: 22, minute: 0}},
    {title: '23:00', value: {hour: 23, minute: 0}},
  ],
};

export const SetDailyReminder: FC<{
  type: TReminderType;
}> = ({type}) => {
  const {setDailyReminder} = useTaskActions();
  const dailyReminder = useDailyReminder();
  const {t} = useTranslation();

  const onPress = (
    value: ITasksState['reminderSettings']['dailyReminder']['end'],
  ) => {
    setDailyReminder({type, ...value});
  };

  const checkMethod = (
    value: ITasksState['reminderSettings']['dailyReminder']['end'],
  ) => {
    return (
      value.hour === dailyReminder[type].hour &&
      value.minute === dailyReminder[type].minute &&
      value.turnedOff === dailyReminder[type].turnedOff
    );
  };

  const firstItem: TDataType = {
    title: t('off'),
    value: {hour: 0, minute: 0, turnedOff: true},
  };

  return (
    <CheckList
      checkMethod={checkMethod}
      data={[firstItem, ...data[type]]}
      onPress={onPress}
    />
  );
};
