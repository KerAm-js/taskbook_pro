import Animated, {SharedValue, useAnimatedProps} from 'react-native-reanimated';
import {Path} from 'react-native-svg';

const AnimatedPath = Animated.createAnimatedComponent(Path);
export const ICON_PATH_LENGTH = 17;

export const AnimatedCheckMarkPath = ({
  color,
  animationProgress,
}: {
  color: string;
  animationProgress: SharedValue<number>;
}) => {
  const pathAnimatedProps = useAnimatedProps(
    () => ({
      strokeDashoffset: ICON_PATH_LENGTH - animationProgress.value,
    }),
    [animationProgress.value],
  );

  return (
    <AnimatedPath
      d="M2.5 7.53333L6.19221 11.2255C6.23292 11.2663 6.25328 11.2866 6.27643 11.2935C6.29677 11.2995 6.31855 11.2986 6.33831 11.2909C6.36079 11.282 6.37935 11.26 6.41646 11.216L12.5 4"
      stroke={color}
      strokeWidth={1.6}
      strokeLinecap={'round'}
      strokeLinejoin={'round'}
      strokeDasharray={ICON_PATH_LENGTH}
      animatedProps={pathAnimatedProps}
    />
  );
};
