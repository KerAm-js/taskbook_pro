import {Root} from './../../../app/ui/Root';
import {bindActionCreators} from '@reduxjs/toolkit';
import {useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {tasksSlice} from './tasksSlice';
import {RootState} from '@/app/store';
import {
  selectCompletedTaskEntities,
  selectCompletedTasksCount,
  selectTaskById,
  selectTaskRepeatingInfo,
} from './selectors';

export const useTaskActions = () => {
  const dispatch = useDispatch();
  return useMemo(
    () => bindActionCreators(tasksSlice.actions, dispatch),
    [dispatch],
  );
};

export const useTasksState = () => {
  const data = useSelector((state: RootState) => state.tasks);
  return data;
};

export const useTaskData = (id: number) => {
  const data = useSelector((state: RootState) => selectTaskById(state, id));
  return data;
};

export const useTaskTitle = (id: number) => {
  const title = useSelector(
    (state: RootState) => state.tasks.entities[id]?.title,
  );
  return title;
};

export const useIsTaskTitleEditing = (id: number) => {
  const isEditing = useSelector(
    (state: RootState) => state.tasks.entities[id]?.isTitleEditing,
  );
  return isEditing;
};

export const useIsTaskCompleted = (id: number) => {
  const isCompleted = useSelector(
    (state: RootState) => state.tasks.entities[id]?.isCompleted,
  );
  return isCompleted;
};

export const useTaskRepeatingInfo = (id: number) => {
  const isRegular = useSelector((state: RootState) =>
    selectTaskRepeatingInfo(state, id),
  );
  return isRegular;
};

export const useTaskEntities = () => {
  const data = useSelector((state: RootState) => state.tasks.entities);
  return data || {};
};

export const useTaskToUpdateId = () => {
  const id = useSelector((state: RootState) => state.tasks.taskToUpdateId);
  return id;
};

export const useTitleEditingTaskId = () => {
  const id = useSelector((state: RootState) => state.tasks.titleEditingTaskId);
  return id;
};

export const useSelectedDate = () => {
  const date = useSelector((state: RootState) => state.tasks.selectedDate);
  return date;
};

export const useTaskIds = () => {
  const tasks = useSelector((state: RootState) => state.tasks.ids);
  return tasks;
};

export const useHistoryTaskIds = () => {
  const history = useSelector((state: RootState) => state.tasks.historyIds);
  return history;
};

export const useIsSelection = () => {
  const value = useSelector(
    (state: RootState) => state.tasks.selectedTasksCount,
  );
  return value > 0;
};

export const useIsTasksDateChanging = () => {
  const value = useSelector(
    (state: RootState) => state.tasks.isTasksDateChanging,
  );
  return value;
};

export const useCache = () => {
  const value = useSelector((state: RootState) => state.tasks.cache);
  return value;
};

export const useCompletedTasksCount = () => {
  const value = useSelector(selectCompletedTasksCount);
  return value;
};

export const useDateTasksCount = (date: number) => {
  const count = useSelector(
    (state: RootState) => state.tasks.ids[date]?.length,
  );
  return count;
};

export const useCompletedTasks = (date?: number) => {
  const ids = useSelector((state: RootState) =>
    selectCompletedTaskEntities(state, date || state.tasks.selectedDate),
  );
  return ids;
};

export const useTaskReminderSettings = () => {
  const settings = useSelector(
    (state: RootState) => state.tasks.reminderSettings,
  );
  return settings;
};

export const useDailyReminder = () => {
  const reminders = useSelector(
    (state: RootState) => state.tasks.reminderSettings.dailyReminder,
  );
  return reminders;
};
