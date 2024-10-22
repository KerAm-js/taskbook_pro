import {getDateTitle, TEXT_STYLES, ThemedText} from '@/shared';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

export const SectionTitle: FC<{date: number}> = React.memo(({date}) => {
  const {t} = useTranslation();
  return (
    <Animated.View
      entering={FadeIn.duration(150)}
      exiting={FadeOut.duration(150)}>
      <ThemedText colorName="textGrey" style={styles.title}>
        {getDateTitle(date, t)}
      </ThemedText>
    </Animated.View>
  );
});

const styles = StyleSheet.create({
  title: {
    ...TEXT_STYLES.title,
    marginVertical: 10,
  },
});
