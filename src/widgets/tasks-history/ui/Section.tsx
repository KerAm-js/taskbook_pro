import {getDateTitle} from '@/shared';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {Card} from './Card';
import {SectionTitle} from './SectionTitle';
import {useCompletedTasks} from '@/entities/task';

export const Section = React.memo(({date}: {date: number}) => {
  const ids = useCompletedTasks(date);
  const {t} = useTranslation();
  const title = getDateTitle(date, t);

  if (ids.length === 0) {
    return null;
  }

  return (
    <Animated.View entering={FadeIn} exiting={FadeOut}>
      <SectionTitle>{title}</SectionTitle>
      {ids.map(id => (
        <Card key={id} id={id} />
      ))}
    </Animated.View>
  );
});
