import {Task, TaskRow, useTaskActions} from '@/entities/task';
import {ToggleTask} from '@/features/tasks/toggle-task';
import {AppStackParamsList, ThemedView, VIEW_SHADOW} from '@/shared';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {FadeOut} from 'react-native-reanimated';

type TPropTypes = Pick<Task, 'id'>;

export const Card: FC<TPropTypes> = React.memo(
  ({id}) => {
    const {setTaskToUpdateId} = useTaskActions();

    const navigation =
      useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

    const onPress = () => {
      setTaskToUpdateId(id);
      navigation.navigate('Task');
    };

    return (
      <Animated.View exiting={FadeOut.duration(150)}>
        <ThemedView
          style={[styles.card, VIEW_SHADOW]}
          nightStyle={styles.taskNight}
          colorName="background"
          nightColorName="backgroundSecond">
          <ToggleTask id={id} />
          <TaskRow id={id} onPress={onPress} blackWhenCompleted />
        </ThemedView>
      </Animated.View>
    );
  },
  () => true,
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    minHeight: 50,
    borderRadius: 10,
    borderCurve: 'continuous',
    marginBottom: 10,
  },
  taskNight: {
    shadowColor: 'rgba(0, 0, 0, 0)',
  },
  taskRowContainer: {
    flex: 1,
  },
});