import {
  GestureUpdateEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import {SharedValue, runOnJS, withTiming} from 'react-native-reanimated';
import {SELECT_THRESHOLD, DELETE_THRESHOLD} from '../config/consts';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import {Dimensions} from 'react-native';
import {ActionCreatorWithPayload} from '@reduxjs/toolkit';

const {width: WIDTH} = Dimensions.get('screen');

type TOnPanGestureUpdateProps = {
  keyboardHeight: SharedValue<number>;
  translationX: SharedValue<number>;
  isOverdraggedRight: SharedValue<boolean>;
  isOverdraggedLeft: SharedValue<boolean>;
};

type TOnPanGestureEndProps = Omit<
  TOnPanGestureUpdateProps,
  'keyboardHeight'
> & {
  onDelete: ActionCreatorWithPayload<number>;
  onSelect: ActionCreatorWithPayload<number>;
  opacity: SharedValue<number>;
  taskId: number;
};

export const onPanGestureUpdate = (
  event: GestureUpdateEvent<PanGestureHandlerEventPayload>,
  {
    keyboardHeight,
    translationX,
    isOverdraggedLeft,
    isOverdraggedRight,
  }: TOnPanGestureUpdateProps,
) => {
  'worklet';
  if (!keyboardHeight.value) {
    // can't swipe to select during this or other task edition
    translationX.value = event.translationX;
  }
  const x = translationX.value;
  if (x < SELECT_THRESHOLD && isOverdraggedRight.value) {
    isOverdraggedRight.value = false;
  }
  if (x >= SELECT_THRESHOLD && !isOverdraggedRight.value) {
    isOverdraggedRight.value = true;
    runOnJS(ReactNativeHapticFeedback.trigger)('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
  }
  if (x > DELETE_THRESHOLD && isOverdraggedLeft.value) {
    isOverdraggedLeft.value = false;
  }
  if (x <= DELETE_THRESHOLD && !isOverdraggedLeft.value) {
    isOverdraggedLeft.value = true;
    runOnJS(ReactNativeHapticFeedback.trigger)('impactLight', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
  }
};

export const onPanGestureEnd = ({
  isOverdraggedLeft,
  isOverdraggedRight,
  opacity,
  onDelete,
  onSelect,
  taskId,
  translationX,
}: TOnPanGestureEndProps) => {
  'worklet';
  if (isOverdraggedLeft.value) {
    opacity.value = withTiming(0);
    translationX.value = withTiming(-WIDTH, undefined, isFinished => {
      if (isFinished) runOnJS(onDelete)(taskId);
    });
  } else if (isOverdraggedRight.value) {
    translationX.value = withTiming(0);
    runOnJS(onSelect)(taskId);
  } else {
    translationX.value = withTiming(0);
  }
};
