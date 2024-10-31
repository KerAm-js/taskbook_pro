import {SetLanguage} from '@/features/settings/language';
import {PADDING_TOP, SCREEN_PADDING, ThemedView} from '@/shared';
import {ScrollView, StyleSheet} from 'react-native';

export const Language = () => {
  return (
    <ThemedView colorName="background" style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <SetLanguage />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingTop: PADDING_TOP,
    paddingHorizontal: SCREEN_PADDING,
  },
});
