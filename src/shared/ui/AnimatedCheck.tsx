import {checkSvg} from '@/shared/assets/svg/check';
import {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import {SvgXml} from 'react-native-svg';
import {TTheme} from '../config/style/colors';
import {useThemeColors} from '../hooks/useTheme';

type TPropTypes = {
  defaultTheme?: TTheme;
  size?: number;
  isChecked: boolean;
  borderRadius?: number;
  greyWhenInactive?: boolean;
};

export const AnimatedCheck: FC<TPropTypes> = ({
  defaultTheme,
  size = 20,
  isChecked,
  borderRadius,
  greyWhenInactive,
}) => {
  const {
    colors: {accent_opacity, accent, lineGrey},
  } = useThemeColors(defaultTheme);

  const containerStyleAnim = useAnimatedStyle(() => {
    return {
      width: isChecked ? withTiming(size, {duration: 600}) : 0,
    };
  }, [isChecked]);

  const backgroundStyle = {
    width: size,
    height: size,
    borderColor: greyWhenInactive ? lineGrey : accent_opacity,
    borderRadius: borderRadius || size / 2,
    borderWidth: isChecked ? 0 : 2,
    backgroundColor: isChecked ? accent_opacity : 'rgba(0, 0, 0, 0)',
  };

  return (
    <View style={[backgroundStyle, styles.background]}>
      <View style={styles.iconContianer}>
        <Animated.View
          style={[styles.iconAnimatedContainer, containerStyleAnim]}>
          {isChecked && (
            <SvgXml xml={checkSvg(accent)} width={14} height={14} />
          )}
        </Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    borderCurve: 'continuous',
  },
  iconContianer: {
    width: 14,
    height: 14,
  },
  iconAnimatedContainer: {
    overflow: 'hidden',
  },
});
