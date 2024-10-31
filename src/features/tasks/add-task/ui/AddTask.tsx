import {plusSvg} from '@/shared/assets/svg/plus';
import {
  AppStackParamsList,
  SCREEN_PADDING,
  useSafeAreaPadding,
  useThemeColors,
} from '@/shared';
import {Pressable, StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useIsSelection, useTaskActions} from '@/entities/task';
import {useFastInputMode} from '@/entities/settings';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';

export const AddTask = () => {
  const {addEmptyTask} = useTaskActions();
  const fastInputMode = useFastInputMode();
  const {paddingBottom} = useSafeAreaPadding();
  const isSelection = useIsSelection();
  const {colors} = useThemeColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

  const containerStyleAnim = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isSelection ? 0 : 1)
    };
  }, [isSelection]);

  const onPress = () => {
    ReactNativeHapticFeedback.trigger('impactMedium', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    if (fastInputMode) {
      addEmptyTask();
    } else {
      navigation.navigate('task');
    }
  };

  const bottom = paddingBottom < 20 ? 20 : paddingBottom + 20;

  return (
    <Animated.View
      style={[
        styles.buttonContainer,
        {
          backgroundColor: colors.accent,
          bottom,
        },
        containerStyleAnim
      ]}>
      <Pressable disabled={isSelection} onPress={onPress} style={styles.button}>
        <SvgXml xml={plusSvg(colors.background)} />
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    right: SCREEN_PADDING,
    width: 54,
    height: 54,
    borderRadius: 30,
  },
  button: {
    width: 54,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
