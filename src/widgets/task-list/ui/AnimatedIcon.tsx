import {COLORS, TColorName, useThemeColors} from '@/shared';
import React, {FC, useState} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  runOnJS,
  SharedValue,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {SvgXml} from 'react-native-svg';

type TPropTypes = {
  isOverDragged: SharedValue<boolean>;
  xmlGetter: (color: string) => string;
  colorName?: TColorName;
  color?: keyof typeof COLORS;
  side?: 'left' | 'right';
};

export const AnimatedIcon: FC<TPropTypes> = ({
  isOverDragged,
  xmlGetter,
  colorName,
  color = 'red',
  side = 'right',
}) => {
  const {colors} = useThemeColors();
  const [visible, setVisible] = useState(false); //performance optimization

  useAnimatedReaction(
    () => isOverDragged.value,
    (curr, _) => {
      if (curr) {
        runOnJS(setVisible)(true);
      } else {
        runOnJS(setVisible)(false);
      }
    },
  );

  if (!visible) {
    return null;
  }

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[
        styles.container,
        {[side]: 0},
        side === 'right' && styles.rightContainer,
      ]}>
      <SvgXml
        width={26}
        height={26}
        xml={xmlGetter(colorName ? colors[colorName] : COLORS[color])}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: '100%',
    width: 100,
    zIndex: -1,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  rightContainer: {
    paddingRight: 20,
    alignItems: 'flex-end',
  },
});
