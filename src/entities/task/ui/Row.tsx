import React, {FC} from 'react';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import {Task} from '../model/types';
import {TaskInfo} from './Info';
import {bellOutlineSvg} from '@/shared/assets/svg/bellOutline';
import {repeatSvg} from '@/shared/assets/svg/repeat';
import {noteSvg} from '@/shared/assets/svg/note';
import {TaskInputTitle} from './InputTitle';
import {useTaskData} from '../model/hooks';
import {TaskTitle} from './Title';
import {getTimeString} from '@/shared';

type TPropTypes = {
  id: Task['id'];
  withInput?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
  blackWhenCompleted?: boolean;
};

export const TaskRow: FC<TPropTypes> = ({
  id,
  onPress,
  withInput,
  onLayout,
  blackWhenCompleted,
}) => {
  const task = useTaskData(id);
  const {remindTime, isRegular, isCompleted, note, isTitleEditing} = task;

  return (
    <View
      onLayout={onLayout}
      style={[
        styles.container,
        {opacity: isCompleted && !blackWhenCompleted ? 0.4 : 1},
      ]}>
      {withInput ? <TaskInputTitle task={task} /> : <TaskTitle task={task} />}
      <View style={styles.infoContainer}>
        {remindTime && (
          <TaskInfo
            xmlGetter={bellOutlineSvg}
            title={getTimeString(remindTime)}
          />
        )}
        {isRegular && (
          <TaskInfo
            translateTitle
            xmlGetter={repeatSvg}
            title={task.repeatingType}
          />
        )}
        {note && <TaskInfo translateTitle xmlGetter={noteSvg} title="note" />}
      </View>
      {!isTitleEditing && (
        <Pressable onPress={onPress} style={styles.pressable} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 8,
    paddingTop: 11,
    justifyContent: 'center',
  },
  pressable: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  containerNight: {
    shadowOpacity: 0,
  },
  infoContainer: {
    flexDirection: 'row',
    gap: 5,
    flexWrap: 'wrap',
    maxWidth: '100%',
  },
});
