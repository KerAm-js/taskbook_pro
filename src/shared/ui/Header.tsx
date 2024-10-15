import Animated from 'react-native-reanimated';
import {useAnimatedThemeStyle} from '../hooks/useTheme';
import {useSafeAreaPadding} from '../hooks/useSafeAreaPadding';
import {CustomText} from './CustomText';
import {FC} from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import {arrowLeftSvg} from '@/shared/assets/svg/arrowLeft';
import {COLORS} from '../config/style/colors';
import {SvgXml} from 'react-native-svg';
import {HEADER_CONTENT_HEIGHT, SCREEN_PADDING} from '../config/style/views';
import {HEADER_SHADOW} from '../config/style/shadows';
import {TEXT_STYLES} from '../config/style/texts';
import {useNavigation} from '@react-navigation/native';

export const Header: FC<{
  title: string;
  modalHeader?: boolean;
  backButtonHidden?: boolean;
}> = ({title, modalHeader, backButtonHidden}) => {
  const styleAnim = useAnimatedThemeStyle('header');
  const {paddingTop} = useSafeAreaPadding();

  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  return (
    <Animated.View
      style={[
        styles.container,
        {
          paddingTop: Platform.OS === 'ios' && modalHeader ? 15 : paddingTop,
        },
        styleAnim,
      ]}>
      {backButtonHidden ? (
        <View style={styles.left} />
      ) : (
        <Pressable onPress={goBack} style={styles.left}>
          <SvgXml
            xml={arrowLeftSvg(COLORS.white)}
            width={18}
            height={18}
            style={{transform: [{rotate: modalHeader ? '-90deg' : '0deg'}]}}
          />
        </Pressable>
      )}
      <CustomText style={styles.title}>{title}</CustomText>
      <View style={styles.right} />
      {/* чисто для удобства */}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,
    flexDirection: 'row',
    ...HEADER_SHADOW,
  },
  left: {
    justifyContent: 'center',
    paddingHorizontal: SCREEN_PADDING,
    height: HEADER_CONTENT_HEIGHT,
    width: 80,
  },
  title: {
    ...TEXT_STYLES.standartSemibold,
    letterSpacing: 0.5,
    color: COLORS.white,
  },
  right: {
    height: HEADER_CONTENT_HEIGHT,
    width: 80,
  },
});
