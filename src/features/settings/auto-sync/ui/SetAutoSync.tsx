import {useBackupInfo, useSettingsActions} from '@/entities/settings';
import {InputComment, Setting} from '@/shared';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';

export const SetAutoSync = () => {
  const {toggleAutoSync} = useSettingsActions();
  const {isAutoSync} = useBackupInfo();
  const {t} = useTranslation();

  return (
    <View style={styles.container}>
      <Setting
        type="toggle"
        title="autoSync"
        value={isAutoSync}
        onPress={() => toggleAutoSync()}
      />
      <InputComment>{t('autoSyncComment')}</InputComment>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
  },
});
