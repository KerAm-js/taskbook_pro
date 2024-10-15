import notifee, {AuthorizationStatus, TriggerType} from '@notifee/react-native';
import { Platform } from 'react-native';

async function requestPermissionsAsync() {
  try {
    const settings = await notifee.getNotificationSettings();
    if (settings.authorizationStatus !== AuthorizationStatus.AUTHORIZED) {
      const result = await notifee.requestPermission({
        announcement: true,
        badge: true,
        sound: true,
        alert: true,
      });
      if (result.authorizationStatus === AuthorizationStatus.AUTHORIZED) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  } catch (error) {
    console.log('requestPermissionsAsync', error);
  }
}

export type TSetNotificationArg = {
  title: string;
  body: string;
  date: number | Date;
  id: string | number;
};

export const setNotification = async ({
  title,
  body,
  date,
  id,
}: TSetNotificationArg) => {
  try {
    const isNotifictaionAvailable = await requestPermissionsAsync();
    if (isNotifictaionAvailable) {
      const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
      });

      const notificationId = await notifee.createTriggerNotification(
        {
          title,
          body,
          id: typeof id === 'number' ? id.toString() : id,
          ios: Platform.OS === 'ios' ? {
            sound: 'notification.mp3',
          } : undefined,
          android: Platform.OS === 'android' ? {
            channelId,
            vibrationPattern: [0, 250, 250, 250],
            sound: 'notification.mp3',
            pressAction: {
              id: 'default',
            },
          } : undefined,
        },
        {
          type: TriggerType.TIMESTAMP,
          timestamp: typeof date === 'number' ? date : date.valueOf(),
        },
      );
      return notificationId;
    }
  } catch (error) {
    console.log('setNotification', error);
  }
};

export const deleteNotification = async (notificationId: string | number) => {
  try {
    const id =
      typeof notificationId === 'number'
        ? notificationId.toString()
        : notificationId;
    await notifee.cancelTriggerNotification(id);
  } catch (error) {
    console.log('deleteNotification', error);
  }
};

export const deleteAllNotifications = async () => {
  try {
    await notifee.cancelAllNotifications();
  } catch (error) {
    console.log('deleteAllNotifications', error);
  }
}
