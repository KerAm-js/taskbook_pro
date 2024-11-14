import {FC, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Easing, useSharedValue, withTiming} from 'react-native-reanimated';
import Svg from 'react-native-svg';
import {TTheme} from '../../../config/style/colors';
import {useThemeColors} from '../../../hooks/useTheme';
import {AnimatedCheckMarkPath, ICON_PATH_LENGTH} from './AnimatedCheckMarkPath';

type TPropTypes = {
  defaultTheme?: TTheme;
  size?: 18 | 20 | 22;
  isChecked: boolean;
  borderRadius?: number;
  greyWhenInactive?: boolean;
};

const animationConfig = {
  duration: 250,
  easing: Easing.inOut(Easing.ease),
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

  const animationProgress = useSharedValue(isChecked ? ICON_PATH_LENGTH : 0);

  const backgroundStyle = {
    width: size,
    height: size,
    borderColor: greyWhenInactive ? lineGrey : accent_opacity,
    borderRadius: borderRadius || size / 2,
    borderWidth: isChecked ? 0 : 2,
    backgroundColor: isChecked ? accent_opacity : 'rgba(0, 0, 0, 0)',
  };

  useEffect(() => {
    if (isChecked) {
      animationProgress.value = withTiming(ICON_PATH_LENGTH, animationConfig);
    } else {
      animationProgress.value = 0;
    }
  }, [isChecked]);

  return (
    <View style={[backgroundStyle, styles.background]}>
      {isChecked && (
        <Svg width={15} height={15} viewBox="0 0 15 15" fill="none">
          <AnimatedCheckMarkPath
            animationProgress={animationProgress}
            color={accent}
          />
        </Svg>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    justifyContent: 'center',
    alignItems: 'center',
    borderCurve: 'continuous',
  },
});
