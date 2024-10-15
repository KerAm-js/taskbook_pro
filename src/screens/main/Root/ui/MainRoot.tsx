import {useTaskActions} from '@/entities/task';
import {ChangeTasksDatePopup} from '@/features/tasks/change-tasks-date';
import {ThemedView} from '@/shared';
import {MainFooter} from '@/widgets/main-footer';
import {MainHeader} from '@/widgets/main-header';
import {TaskAddingMenu} from '@/widgets/task-adding-menu';
import {TaskList} from '@/widgets/task-list';
import {TaskSelectionMenu} from '@/widgets/task-selection-menu';
import {useLayoutEffect} from 'react';
import {StyleSheet} from 'react-native';

export const MainRoot = () => {
  const {selectDate} = useTaskActions();

  useLayoutEffect(() => {
    selectDate();
  }, []);

  return (
    <ThemedView colorName="background" style={styles.container}>
      <MainHeader />
      <TaskList />
      <MainFooter />
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
