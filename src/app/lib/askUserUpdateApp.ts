import {I18N} from '@/shared';
import {Alert, Linking, Platform} from 'react-native';

export const askUserToUpdateApp = () => {
  Alert.alert(
    I18N.t('updateIsAvailable'),
    I18N.t('updateAppToUseNewFeatures'),
    [
      {
        onPress: () => {
          if (Platform.OS === 'ios') {
            Linking.openURL(
              'itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}',
            );
          }
        },
      },
    ],
  );
};

// TODO FOR RELEASE - correct app page link
