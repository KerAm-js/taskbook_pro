import {arrowRightSvg} from '@/shared/assets/svg/arrowRight';
import {premiumStarsSvg} from '@/shared/assets/svg/premiumStars';
import {
  CustomText,
  SettingsStackParamsList,
  TEXT_STYLES,
  THEME_ICON_GRADIENTS,
  ThemedIcon,
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
    useNavigation<NativeStackNavigationProp<SettingsStackParamsList>>();

  const onPress = () => {
    navigation.navigate('Subscription');
  };

  return (
    <ThemedPressable
      onPress={onPress}
      colorName="backgroundSecond"
      style={styles.container}>
      <View style={styles.content}>
        <SvgXml xml={premiumStarsSvg(THEME_ICON_GRADIENTS[theme])} />
        <CustomText themed style={styles.title}>
          taskbookForever
        </CustomText>
      </View>
      <ThemedIcon
        colorName="grey"
        xmlGetter={arrowRightSvg}
        width={16}
        height={16}
      />
    </ThemedPressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    paddingRight: 12,
    marginBottom: 10,
    borderRadius: 11,
    borderCurve: 'continuous',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    ...TEXT_STYLES.standartSemibold,
    marginLeft: 8,
  },
});
