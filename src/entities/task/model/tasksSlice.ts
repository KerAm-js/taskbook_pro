import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Task, ITasksState, TaskDto} from './types';
import {deleteAllNotifications, endOfDay, I18N} from '@/shared';
import {
  createCommonTask,
  clearCache,
  createRegularTask,
  addTaskToState,
  createEmptyTask,
  createNextRegularTask,
  createTaskCopy,
  clearTaskToUpdate,
  stopSelection,
  restoreDeletedTasks,
  deleteTaskById,
  deleteSelectedTasks,
  changeTaskDate,
  deleteNextRegularTask,
  cacheTask,
  changeSelectedTasksDate,
  updateTaskNotifications,
  deleteTaskNotifications,
  clearTitleEditingTask,
  setStateDefault,
  rescheduleOverdueTasks,
  rescheduleIfOverdue,
  updateDailyNotification,
  updateDailyNotificationsForDate,
  updateRegularTask,
  updateCommonTask,
  sortTasksByReminder,
} from './actionHelpers';

const TODAY = endOfDay();

const initialState: ITasksState = {
  idCounter: 1,
  ids: {[TODAY]: []},
  entities: {},
  historyIds: {},
  selectedDate: TODAY,
  selectedTasksCount: 0,
  isTasksDateChanging: false,
  titleEditingTaskId: null,
  taskToUpdateId: null,
  reminderSettings: {
    count: 1,
    interval: 5,
    dailyReminder: {
      beginning: {hour: 9, minute: 0},
      end: {hour: 18, minute: 0},
    },
  },
  cache: {
    ids: [],
    entities: {},
  },
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    onAppLoad: state => {
      const today = endOfDay();
      setStateDefault(state, today);
      rescheduleOverdueTasks(state, today);
      sortTasksByReminder(state, today);
    },

    setDataFromBackup: (
      state,
      action: PayloadAction<
        Pick<ITasksState, 'idCounter' | 'ids' | 'entities' | 'historyIds'>
      >,
    ) => {
      deleteAllNotifications();
      const {ids, idCounter, entities, historyIds} = action.payload;
      state.idCounter = idCounter;
      state.ids = ids;
      state.entities = entities;
      state.historyIds = historyIds;
      state.selectedDate = endOfDay();
      if (!state.ids[state.selectedDate]) {
        state.ids[state.selectedDate] = [];
      }
      rescheduleOverdueTasks(state, state.selectedDate);
      sortTasksByReminder(state, state.selectedDate);
      for (let item in state.ids) {
        const date = Number(item);
        updateDailyNotification(state, 'beginning', date);
        updateDailyNotification(state, 'end', date);
      }
      for (let date in state.ids) {
        state.ids[date].forEach(id => {
          updateTaskNotifications(state, Number(id));
        });
      }
    },

    addTask: (state, action: PayloadAction<TaskDto>) => {
      const {isRegular} = action.payload;
      let newTask: Task;
      if (isRegular) {
        newTask = createRegularTask(state, action.payload);
      } else {
        newTask = createCommonTask(state, action.payload);
      }
      addTaskToState(state, newTask);
      sortTasksByReminder(state, newTask.date);
      updateTaskNotifications(state, newTask.id);
      updateDailyNotificationsForDate(state);
    },

    addEmptyTask: state => {
      clearCache(state);
      const newTask: Task = createEmptyTask(state);
      addTaskToState(state, newTask);
      state.titleEditingTaskId = newTask.id;
      updateDailyNotificationsForDate(state);
    },

    deleteTask: (state, action: PayloadAction<Task['id']>) => {
      const id = action.payload;
      clearCache(state);
      if (!!state.entities[id].title) {
        cacheTask(state, id, 'deleteOne');
      }
      deleteTaskNotifications(state, id);
      deleteTaskById(state, id);
      updateDailyNotificationsForDate(state);
    },

    toggleTask: (state, action: PayloadAction<Task['id']>) => {
      const id = action.payload;
      const task = state.entities[id];
      if (task) {
        task.isCompleted = !task.isCompleted;
        if (task.isCompleted) {
          deleteTaskNotifications(state, task.id);
          if (task.isRegular && !task.nextDate) {
            const nextTask: Task = createNextRegularTask(state, task);
            task.nextDate = nextTask.date;
            addTaskToState(state, nextTask);
            updateTaskNotifications(state, nextTask.id);
          }
        } else {
          rescheduleIfOverdue(state, task.id);
          updateTaskNotifications(state, task.id);
          if (task.isRegular) {
            const onTaskFind = (id: Task['id']) =>
              deleteTaskNotifications(state, id);
            deleteNextRegularTask(state, task, onTaskFind);
          }
        }
      }
      updateDailyNotification(state, 'end', state.selectedDate);
    },

    setReminder: (
      state,
      action: PayloadAction<{id: Task['id']; time: Task['remindTime']}>,
    ) => {
      const {id, time} = action.payload;
      if (state.entities[id]) {
        state.entities[id].remindTime = time;
      }
    },

    setTaskToUpdateId: (state, action: PayloadAction<Task['id']>) => {
      state.taskToUpdateId = action.payload;
    },

    updateTask: (state, action: PayloadAction<Partial<Omit<Task, 'id'>>>) => {
      const id = state.taskToUpdateId;
      if (id) {
        const prevDateOfTask = state.entities[id].date;
        const prevRemindTime = state.entities[id].remindTime
          ? {...state.entities[id].remindTime}
          : undefined;
        if (action.payload.isRegular) {
          updateRegularTask(state, id, action.payload);
        } else {
          updateCommonTask(state, id, action.payload);
        }
        const task = state.entities[id];
        if (task.date !== prevDateOfTask) {
          changeTaskDate(state, task, prevDateOfTask);
        }
        if (
          task.date !== prevDateOfTask ||
          prevRemindTime?.hour !== task.remindTime?.hour ||
          prevRemindTime?.minute !== task.remindTime?.minute
        ) {
          sortTasksByReminder(state, task.date);
        }
        updateTaskNotifications(state, task.id);
        clearTaskToUpdate(state);
      }
    },

    startTaskTitleEditing: (state, action: PayloadAction<Task['id']>) => {
      clearCache(state);
      const id = action.payload;
      clearTitleEditingTask(state);
      state.titleEditingTaskId = id;
      state.entities[id].isTitleEditing = true;
    },

    endTaskTitleEditing: (
      state,
      action: PayloadAction<Pick<Task, 'id' | 'title'>>,
    ) => {
      const {id, title} = action.payload;
      const task = state.entities[id];
      task.title = title;
      updateTaskNotifications(state, id);
      if (state.titleEditingTaskId === id) {
        //it can be false during addNextTask action;
        clearTitleEditingTask(state);
        sortTasksByReminder(state, state.entities[id].date);
      } else {
        task.isTitleEditing = false;
      }
    },

    continueTaskEditingWithTaskForm: state => {
      state.taskToUpdateId = state.titleEditingTaskId;
      clearTitleEditingTask(state);
    },

    endTaskEditingWithTaskForm: state => {
      clearTaskToUpdate(state);
    },

    endSelection: state => {
      stopSelection(state);
    },

    selectDate: (state, action: PayloadAction<number | undefined>) => {
      clearCache(state);
      const date = action.payload || endOfDay();
      state.selectedTasksCount = 0;
      state.selectedDate = date;
      if (!state.ids[date]) {
        state.ids[date] = [];
      }
    },

    toggleTaskSelected: (state, action: PayloadAction<Task['id']>) => {
      if (state.selectedTasksCount === 0) {
        clearCache(state);
      }
      const id = action.payload;
      const task = state.entities[id];
      task.isSelected = !task.isSelected;
      if (task.isSelected) {
        state.selectedTasksCount++;
      } else {
        state.selectedTasksCount--;
      }
    },

    deleteSelectedTasks: state => {
      const onDelete = (id: Task['id']) => {
        deleteTaskNotifications(state, id);
        cacheTask(
          state,
          id,
          state.selectedTasksCount > 1 ? 'deleteMany' : 'deleteOne',
        );
      };
      deleteSelectedTasks(state, onDelete);
      stopSelection(state);
      updateDailyNotificationsForDate(state);
    },

    changeSelectedTasksDate: (state, action: PayloadAction<Task['date']>) => {
      const onChangeDate = (id: Task['id']) => {
        updateTaskNotifications(state, id);
      };
      changeSelectedTasksDate(state, action.payload, onChangeDate);
      stopSelection(state);
      updateDailyNotificationsForDate(state);
      updateDailyNotificationsForDate(state, action.payload);
      sortTasksByReminder(state, action.payload);
    },

    copySelectedTasks: state => {
      const copies: Task[] = [];
      state.ids[state.selectedDate].reduceRight((_, id) => {
        //use reduceRight to add tasks in the same order
        const task = state.entities[id];
        if (task.isSelected) {
          const newTask = createTaskCopy(state, task);
          copies.push(newTask);
        }
        return 0;
      }, 0);
      stopSelection(state);
      copies.forEach(task => addTaskToState(state, task));
      updateDailyNotificationsForDate(state);
      sortTasksByReminder(state, state.selectedDate);
    },

    undo: state => {
      const {actionType} = state.cache;
      if (actionType === 'deleteOne' || actionType === 'deleteMany') {
        const onRestore = (id: Task['id']) =>
          updateTaskNotifications(state, id);
        restoreDeletedTasks(state, onRestore);
      } else if (actionType === 'changeDate') {
        //...
      }
      clearCache(state);
      updateDailyNotificationsForDate(state);
    },

    clearCache: state => {
      clearCache(state);
    },

    setIsTasksDateChanging: (
      state,
      action: PayloadAction<ITasksState['isTasksDateChanging']>,
    ) => {
      state.isTasksDateChanging = action.payload;
    },

    setRemindersCount: (state, action: PayloadAction<number>) => {
      state.reminderSettings.count = action.payload;
    },

    setRemindersInterval: (state, action: PayloadAction<number>) => {
      state.reminderSettings.interval = action.payload;
    },

    setDailyReminder: (
      state,
      action: PayloadAction<
        Pick<
          ITasksState['reminderSettings']['dailyReminder']['beginning'],
          'hour' | 'minute'
        > & {type: keyof ITasksState['reminderSettings']['dailyReminder']}
      >,
    ) => {
      const {type} = action.payload;
      state.reminderSettings.dailyReminder[type] = action.payload;

      for (let item in state.ids) {
        const date = Number(item);
        updateDailyNotification(state, type, date);
      }
    },
  },
});
