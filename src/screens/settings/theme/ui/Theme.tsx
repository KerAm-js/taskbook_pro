import {ThemeCard} from '@/features/settings/theme';
import {PADDING_TOP, SCREEN_PADDING, useAnimatedThemeStyle} from '@/shared';
import {ScrollView, StyleSheet} from 'react-native';
import Animated from 'react-native-reanimated';
import {useHeaderHeight} from '@react-navigation/elements';

export const Theme = () => {
  const colorStyleAnim = useAnimatedThemeStyle('background');
  const headerColorStyleAnim = useAnimatedThemeStyle('header');
  const height = useHeaderHeight();

  return (
    <Animated.View style={[styles.container, colorStyleAnim]}>
      <Animated.View style={[{height}, headerColorStyleAnim]} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <ThemeCard theme="branded" />
        <ThemeCard theme="purple" />
        <ThemeCard theme="darkBlue" />
        <ThemeCard theme="night" />
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: PADDING_TOP,
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 200,
  },
});
