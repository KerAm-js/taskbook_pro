import {getDateTitle, TEXT_STYLES, ThemedText} from '@/shared';
import React, {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

export const SectionTitle: FC<{date: number}> = React.memo(
  ({date}) => {
    const {t} = useTranslation();
    return (
      <ThemedText colorName="textGrey" style={styles.title}>
        {getDateTitle(date, t)}
      </ThemedText>
    );
  },
);

const styles = StyleSheet.create({
  title: {
    ...TEXT_STYLES.title,
    marginVertical: 10,
  },
});
