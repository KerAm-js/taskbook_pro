import {TEXT_STYLES, ThemedText, ThemedView} from '@/shared';
import {FC, PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';

export const SectionTitle: FC<PropsWithChildren> = ({children}) => {
  return (
    <ThemedView colorName="background">
      <ThemedText colorName="textGrey" style={styles.title}>
        {children}
      </ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  title: {
    ...TEXT_STYLES.title,
    marginVertical: 10,
  },
});
