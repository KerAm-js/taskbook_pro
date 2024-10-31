import {FC} from 'react';
import {CustomText} from './CustomText';
import {Pressable, StyleSheet} from 'react-native';
import {TEXT_STYLES} from '../config/style/texts';
import {COLORS} from '../config/style/colors';
import {ThemedView} from './Theme';
import {useAnimatedThemeStyle} from '../hooks/useTheme';
import Animated from 'react-native-reanimated';
import {HeaderBackButtonProps} from '@react-navigation/native-stack/lib/typescript/src/types';
import {useNavigation} from '@react-navigation/native';
import {SvgXml} from 'react-native-svg';
import {arrowLeftSvg} from '../assets/svg/arrowLeft';
import {HEADER_CONTENT_HEIGHT, SCREEN_PADDING} from '../config/style/views';

type TTitlePropTypes = {
  children: string;
};

const Title: FC<TTitlePropTypes> = ({children}) => {
  return <CustomText style={styles.title}>{children}</CustomText>;
};

const Background = () => (
  <ThemedView colorName="accent" style={styles.background} />
);

const AnimatedBackground = () => {
  const styleAnim = useAnimatedThemeStyle('header');
  return <Animated.View style={[styles.background, styleAnim]} />;
};

const BackButton: FC<HeaderBackButtonProps> = () => {
  const navigation = useNavigation();

  const goBack = () => navigation.goBack();

  return (
    <Pressable onPress={goBack} style={styles.left}>
      <SvgXml xml={arrowLeftSvg(COLORS.white)} width={18} height={18} />
    </Pressable>
  );
};

const CloseButton: FC<HeaderBackButtonProps> = () => {
  const navigation = useNavigation();
  const goBack = () => navigation.goBack();
  return (
    <Pressable onPress={goBack} style={styles.left}>
      <SvgXml
        xml={arrowLeftSvg(COLORS.white)}
        width={18}
        height={18}
        style={{transform: [{rotate: '-90deg'}]}}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  left: {
    justifyContent: 'center',
    height: HEADER_CONTENT_HEIGHT,
    width: 80,
  },
  title: {
    ...TEXT_STYLES.standartSemibold,
    letterSpacing: 0.5,
    color: COLORS.white,
  },
});

export const CustomHeader = {
  Title,
  Background,
  AnimatedBackground,
  BackButton,
  CloseButton,
};
