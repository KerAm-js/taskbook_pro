import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Task, ITasksState, TaskDto} from './types';
import {deleteAllNotifications, endOfDay} from '@/shared';
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
  setTaskReminder,
  changeSelectedTasksDate,
  updateTaskNotifications,
  deleteTaskNotifications,
  clearTitleEditingTask,
  setStateDefault,
  rescheduleOverdueTasks,
  rescheduleIfOverdue,
} from './actionHelpers';
import { DATA } from './data.dev';

const TODAY = endOfDay();

const data = {
  entities: {
    '0': {
      date: 1729544399999,
      id: 0,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 0',
    },
    '1': {
      date: 1729544399999,
      id: 1,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 1',
    },
    '10': {
      date: 1729544399999,
      id: 10,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 10',
    },
    '11': {
      date: 1729717199999,
      id: 11,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 11',
    },
    '12': {
      date: 1729717199999,
      id: 12,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 12',
    },
    '13': {
      date: 1729717199999,
      id: 13,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 13',
    },
    '14': {
      date: 1729717199999,
      id: 14,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 14',
    },
    '15': {
      date: 1729717199999,
      id: 15,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 15',
    },
    '16': {
      date: 1729717199999,
      id: 16,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 16',
    },
    '17': {
      date: 1729717199999,
      id: 17,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 17',
    },
    '18': {
      date: 1729717199999,
      id: 18,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 18',
    },
    '19': {
      date: 1729717199999,
      id: 19,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 19',
    },
    '2': {
      date: 1729544399999,
      id: 2,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 2',
    },
    '20': {
      date: 1729717199999,
      id: 20,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 20',
    },
    '21': {
      date: 1729717199999,
      id: 21,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 21',
    },
    '22': {
      date: 1729717199999,
      id: 22,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 22',
    },
    '23': {
      date: 1729717199999,
      id: 23,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 23',
    },
    '24': {
      date: 1729717199999,
      id: 24,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 24',
    },
    '25': {
      date: 1729717199999,
      id: 25,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 25',
    },
    '26': {
      date: 1729717199999,
      id: 26,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 26',
    },
    '27': {
      date: 1729717199999,
      id: 27,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 27',
    },
    '28': {
      date: 1729717199999,
      id: 28,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 28',
    },
    '29': {
      date: 1729717199999,
      id: 29,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 29',
    },
    '3': {
      date: 1729544399999,
      id: 3,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 3',
    },
    '30': {
      date: 1729717199999,
      id: 30,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 30',
    },
    '31': {
      date: 1729889999999,
      id: 31,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 31',
    },
    '32': {
      date: 1729889999999,
      id: 32,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 32',
    },
    '33': {
      date: 1729889999999,
      id: 33,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 33',
    },
    '34': {
      date: 1729889999999,
      id: 34,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 34',
    },
    '35': {
      date: 1729889999999,
      id: 35,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 35',
    },
    '36': {
      date: 1729889999999,
      id: 36,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 36',
    },
    '37': {
      date: 1729889999999,
      id: 37,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 37',
    },
    '38': {
      date: 1729889999999,
      id: 38,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 38',
    },
    '39': {
      date: 1729889999999,
      id: 39,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 39',
    },
    '4': {
      date: 1729544399999,
      id: 4,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 4',
    },
    '40': {
      date: 1729889999999,
      id: 40,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 40',
    },
    '41': {
      date: 1729889999999,
      id: 41,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 41',
    },
    '42': {
      date: 1729889999999,
      id: 42,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 42',
    },
    '43': {
      date: 1729889999999,
      id: 43,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 43',
    },
    '44': {
      date: 1729889999999,
      id: 44,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 44',
    },
    '45': {
      date: 1729889999999,
      id: 45,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 45',
    },
    '46': {
      date: 1729889999999,
      id: 46,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 46',
    },
    '47': {
      date: 1729889999999,
      id: 47,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 47',
    },
    '48': {
      date: 1729889999999,
      id: 48,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 48',
    },
    '49': {
      date: 1729889999999,
      id: 49,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 49',
    },
    '5': {
      date: 1729544399999,
      id: 5,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 5',
    },
    '56': {
      date: 1729544399999,
      id: 56,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      notificationIds: [],
      title: 'Hhdfb',
    },
    '57': {
      date: 1729889999999,
      id: 57,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 49',
    },
    '58': {
      date: 1729889999999,
      id: 58,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 48',
    },
    '59': {
      date: 1729889999999,
      id: 59,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 47',
    },
    '6': {
      date: 1729544399999,
      id: 6,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 6',
    },
    '60': {
      date: 1729889999999,
      id: 60,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 46',
    },
    '61': {
      date: 1729889999999,
      id: 61,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 45',
    },
    '62': {
      date: 1729889999999,
      id: 62,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 44',
    },
    '63': {
      date: 1729889999999,
      id: 63,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 43',
    },
    '64': {
      date: 1729889999999,
      id: 64,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 42',
    },
    '65': {
      date: 1729889999999,
      id: 65,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 41',
    },
    '66': {
      date: 1729889999999,
      id: 66,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 40',
    },
    '67': {
      date: 1729889999999,
      id: 67,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 39',
    },
    '68': {
      date: 1729889999999,
      id: 68,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 38',
    },
    '69': {
      date: 1729889999999,
      id: 69,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 37',
    },
    '7': {
      date: 1729544399999,
      id: 7,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 7',
    },
    '70': {
      date: 1729889999999,
      id: 70,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 36',
    },
    '71': {
      date: 1729889999999,
      id: 71,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 35',
    },
    '72': {
      date: 1729889999999,
      id: 72,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 34',
    },
    '73': {
      date: 1729889999999,
      id: 73,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 33',
    },
    '74': {
      date: 1729889999999,
      id: 74,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 32',
    },
    '75': {
      date: 1729889999999,
      id: 75,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      isTitleEditing: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 31',
    },
    '8': {
      date: 1729544399999,
      id: 8,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 8',
    },
    '80': {
      date: 1729889999999,
      id: 80,
      isCompleted: false,
      isRegular: false,
      isTitleEditing: false,
      notificationIds: [],
      title: 'Hdcgbk',
    },
    '9': {
      date: 1729544399999,
      id: 9,
      isCompleted: false,
      isRegular: false,
      isSelected: false,
      note: 'Note',
      notificationIds: [],
      title: 'Task 9',
    },
  },
  idCounter: 96,
  ids: {
    '1729371599999': [],
    '1729457999999': [],
    '1729544399999': [56, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    '1729630799999': [],
    '1729717199999': [
      11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
      29, 30,
    ],
    '1729803599999': [],
    '1729889999999': [
      80, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60, 59,
      58, 57, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
      47, 48, 49,
    ],
    '1729976399999': [],
    '1730062799999': [],
  },
};

const initialState: ITasksState = {
  idCounter: 51,
  // ids: {[TODAY]: []},
  // entities: {},
  ids: DATA.ids,
  entities: DATA.entities,
  selectedDate: TODAY,
  lastVisit: 1723150799999,
  selectedTasksCount: 0,
  isTasksDateChanging: false,
  titleEditingTaskId: null,
  taskToUpdateId: null,
  reminderSettings: {
    count: 1,
    interval: 5,
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
    setLastVisit: (state, action: PayloadAction<ITasksState['lastVisit']>) => {
      state.lastVisit = action.payload;
    },

    onAppLoad: state => {
      setStateDefault(state);
      rescheduleOverdueTasks(state);
    },

    setDataFromBackup: (
      state,
      action: PayloadAction<
        Pick<ITasksState, 'idCounter' | 'ids' | 'entities'>
      >,
    ) => {
      deleteAllNotifications();
      const {ids, idCounter, entities} = action.payload;
      state.idCounter = idCounter;
      state.ids = ids;
      state.entities = entities;
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
      updateTaskNotifications(state, newTask.id);
    },

    addEmptyTask: state => {
      clearCache(state);
      const newTask: Task = createEmptyTask(state);
      addTaskToState(state, newTask);
      state.titleEditingTaskId = newTask.id;
    },

    deleteTask: (state, action: PayloadAction<Task['id']>) => {
      const id = action.payload;
      clearCache(state);
      if (!!state.entities[id].title) {
        cacheTask(state, id, 'deleteOne');
      }
      deleteTaskNotifications(state, id);
      deleteTaskById(state, id);
    },

    toggleTask: (state, action: PayloadAction<Task['id']>) => {
      const task = state.entities[action.payload];
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
          updateTaskNotifications(state, task.id);
          rescheduleIfOverdue(state, task.id);
          if (task.isRegular) {
            const onTaskFind = (id: Task['id']) =>
              deleteTaskNotifications(state, id);
            deleteNextRegularTask(state, task, onTaskFind);
          }
        }
      }
    },

    setReminder: (
      state,
      action: PayloadAction<{id: Task['id']; time: Task['remindTime']}>,
    ) => {
      const {id, time} = action.payload;
      if (state.entities[id]) {
        setTaskReminder(state, id, time);
      }
    },

    setTaskToUpdateId: (state, action: PayloadAction<Task['id']>) => {
      state.taskToUpdateId = action.payload;
    },

    updateTask: (state, action: PayloadAction<Partial<Omit<Task, 'id'>>>) => {
      const id = state.taskToUpdateId;
      if (id) {
        const {...newData} = action.payload;
        const task = state.entities[id];
        const newTask = {...task, ...newData} as Task;
        if (task.date !== newTask.date) {
          changeTaskDate(state, task, newTask.date);
        }
        state.entities[id] = newTask;
        updateTaskNotifications(state, newTask.id);
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
      const id = action.payload;
      const task = state.entities[id];
      task.isSelected = !task.isSelected;
      if (task.isSelected) {
        state.selectedTasksCount++;
      } else {
        state.selectedTasksCount--;
        if (state.selectedTasksCount === 0) {
          clearCache(state);
        }
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
    },

    changeSelectedTasksDate: (state, action: PayloadAction<Task['date']>) => {
      const onChangeDate = (id: Task['id']) => {
        updateTaskNotifications(state, id);
      };
      changeSelectedTasksDate(state, action.payload, onChangeDate);
      stopSelection(state);
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
  },
});
