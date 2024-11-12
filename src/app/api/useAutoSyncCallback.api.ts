import {
  ISettingsState,
  useSettingsActions,
} from '@/entities/settings';
import {useFirebase} from '@/shared';
import {store} from '../store';
import {Backup} from '@/features/settings/backup';
import {useUser} from '@/entities/user';

export const useAutoSyncCallback = ({
  isAutoSync,
  lastBackup,
}: ISettingsState['backup']) => {
  const {firestore} = useFirebase();
  const {data: user} = useUser();
  const {setLastBackup} = useSettingsActions();
  const backupsCollection = firestore.collection('Backups');

  const autoSyncHandler = () => {
    if (!user || !isAutoSync) return;
    const timestamp = Date.now();
    const shouldSync = lastBackup ? timestamp - lastBackup >= 60000 : true;
    if (shouldSync) {
      const backup = prepareBackup();
      updateBackup(backup, timestamp);
    }
  };

  const prepareBackup = (): Backup => {
    const {idCounter, ids, entities, historyIds} = store.getState().tasks;
    return {
      idCounter,
      currentEmail: user?.email || '',
      ids,
      entities,
      historyIds,
      createdAt: Date.now(),
    };
  };

  const updateBackup = async (backup: Backup, timestamp: number) => {
    try {
      await backupsCollection.doc(user?.uid).set(backup);
      setLastBackup(timestamp);
    } catch (error) {
      console.log(error);
    }
  };

  return autoSyncHandler;
};
