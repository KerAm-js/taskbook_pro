import {plusSvg} from '@/shared/assets/svg/plus';
import {
  AppStackParamsList,
  SCREEN_PADDING,
  useSafeAreaPadding,
  useThemeColors,
} from '@/shared';
import {Pressable, StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useTaskActions} from '@/entities/task';
import {useFastInputMode} from '@/entities/settings';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

export const AddTask = () => {
  const {addEmptyTask} = useTaskActions();
  const fastInputMode = useFastInputMode();
  const {paddingBottom} = useSafeAreaPadding();
  const {colors} = useThemeColors();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

  const onPress = () => {
    ReactNativeHapticFeedback.trigger('impactMedium', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });
    if (fastInputMode) {
      addEmptyTask();
    } else {
      navigation.navigate('Task');
    }
  };

  const bottom = paddingBottom < 20 ? 20 : paddingBottom + 30;

  return (
    <View
      style={[
        styles.buttonContainer,
        {
          backgroundColor: colors.accent,
          bottom,
        },
      ]}>
      <Pressable onPress={onPress} style={styles.button}>
        <SvgXml xml={plusSvg(colors.background)} />
      </Pressable>
    </View>
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
