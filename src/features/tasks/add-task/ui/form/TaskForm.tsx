import {calendarFillSvg} from '@/shared/assets/svg/calendarFill';
import {noteSvg} from '@/shared/assets/svg/note';
import {penSvg} from '@/shared/assets/svg/pen';
import {repeatFillSvg} from '@/shared/assets/svg/repeatFill';
import {
  CalendarPopup,
  CheckList,
  endOfDay,
  FormInput,
  getDate,
  getDateTitle,
  getTime,
  getTimeString,
  getWeekDay,
  PADDING_TOP,
  SCREEN_PADDING,
  Setting,
  TimePopup,
  TTimeValue,
  useInputValidator,
  WEEK_DAYS,
} from '@/shared';
import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import {StyleSheet, ScrollView, View} from 'react-native';
import {FormButton} from '@/shared';
import {useTranslation} from 'react-i18next';
import {
  RegularTaskDto,
  TASK_TITLE_LENGTH,
  TaskDto,
  useSelectedDate,
  useTaskActions,
  useTaskData,
  useTaskToUpdateId,
} from '@/entities/task';
import {RepeatingDaysPicker, TSelectedItemObj} from './RepeatingDaysPicker';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {bellSvg} from '@/shared/assets/svg/bell';

const repeatingTypeData: Array<{
  title: string;
  value: RegularTaskDto['repeatingType'];
}> = [
  {title: 'daily', value: 'daily'},
  {title: 'weekly', value: 'weekly'},
  {title: 'monthly', value: 'monthly'},
];

const weekDays = [0, 1, 2, 3, 4, 5, 6];
const monthDays = Array(31)
  .fill(0)
  .map((_, i) => i + 1);

export const TaskForm = () => {
  const {updateTask, deleteTask, addTask, endTaskEditingWithTaskForm} =
    useTaskActions();
  const {t} = useTranslation();
  const navigation = useNavigation();
  const selectedDate = useSelectedDate();
  const id = useTaskToUpdateId();
  const isSubmitted = useRef(false);
  const taskToEdit = useTaskData(id || -1);
  const [title, onChangeTitle, isTitleValid, titleError] = useInputValidator({
    required: true,
    initValue: taskToEdit.title,
  });
  const today = endOfDay();
  const [note, setNote] = useState(taskToEdit.note || '');
  const [date, setDate] = useState(taskToEdit.date || selectedDate);
  const [isRegular, setIsRegular] = useState<boolean>(
    id ? taskToEdit.isRegular : false,
  );
  const {minute, hour} = taskToEdit.remindTime
    ? taskToEdit.remindTime
    : getTime(Date.now());

  const initRemindTime = {
    hour,
    minute: id ? minute : Math.floor((minute + 5) / 5) * 5,
  };

  const [remindTime, setRemindTime] = useState<TTimeValue | undefined>(
    id && taskToEdit.remindTime ? initRemindTime : undefined,
  );
  const [repeatingType, setRepeatingType] = useState<
    RegularTaskDto['repeatingType']
  >(taskToEdit.repeatingType || 'daily');

  const defaultRepeatingDays: TSelectedItemObj =
    id && taskToEdit.isRegular
      ? taskToEdit.repeatingDays.reduce((obj: TSelectedItemObj, item) => {
          obj[item] = true;
          return obj;
        }, {})
      : {};

  const [repeatingDays, setRepeatingDays] = useState(defaultRepeatingDays);
  const [timePopupVisible, setTimePopupVisible] = useState(false);
  const [calendarPopupVisible, setCalendarPopupVisible] = useState(false);

  const showTimePopup = () => setTimePopupVisible(true);
  const hideTimePopup = () => setTimePopupVisible(false);
  const onRemindTimeDelete = () => setRemindTime(undefined);
  const onSubmitTime = (value: TTimeValue) => {
    setRemindTime(value);
  };

  const showCalendarPopup = () => setCalendarPopupVisible(true);
  const hideCalendarPopup = () => setCalendarPopupVisible(false);
  const onSubmitDate = (date: number) => {
    setDate(date);
  };

  const remindTimeString = remindTime ? getTimeString(remindTime) : t('off');

  const checkRepeatingTypeMethod = (item: RegularTaskDto['repeatingType']) => {
    return item === repeatingType;
  };

  const onRepeatingTypePress = (item: RegularTaskDto['repeatingType']) => {
    setRepeatingType(item);
    if (item === 'weekly') {
      const day = getWeekDay(selectedDate);
      setRepeatingDays({
        [day ? day - 1 : 6]: true,
      });
    } else {
      setRepeatingDays({
        [getDate(selectedDate)]: true,
      });
    }
  };

  const onSelectRepeatingDay = (item: number) => {
    setRepeatingDays({
      ...repeatingDays,
      [item]: !repeatingDays[item],
    });
  };

  let isRepeatingDaysValid;

  for (let day in repeatingDays) {
    if (!isRepeatingDaysValid && repeatingDays[day]) {
      isRepeatingDaysValid = true;
    }
  }

  const isFormValid =
    isTitleValid &&
    (!isRegular || repeatingType === 'daily' || isRepeatingDaysValid);

  const isHistoryTask =
    taskToEdit && taskToEdit.date < today && taskToEdit.isCompleted;

  const repeatingChangesDisabled =
    taskToEdit && taskToEdit.isRegular && taskToEdit.isCompleted;

  const onSubmit = () => {
    let taskData: TaskDto;
    if (isRegular) {
      let newTaskRepeatDays = [];
      for (let day in repeatingDays) {
        if (repeatingDays[day]) {
          newTaskRepeatDays.push(Number(day));
        }
      }
      taskData = {
        title,
        note,
        remindTime,
        date,
        isRegular: true,
        repeatingType,
        repeatingDays: newTaskRepeatDays,
      };
    } else {
      taskData = {
        title,
        note,
        remindTime,
        date,
        isRegular: false,
      };
    }

    if (id) {
      updateTask({...taskData});
    } else {
      addTask(taskData);
    }
    isSubmitted.current = true;
    navigation.goBack();
  };

  const onDelete = () => {
    if (id) {
      deleteTask(id);
    }
    isSubmitted.current = true;
    navigation.goBack();
  };

  useEffect(() => {
    return () => {
      endTaskEditingWithTaskForm();
    };
  }, []);

  useLayoutEffect(() => {
    if (taskToEdit.title && !title) {
      onChangeTitle(taskToEdit.title);
    }
  }, [taskToEdit.title]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: id && taskToEdit ? 'editing' : 'newTask',
    });
  }, []);

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contianer}>
        <FormInput
          placeholder="task"
          xmlGetter={penSvg}
          value={title}
          onChangeText={onChangeTitle}
          error={titleError}
          maxLength={TASK_TITLE_LENGTH}
          multiline
        />
        <FormInput
          placeholder="note"
          multiline
          xmlGetter={noteSvg}
          value={note}
          onChangeText={text => setNote(text)}
          isInputArea
        />
        <View style={styles.settings}>
          <Setting
            onPress={showTimePopup}
            type="value"
            title="reminder"
            value={remindTimeString}
            xmlGetter={bellSvg}
            disabled={isHistoryTask}
          />
          <Setting
            onPress={() => setIsRegular(prev => !prev)}
            type="toggle"
            title="taskRepeating"
            value={isRegular}
            xmlGetter={repeatFillSvg}
            disabled={repeatingChangesDisabled || isHistoryTask}
          />
          {isRegular ? (
            <CheckList
              data={repeatingTypeData}
              checkMethod={checkRepeatingTypeMethod}
              onPress={onRepeatingTypePress}
              disabled={repeatingChangesDisabled || isHistoryTask}
              translateTitle
            />
          ) : (
            <Setting
              onPress={showCalendarPopup}
              type="value"
              title="date"
              value={getDateTitle(date, t)}
              xmlGetter={calendarFillSvg}
              disabled={isHistoryTask}
            />
          )}
          {isRegular && repeatingType === 'weekly' && (
            <RepeatingDaysPicker
              disabled={repeatingChangesDisabled}
              title="weekDays"
              titleGetter={(item: number) => WEEK_DAYS[item].short}
              data={weekDays}
              onSelect={onSelectRepeatingDay}
              selectedItems={repeatingDays}
            />
          )}
          {isRegular && repeatingType === 'monthly' && (
            <RepeatingDaysPicker
              title="dates"
              data={monthDays}
              onSelect={onSelectRepeatingDay}
              selectedItems={repeatingDays}
            />
          )}
        </View>
        <View style={styles.buttons}>
          <FormButton
            type="accent"
            disabled={!isFormValid}
            title={id ? 'save' : 'add'}
            onPress={onSubmit}
          />
          {!!id && taskToEdit?.date >= today && (
            <FormButton
              type="destructive"
              title={id ? 'delete' : 'add'}
              onPress={onDelete}
            />
          )}
        </View>
      </ScrollView>
      {timePopupVisible && (
        <TimePopup
          hide={hideTimePopup}
          onSubmit={onSubmitTime}
          onDelete={remindTime ? onRemindTimeDelete : undefined}
          value={remindTime || initRemindTime}
        />
      )}
      {calendarPopupVisible && (
        <CalendarPopup
          hide={hideCalendarPopup}
          onSubmit={onSubmitDate}
          value={date}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contianer: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: PADDING_TOP,
    paddingBottom: 200,
  },
  settings: {
    paddingTop: 5,
    paddingBottom: 10,
  },
  buttons: {},
});
