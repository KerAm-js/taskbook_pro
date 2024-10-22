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

// const tasks: Task[] = Array(2000)
//   .fill(0)
//   .map((_, i) => {
//     let date = 1723150799999;
//     if (i >= 250) {
//       date = 1723237199999;
//     } else if (i >= 500) {
//       date = 1723323599999;
//     } else if (i >= 800) {
//       date = 1723409999999;
//     }
//     return {
//       id: i,
//       title: `Task ${i}`,
//       note: 'Note',
//       isCompleted: true,
//       isRegular: false,
//       isSelected: false,
//       isTitleEditing: false,
//       date,
//     };
//   });

// const ids = {
//   1723150799999: tasks
//     .filter(task => task.date === 1723150799999)
//     .map(task => task.id),
//   1723237199999: tasks
//     .filter(task => task.date === 1723237199999)
//     .map(task => task.id),
//   1723323599999: tasks
//     .filter(task => task.date === 1723323599999)
//     .map(task => task.id),
//   1723409999999: tasks
//     .filter(task => task.date === 1723409999999)
//     .map(task => task.id),
// };

// const entities = tasks.reduce((result: ITasksState['entities'], task) => {
//   result[task.id] = task;
//   return result;
// }, {});

const initialState: ITasksState = {
  idCounter: 1,
  ids: {[TODAY]: []},
  entities: {},
  // ids: DATA.ids,
  // entities: DATA.entities,
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
      // need to update notifications for tasks from backup
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
