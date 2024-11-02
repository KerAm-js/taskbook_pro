import React, {FC, MutableRefObject, useEffect, useState} from 'react';
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInRight,
  FadeOut,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AnimatedIcon} from './AnimatedIcon';
import {layersSvg} from '@/shared/assets/svg/layers';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {
  GestureResponderEvent,
  LayoutChangeEvent,
  StyleSheet,
} from 'react-native';
import {
  Task,
  TaskRow,
  useIsTaskTitleEditing,
  useTaskActions,
  useTaskTitle,
} from '@/entities/task';
import {trashSvg} from '@/shared/assets/svg/trash';
import {
  AppStackParamsList,
  useKeyboard,
  useThemeColors,
  VIEW_SHADOW,
} from '@/shared';
import {SelectionBackdrop} from './SelectionBackdrop';
import {onPanGestureEnd, onPanGestureUpdate} from '../lib/panGesture';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  moveOverKeyboard,
  toBackground,
  toForeground,
} from '../lib/taskTransitions';
import {ToggleTask} from '@/features/tasks/toggle-task';
import {useFastInputMode} from '@/entities/settings';

type TPropTypes = Pick<Task, 'id'> & {
  index: number;
  isInitialRender: MutableRefObject<boolean>;
};

const Component: FC<TPropTypes> = ({id, index, isInitialRender}) => {
  const isTitleEditing = useIsTaskTitleEditing(id);
  const title = useTaskTitle(id);
  const {colors, theme} = useThemeColors();
  const isOverdraggedRight = useSharedValue(false);
  const isOverdraggedLeft = useSharedValue(false);
  const translationX = useSharedValue(0);
  const opacity = useSharedValue(1);
  const keyboardHeight = useKeyboard();
  const {deleteTask, toggleTaskSelected} = useTaskActions();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
  const translationY = useSharedValue(0);
  const viewPageY = useSharedValue(0);
  const viewHeight = useSharedValue(styles.card.minHeight);
  const {startTaskTitleEditing, setTaskToUpdateId} = useTaskActions();
  const fastInputMode = useFastInputMode();
  const [visible, setVisible] = useState(false);

  useAnimatedReaction(
    () => keyboardHeight.value,
    curr => {
      if (curr && isTitleEditing) {
        moveOverKeyboard({
          keyboardHeight: curr,
          translationY,
          viewHeight,
          viewPageY,
        });
      } else if (curr && !isTitleEditing) {
        toBackground({
          opacity,
          translationY,
        });
      } else {
        toForeground({
          opacity,
          translationY,
        });
      }
    },
  );

  const itemStyleAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {translateX: translationX.value},
        {translateY: translationY.value},
      ],
      opacity: opacity.value,
      zIndex: isTitleEditing ? 100 : 1,
      shadowOpacity: withTiming(isTitleEditing ? 1 : VIEW_SHADOW.shadowOpacity),
    };
  }, [translationX.value, opacity.value, translationY.value, isTitleEditing]);

  useEffect(() => {}, [isTitleEditing]);

  useEffect(() => {
    let timer: any;
    if (isInitialRender.current) {
      timer = setTimeout(
        () => {
          setVisible(true);
        },
        index < 12 ? index * 50 : 600,
      );
    }
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, []);

  if (!visible && isInitialRender.current) {
    return;
  }

  const onLayout = (event: LayoutChangeEvent) => {
    const newHeight = event.nativeEvent.layout.height;
    viewHeight.value = newHeight;
    if (
      isTitleEditing &&
      translationY.value < 0 &&
      newHeight !== viewHeight.value
    ) {
      translationY.value = translationY.value - (newHeight - viewHeight.value);
    }
  };

  const onPress = (event: GestureResponderEvent) => {
    if (translationX.value !== 0) return;
    if (fastInputMode) {
      startTaskTitleEditing(id);
      event.target.measure((x, y, w, h, px, py) => {
        viewPageY.value = py;
      });
    } else {
      setTaskToUpdateId(id);
      navigation.navigate('task');
    }
  };

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
    ? isInitialRender.current && index <= 10
      ? FadeInDown.withInitialValues({
          transform: [{translateY: 7}],
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
        colorName="accent"
        side="left"
      />
      <GestureDetector gesture={pan}>
        <Animated.View
          style={[
            styles.card,
            {
              backgroundColor:
                theme === 'night' ? colors.backgroundSecond : colors.background,
            },
            theme === 'night' && styles.taskNight,
            itemStyleAnim,
          ]}>
          <ToggleTask id={id} />
          <TaskRow
            withInput={fastInputMode}
            id={id}
            onPress={onPress}
            onLayout={onLayout}
          />
          <SelectionBackdrop id={id} translationX={translationX} />
        </Animated.View>
      </GestureDetector>
      <AnimatedIcon xmlGetter={trashSvg} isOverDragged={isOverdraggedLeft} />
    </Animated.View>
  );
};

export const Card: FC<TPropTypes> = React.memo(Component, () => true);

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    minHeight: 50,
    borderRadius: 10,
    borderCurve: 'continuous',
    ...VIEW_SHADOW,
  },
  taskNight: {
    shadowColor: 'rgba(0, 0, 0, 0)',
  },
});
