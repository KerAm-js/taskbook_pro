import {
  CustomText,
  getDateTitle,
  TEXT_STYLES,
  ThemedText,
  ThemedView,
} from '@/shared';
import {FC} from 'react';
import {useTranslation} from 'react-i18next';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

type TPropTypes = {
  date?: number;
  loading: boolean;
};

export const BackupInfo: FC<TPropTypes> = ({date, loading}) => {
  const {t} = useTranslation();
  const title = date ? getDateTitle(date, t) : '-';
  return (
    <View>
      <CustomText themed colorName="textGrey" style={styles.title}>
        latestBackup
      </CustomText>
      <ThemedView style={styles.dateContainer} colorName="backgroundSecond">
        {loading ? (
          <ActivityIndicator />
        ) : (
          <ThemedText style={styles.date}>{title}</ThemedText>
        )}
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...TEXT_STYLES.standart,
    textTransform: 'uppercase',
    marginBottom: 7,
    textAlign: 'center',
  },
  dateContainer: {
    minHeight: 44,
    borderRadius: 10,
    borderCurve: 'continuous',
    paddingTop: 11,
    paddingBottom: 9,
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  date: {
    ...TEXT_STYLES.standartSemibold,
  },
});
