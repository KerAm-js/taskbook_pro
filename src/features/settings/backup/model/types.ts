import {ITasksState} from '@/entities/task';

export type Backup = {
  createdAt: number;
  currentEmail: string;
} & Pick<ITasksState, 'idCounter' | 'ids' | 'entities' | 'historyIds'>;
