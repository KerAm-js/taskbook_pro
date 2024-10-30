import React, {FC, MutableRefObject, useEffect, useMemo, useState} from 'react';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {AnimatedIcon} from './AnimatedIcon';
import {layersSvg} from '@/shared/assets/svg/layers';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {
  Task,
  useIsTaskTitleEditing,
  useTaskActions,
  useTaskTitle,
} from '@/entities/task';
import {trashSvg} from '@/shared/assets/svg/trash';
import {Card} from './Card';
import {useKeyboard} from '@/shared';
import {SelectionBackdrop} from './SelectionBackdrop';
import {onPanGestureEnd, onPanGestureUpdate} from '../lib/panGesture';

type TPropTypes = Pick<Task, 'id'> & {
  index: number;
  isInitialRender: MutableRefObject<boolean>;
};

const ListItemComponent: FC<TPropTypes> = ({id, index, isInitialRender}) => {
  const isTitleEditing = useIsTaskTitleEditing(id);
  const title = useTaskTitle(id);
  const isOverdraggedRight = useSharedValue(false);
  const isOverdraggedLeft = useSharedValue(false);
  const translationX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const keyboardHeight = useKeyboard();
  const {deleteTask, toggleTaskSelected} = useTaskActions();

  const [visible, setVisible] = useState(false);

  const itemStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationX.value}],
      opacity: opacity.value,
    };
  }, [translationX.value, opacity.value]);

  useEffect(() => {
    if (isInitialRender.current) {
      const timer = setTimeout(
        () => {
          setVisible(true);
        },
        index < 9 ? index * 50 : 450,
      );
      return () => clearTimeout(timer);
    }
  }, []);

  if (!visible && isInitialRender.current) {
    return;
  }

  const pan = Gesture.Pan()
    .enabled(!isTitleEditing)
    .minDistance(45)
    .onUpdate(event =>
      onPanGestureUpdate(event, {
        keyboardHeight,
        translationX,
        isOverdraggedLeft,
        isOverdraggedRight,
      }),
    )
    .onEnd(() =>
      onPanGestureEnd({
        translationX,
        isOverdraggedLeft,
        isOverdraggedRight,
        opacity,
        onDelete: deleteTask,
        onSelect: toggleTaskSelected,
        taskId: id,
      }),
    );

  const entering = title
    ? isInitialRender.current
      ? // ? FadeInDown.delay(index * 50).withInitialValues({
        //     transform: [{translateY: 10}],
        //   })
        FadeInDown.withInitialValues({
          transform: [{translateY: 10}],
        })
      : FadeIn
    : FadeInRight.withInitialValues({
        transform: [{translateX: 30}],
      });

  return (
    <Animated.View
      style={styles.container}
      exiting={FadeOut.duration(150)}
      entering={entering}>
      <AnimatedIcon
        xmlGetter={layersSvg}
        isOverDragged={isOverdraggedRight}
        translationX={translationX}
        colorName="accent"
        side="left"
      />
      <GestureDetector gesture={pan}>
        <Animated.View style={itemStyleAnim}>
          <Card id={id} translationX={translationX} />
          <SelectionBackdrop id={id} translationX={translationX} />
        </Animated.View>
      </GestureDetector>
      <AnimatedIcon
        xmlGetter={trashSvg}
        isOverDragged={isOverdraggedLeft}
        translationX={translationX}
      />
    </Animated.View>
  );
};

export const ListItem: FC<TPropTypes> = React.memo(
  ListItemComponent,
  () => true,
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
});
