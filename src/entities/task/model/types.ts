import { TTimeValue } from "@/shared";

type BaseTaskDto = {
  title: string;
  note?: string;
  remindTime?: TTimeValue;
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

export type TDailyNotificationIds = {
  [key: string]: string;
};

export type TDailyNotificationData = {
  hour: number;
  minute: number;
  turnedOff?: boolean;
};

export interface ITasksState {
  idCounter: number;
  ids: TaskIds;
  entities: TaskEntities;
  historyIds: TaskIds;
  selectedDate: number;
  selectedTasksCount: number;
  isTasksDateChanging: boolean;
  titleEditingTaskId: Task['id'] | null;
  taskToUpdateId: Task['id'] | null;

  cache: {
    actionType?: TTaskActionType;
    ids: Array<Task['id']>;
    entities: TaskEntities;
  };

  reminderSettings: {
    count: number;
    interval: number;
    dailyReminder: {
      beginning: TDailyNotificationData;
      end: TDailyNotificationData;
    };
  };
}
