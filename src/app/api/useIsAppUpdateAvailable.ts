import {useFirebase} from '@/shared';
import {useEffect, useState} from 'react';
import {Platform} from 'react-native';

type TAppVersions = {
  [key in typeof Platform.OS]: string;
};

export const useIsAppUpdateAvailable = (currentAppVersion: string) => {
  const {firestore} = useFirebase();
  const [isAppUpdateAvailable, setIsAppUpdateAvailable] = useState(false);
  const AppCollection = firestore.collection('App');

  const getActualAppVersion = async () => {
    try {
      const versionDocument = await AppCollection.doc('version').get();
      if (versionDocument) {
        const actualAppVersions = versionDocument.data() as TAppVersions;
        const version = actualAppVersions[Platform.OS];
        if (version && version.length > 0 && version !== currentAppVersion) {
          setIsAppUpdateAvailable(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getActualAppVersion();
  }, []);

  return isAppUpdateAvailable;
};
