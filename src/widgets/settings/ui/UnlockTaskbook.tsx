import {premiumStarsSvg} from '@/shared/assets/svg/premiumStars';
import {
  AppStackParamsList,
  CustomText,
  TEXT_STYLES,
  THEME_ICON_GRADIENTS,
  ThemedPressable,
  useTheme,
} from '@/shared';
import {StyleSheet, View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const TaskbookForever = () => {
  const theme = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();

  const onPress = () => {
    navigation.navigate('Subscription');
  };

  return (
    <ThemedPressable
      onPress={onPress}
      colorName="accent_ultra_opacity"
      style={styles.container}>
      <View style={styles.content}>
        <SvgXml xml={premiumStarsSvg(THEME_ICON_GRADIENTS[theme])} />
        <CustomText themed colorName="accent" style={styles.title}>
          unlockTaskbook
        </CustomText>
      </View>
    </ThemedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingRight: 12,
    marginBottom: 10,
    borderRadius: 11,
    borderCurve: 'continuous',
    marginTop: 12,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...TEXT_STYLES.standartSemibold,
    marginLeft: 5,
    marginTop: 1,
  },
});
