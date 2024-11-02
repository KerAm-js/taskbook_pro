import {emptyTaskListSvg} from '@/shared/assets/svg/emptyTaskList';
import {useHeaderHeight} from '@react-navigation/elements';
import {useThemeColors} from '@/shared';
import {Dimensions, StyleSheet, View} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {SvgXml} from 'react-native-svg';

const HEIGHT = Dimensions.get('screen').height;

export const EmptyListImage = () => {
  const {colors} = useThemeColors();
  const headerHeight = useHeaderHeight();

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      style={[styles.container, {padding: (HEIGHT - headerHeight) / 2 - 275}]}>
      <SvgXml xml={emptyTaskListSvg(colors.accent)} width={250} height={250} />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
