import {COLORS, TColorName, useThemeColors} from '@/shared';
import React, {FC, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  Easing,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {SvgXml} from 'react-native-svg';

type TPropTypes = {
  translationX: SharedValue<number>;
  isOverDragged: SharedValue<boolean>;
  xmlGetter: (color: string) => string;
  colorName?: TColorName;
  color?: keyof typeof COLORS;
  side?: 'left' | 'right';
};

const easing = Easing.out(Easing.quad);

export const AnimatedIcon: FC<TPropTypes> = ({
  translationX,
  isOverDragged,
  xmlGetter,
  colorName,
  color = 'red',
  side = 'right',
}) => {
  const {colors} = useThemeColors();
  const [visible, setVisible] = useState(false); //performance optimization

  const mainIconStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isOverDragged.value ? 1 : 0, {
        duration: 150,
        easing,
      }),
    };
  }, [isOverDragged.value]);

  useAnimatedReaction(
    () => translationX.value,
    (curr, _) => {
      const isDragged = side === 'right' ? curr > 0 : curr < 0;
      if (isDragged) {
        runOnJS(setVisible)(false);
      } else if (curr === 0) {
        runOnJS(setVisible)(false);
      } else {
        runOnJS(setVisible)(true);
      }
    },
  );

  if (!visible) {
    return null;
  }

  return (
    <View style={[styles.container, {[side]: 0}]}>
      <Animated.View
        style={[
          styles.iconContainer,
          mainIconStyleAnim,
          side === 'right' && styles.rightIconContainer,
        ]}>
        <SvgXml
          width={26}
          height={26}
          xml={xmlGetter(colorName ? colors[colorName] : COLORS[color])}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: 100,
    zIndex: -1,
  },
  iconContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 20,
  },
  rightIconContainer: {
    paddingRight: 20,
    alignItems: 'flex-end',
  },
});
