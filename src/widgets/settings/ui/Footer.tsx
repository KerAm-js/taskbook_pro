import {
  CustomText,
  TEXT_STYLES,
  ThemedText,
  ThemedView,
  useSafeAreaPadding,
} from '@/shared';
import {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import Animated, {FadeInDown, withTiming} from 'react-native-reanimated';
import app from '../../../../app.json';

const Exiting = () => {
  'worklet';
  const animations = {
    opacity: withTiming(0, {duration: 400}),
    transform: [{scale: withTiming(0.7, {duration: 400})}],
  };
  const initialValues = {
    opacity: 1,
    transform: [{scale: 1}],
  };
  return {
    initialValues,
    animations,
  };
};

export const SettingsFooter = () => {
  const [versionShown, setVersionShown] = useState(false);
  const {t} = useTranslation();
  const {paddingBottom} = useSafeAreaPadding();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVersionShown(true);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ThemedView
      style={[styles.copyRightContainer, {paddingBottom}]}
      borderColorName="lineGrey"
      colorName="background">
      <ThemedText colorName="accent" style={styles.appName}>
        Taskbook Pro
      </ThemedText>
      {versionShown && (
        <Animated.View entering={FadeInDown.delay(100).duration(400)}>
          <ThemedText colorName="accent" style={styles.subtitle}>
            {t('version', {version: app.version})}
          </ThemedText>
        </Animated.View>
      )}
      {!versionShown && (
        <Animated.View exiting={Exiting}>
          <ThemedText colorName="accent" style={styles.subtitle}>
            {t('developedByAmirKerimov')}
          </ThemedText>
        </Animated.View>
      )}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  copyRightContainer: {
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  appName: {
    marginBottom: 5,
    ...TEXT_STYLES.standartBold,
  },
  subtitle: {
    ...TEXT_STYLES.small,
  },
});
