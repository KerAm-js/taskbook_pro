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
  }, [translationX.value, isOverDragged.value]);

  const greyIconStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isOverDragged.value ? 0 : 1, {
        duration: 150,
        easing,
      }),
    };
  }, [translationX.value, isOverDragged.value]);

  useAnimatedReaction(
    () => translationX.value,
    (curr, prev) => {
      const isDragged = side === 'right' ? curr > 0 : curr < 0;
      if (isDragged) {
        runOnJS(setVisible)(false);
      } else if (curr === 0) {
        runOnJS(setVisible)(false);
      } else {
        runOnJS(setVisible)(true);
      }
    },
  )

  if (!visible) {
    return null;
  }
  console.log()

  return (
    <View style={[styles.container, {[side]: 0}]}>
      <Animated.View
        style={[styles.iconContainer, {[side]: 20}, mainIconStyleAnim]}>
        <SvgXml
          width={26}
          height={26}
          xml={xmlGetter(colorName ? colors[colorName] : COLORS[color])}
        />
      </Animated.View>
      <Animated.View
        style={[styles.iconContainer, {[side]: 20}, greyIconStyleAnim]}>
        <SvgXml width={26} height={26} xml={xmlGetter(colors.grey)} />
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
    position: 'absolute',
    height: '100%',
    justifyContent: 'center',
  },
});
