import {FC} from 'react';
import {StyleSheet} from 'react-native';
import {Task} from '../model/types';
import {TEXT_STYLES, ThemedText} from '@/shared';

export const TaskTitle: FC<{task: Task}> = ({task}) => {
  return <ThemedText style={styles.title}>{task.title}</ThemedText>;
};

const styles = StyleSheet.create({
  title: {
    ...TEXT_STYLES.standart,
    paddingRight: 15,
    paddingTop: 0,
    marginBottom: 2,
  },
});
