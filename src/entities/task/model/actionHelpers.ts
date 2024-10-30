import {
  deleteNotification,
  endOfDay,
  getDate,
  getTimeValueFromString,
  I18N,
  setNotification,
} from '@/shared';
import {getNextRegularTaskDate} from '../lib/getNextRegularTaskDate';
import {
  CommonTask,
  CommonTaskDto,
  ITasksState,
  RegularTask,
  RegularTaskDto,
  Task,
} from './types';
import {
  deleteDailyNotification,
  setDailyNotification,
} from '../lib/setDailyNotifications';

// this action helpers can update only state object argument

// if there is other object arguments, helper function can not update them

const generateNotificationIds = (taskId: Task['id'], count: number) => {
  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(taskId + '_' + i);
  }
  return result;
};

export const updateDailyNotification = (
  state: ITasksState,
  type: keyof ITasksState['reminderSettings']['dailyReminder'],
  date: number,
) => {
  const currSettings = state.reminderSettings.dailyReminder[type];
  const length = state.ids[date]?.length;
  if (currSettings.turnedOff || !length) {
    deleteDailyNotification(date, type);
  } else {
    const completedTasksCount = state.ids[date].reduce((count, id) => {
      return state.entities[id].isCompleted ? count + 1 : count;
    }, 0);
    const title =
      type === 'beginning' ? I18N.t('plansForToday') : I18N.t('reviewOfTheDay');
    const body =
      type === 'beginning'
        ? I18N.t('tasksToDo', {count: length})
        : I18N.t('tasksCompleted', {
            count: length,
            completed: completedTasksCount,
          });
    setDailyNotification({
      type: type,
      title,
      body,
      date,
      ...currSettings,
    });
  }
};

export const updateDailyNotificationsForDate = (
  state: ITasksState,
  date?: number,
) => {
  updateDailyNotification(state, 'beginning', date || state.selectedDate);
  updateDailyNotification(state, 'end', date || state.selectedDate);
};

export const setStateDefault = (state: ITasksState) => {
  const today = endOfDay();
  state.selectedDate = today;
  if (!state.ids[today]) state.ids[today] = [];
  state.selectedTasksCount = 0;
  state.isTasksDateChanging = false;
  state.titleEditingTaskId = null;
  state.taskToUpdateId = null;
  state.cache = {
    ids: [],
    entities: {},
  };
};

export const rescheduleIfOverdue = (state: ITasksState, id: Task['id']) => {
  const today = endOfDay();
  const task = state.entities[id];
  if (task.date < today) {
    state.historyIds[task.date] = state.historyIds[task.date].filter(
      item => item !== id,
    );
    state.ids[today].unshift(id);
    task.date = today;
  }
};

export const rescheduleOverdueTasks = (state: ITasksState) => {
  const today = endOfDay();
  for (let item in state.ids) {
    const date = Number(item);
    if (date < today) {
      if (!state.ids[date] || state.ids[date].length === 0) {
        delete state.ids[date];
      } else {
        const overdueTasks: Task['id'][] = [];
        state.historyIds[date] = state.ids[date].filter(id => {
          const task = state.entities[id];
          if (!task.isCompleted) {
            overdueTasks.push(id);
            task.date = today;
          }
          return task.isCompleted;
        });
        delete state.ids[date];
        state.ids[today] = [...overdueTasks, ...state.ids[today]];
      }
    }
  }
};

export const deleteTaskNotifications = (state: ITasksState, id: Task['id']) => {
  const notificationIds = state.entities[id].notificationIds;
  if (notificationIds) {
    notificationIds.forEach(notificationId => {
      deleteNotification(notificationId);
    });
  }
};

export const updateTaskNotifications = (state: ITasksState, id: Task['id']) => {
  const {count, interval} = state.reminderSettings;
  const task = state.entities[id];
  const {title, remindTime, isCompleted, date} = task;
  if (!task.notificationIds || task.notificationIds.length < count) {
    task.notificationIds = generateNotificationIds(id, count);
  }
  if (remindTime && !isCompleted) {
    const time = getTimeValueFromString(remindTime);
    const now = Date.now();
    task.notificationIds.forEach((notificationId, i) => {
      const notificationDate = new Date(date).setHours(
        time.hour,
        time.minute + i * interval,
        0,
        0,
      );
      if (notificationDate > now) {
        setNotification({
          id: notificationId,
          title: 'Taskbook Pro',
          body: title,
          date: notificationDate,
        });
      }
    });

    return;
  }
  deleteTaskNotifications(state, id);
};

export const generateId = (state: ITasksState) => {
  const result = state.idCounter;
  state.idCounter++;
  return result;
};

export const clearCache = (state: ITasksState) => {
  if (state.cache.ids.length) {
    state.cache = {
      ids: [],
      entities: {},
      actionType: undefined,
    };
  }
};

export const clearTitleEditingTask = (state: ITasksState) => {
  const id = state.titleEditingTaskId;
  if (id && state.entities[id]) {
    state.entities[id].isTitleEditing = false;
  }
  state.titleEditingTaskId = null;
};

export const clearTaskToUpdate = (state: ITasksState) => {
  state.taskToUpdateId = null;
};

export const stopSelection = (state: ITasksState) => {
  state.selectedTasksCount = 0;
  state.ids[state.selectedDate].forEach(id => {
    state.entities[id].isSelected = false;
  });
};

export const restoreDeletedTasks = (
  state: ITasksState,
  callBack: (id: Task['id']) => void,
) => {
  state.ids[state.selectedDate] = state.cache.ids;
  state.cache.ids.forEach(id => {
    if (!state.entities[id]) {
      state.entities[id] = state.cache.entities[id];
      state.entities[id].isSelected = false;
      callBack(id);
    }
  });
};

export const addTaskToState = (state: ITasksState, newTask: Task) => {
  const {id, date} = newTask;
  state.entities[id] = newTask;
  if (!state.ids[date]) state.ids[date] = [];
  state.ids[date].unshift(id);
};

export const createCommonTask = (state: ITasksState, dto: CommonTaskDto) => {
  const id = generateId(state);
  const task: CommonTask = {
    ...dto,
    id,
    isTitleEditing: false,
    isSelected: false,
    isCompleted: false,
    isRegular: false,
  };
  return task;
};

export const createRegularTask = (state: ITasksState, dto: RegularTaskDto) => {
  const {repeatingDays, repeatingType} = dto;
  const id = generateId(state);
  const date = getNextRegularTaskDate({
    repeatingDays,
    repeatingType,
    includeToday: true,
  });
  const task: RegularTask = {
    ...dto,
    id,
    isCompleted: false,
    isTitleEditing: false,
    isSelected: false,
    regularTaskId: generateId(state),
    date,
  };
  return task;
};

export const createEmptyTask = (state: ITasksState) => {
  const id = generateId(state);
  const task: Task = {
    id,
    title: '',
    isCompleted: false,
    date: state.selectedDate,
    isTitleEditing: true,
    isRegular: false,
  };
  return task;
};

export const createNextRegularTask = (
  state: ITasksState,
  prevTask: RegularTask,
) => {
  const {repeatingDays, repeatingType} = prevTask;
  const date = getNextRegularTaskDate({
    repeatingDays,
    repeatingType,
    startDate: prevTask.date,
  });
  const nextTask: Task = {
    ...prevTask,
    id: generateId(state),
    isCompleted: false,
    isTitleEditing: false,
    isSelected: false,
    date,
  };
  return nextTask;
};

export const createTaskCopy = (state: ITasksState, task: Task) => {
  const newId = generateId(state);
  const taskCopy: Task = {
    ...task,
    id: newId,
    isCompleted: false,
    isTitleEditing: false,
    isSelected: false,
  };
  return taskCopy;
};

export const deleteTaskById = (state: ITasksState, id: Task['id']) => {
  state.ids[state.selectedDate] = state.ids[state.selectedDate].filter(item => {
    if (item === id) {
      delete state.entities[id];
    }
    return item !== id;
  });
  if (state.taskToUpdateId === id) state.taskToUpdateId = null;
};

export const deleteSelectedTasks = (
  state: ITasksState,
  callBack: (id: Task['id']) => void,
) => {
  state.ids[state.selectedDate] = state.ids[state.selectedDate].filter(id => {
    const {isSelected} = state.entities[id];
    if (isSelected) {
      callBack(id);
      delete state.entities[id];
    }
    return !isSelected;
  });
};

export const deleteNextRegularTask = (
  state: ITasksState,
  task: RegularTask,
  deleteNotifications: (id: Task['id']) => void,
) => {
  if (task.nextDate) {
    state.ids[task.nextDate] = state.ids[task.nextDate].filter(id => {
      const {regularTaskId, isCompleted} = state.entities[id];
      if (regularTaskId === task.regularTaskId && !isCompleted) {
        deleteNotifications(id);
        delete state.entities[id];
        delete task.nextDate;
        return false;
      }
      return true;
    });
  }
};

export const cacheTask = (
  state: ITasksState,
  id: Task['id'],
  actionType: ITasksState['cache']['actionType'],
) => {
  state.cache.entities[id] = {
    ...state.entities[id],
  };
  if (state.cache.ids.length === 0) {
    state.cache.ids = [...state.ids[state.selectedDate]];
  }
  if (!state.cache.actionType) {
    state.cache.actionType = actionType;
  }
};

export const changeTaskDate = (
  state: ITasksState,
  task: Task,
  newDate: number,
) => {
  state.ids[task.date] = state.ids[task.date].filter(item => item !== task.id);
  if (!state.ids[newDate]) state.ids[newDate] = [];
  state.ids[newDate].unshift(task.id);
};

export const changeSelectedTasksDate = (
  state: ITasksState,
  newDate: number,
  callBack: (id: Task['id']) => void,
) => {
  const {selectedDate, ids, entities} = state;
  const selectedIds: number[] = [];
  ids[selectedDate] = ids[selectedDate].filter(id => {
    const isSelected = entities[id].isSelected;
    if (isSelected) {
      selectedIds.push(id);
      entities[id].date = newDate;
      entities[id].isSelected = false;
      callBack(id);
    }
    return !isSelected;
  });
  if (!ids[newDate]) ids[newDate] = [];
  ids[newDate] = [...selectedIds, ...ids[newDate]];
};

export const setTaskReminder = (
  state: ITasksState,
  id: Task['id'],
  time: Task['remindTime'],
) => {
  state.entities[id].remindTime = time;
};
