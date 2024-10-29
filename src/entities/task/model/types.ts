type BaseTaskDto = {
  title: string;
  note?: string;
  remindTime?: string;
  date: number;
  isRegular: boolean;
};

export interface RegularTaskDto extends BaseTaskDto {
  isRegular: true;
  repeatingType: 'daily' | 'weekly' | 'monthly';
  repeatingDays: Array<number>;
}

export interface CommonTaskDto extends BaseTaskDto {
  isRegular: false;
  repeatingType?: never;
  repeatingDays?: never;
}

export type TaskDto = RegularTaskDto | CommonTaskDto;

type BaseTaskEntity = {
  id: number;
  isCompleted: boolean;
  isTitleEditing?: boolean;
  isSelected?: boolean;
  notificationIds?: Array<string>;
};

interface RegularTaskEntity extends BaseTaskEntity {
  regularTaskId: number;
  nextDate?: number;
}

interface CommonTaskEntity extends BaseTaskEntity {
  regularTaskId?: never;
  nextDate?: never;
}

export type CommonTask = CommonTaskDto & CommonTaskEntity;
export type RegularTask = RegularTaskDto & RegularTaskEntity;

export type Task = CommonTask | RegularTask;

export type TTaskActionType =
  | 'deleteOne'
  | 'deleteMany'
  | 'copyOne'
  | 'copyMany'
  | 'changeDate';

type TaskEntities = {[key: Task['id']]: Task};
type TaskIds = {[key: number]: Array<Task['id']>};

export interface ITasksState {
  idCounter: number;
  // generating taks ids

  ids: TaskIds;
  // taskIds arranded by calendar dates

  entities: TaskEntities;
  // tasks data

  historyIds: TaskIds;
  // tasks history

  lastVisit: number;
  // last date when user launched the app

  selectedDate: number;
  // current date on calendar in main screen
  // this date is stored as timestamp in the end of this day (at 23:59:59:999)
  // for example, if you add 1 to this timestamp, you'll get next date at 00:00

  // all other dates in tasks slice should be calculated and stored in this way

  selectedTasksCount: number;
  // count of selected tasks

  isTasksDateChanging: boolean;
  // flag to show calendar popup

  titleEditingTaskId: Task['id'] | null;
  // id of task which title is editing right now

  taskToUpdateId: Task['id'] | null;
  // id of task which is editing on task form

  cache: {
    actionType?: TTaskActionType;
    // type of action to undo

    ids: Array<Task['id']>;
    // copy task ids for selectedDate

    entities: TaskEntities;
    // copy of deleted tasks data
  };
  // cache is need to undo task deleting
  // maybe in the future user will be able to undo more actions

  reminderSettings: {
    count: number;
    // count of remind notifications

    interval: number;
    // time interval between task remind notifications in minutes
  };
  // this settings are needed in a lot of actions of tasksSlice, that is why they are here
}
