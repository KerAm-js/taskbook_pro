import { AddTask } from '@/features/tasks/add-task';
import {ChangeTasksDatePopup} from '@/features/tasks/change-tasks-date';
import { Undo } from '@/features/tasks/undo';
import {ThemedView} from '@/shared';
import {MainHeader} from '@/widgets/main-header';
import {TaskAddingMenu} from '@/widgets/task-adding-menu';
import {TaskList} from '@/widgets/task-list';
import {TaskSelectionMenu} from '@/widgets/task-selection-menu';
import {StyleSheet} from 'react-native';

export const MainRoot = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <MainHeader />
      <TaskList />
      <Undo />
      <AddTask />
      <TaskAddingMenu />
      <TaskSelectionMenu />
      <ChangeTasksDatePopup />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
