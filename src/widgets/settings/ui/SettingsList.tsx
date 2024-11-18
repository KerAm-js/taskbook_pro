import {bellSvg} from '@/shared/assets/svg/bell';
import {translateSvg} from '@/shared/assets/svg/translate';
import {shareSvg} from '@/shared/assets/svg/share';
import {keyboardSvg} from '@/shared/assets/svg/keyboard';
import {paletteSvg} from '@/shared/assets/svg/palette';
import {
  AppStackParamsList,
  CustomText,
  logEvent,
  PADDING_TOP,
  SCREEN_PADDING,
  Setting,
  TEXT_STYLES,
} from '@/shared';
import {
  Alert,
  Linking,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import {likeSvg} from '@/shared/assets/svg/like';
import {TaskbookForever} from './UnlockTaskbook';
import {archieveSvg} from '@/shared/assets/svg/archieve';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SettingsFooter} from './Footer';
import {UserInfo} from './UserInfo';
import {useFastInputMode, useSettingsActions} from '@/entities/settings';
import {useUser} from '@/entities/user';
import {useTranslation} from 'react-i18next';
import {telegramSvg} from '@/shared/assets/svg/telegram';
import {lightBulbFillSvg} from '@/shared/assets/svg/lightBulbFill';
import {dangerFillSvg} from '@/shared/assets/svg/dangerFill';

const itunesItemId = 1604538068;
const URL = `itms-apps://itunes.apple.com/app/${itunesItemId}`;

export const SettingsList = () => {
  const {t} = useTranslation();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
  const {toggleFastInputMode} = useSettingsActions();
  const {data: user} = useUser();
  const fastInputMode = useFastInputMode();

  const onToggleFastInputMode = () => {
    toggleFastInputMode();
    logEvent('toggle_quick_addition', {value: !fastInputMode});
  };

  const shareApp = async () => {
    try {
      const result = await Share.share({
        message: `${t('appSharingMessage')}\n\nhttps://apps.apple.com/ru/app/microsoft-to-do/id1274495053?mt=12`,
        title: 'Taskbook',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  const rateApp = () => {
    Linking.openURL(URL);
  };

  // TODO FOR RELEASE - correct app page link

  const goToCommunity = () => {
    const url = 'https://t.me/taskbook_community';
    Linking.openURL(url);
  };

  const goToBackupScreen = () => {
    if (!user) {
      Alert.alert(
        t('signinToYourAccount'),
        t('toCreateBackupsYouNeedToSigninOrRegister'),
      );
    } else {
      navigation.navigate('backup');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <UserInfo />
        <View style={styles.paddingContainer}>
          <TaskbookForever />
        </View>
        <View style={styles.section}>
          <CustomText themed colorName="textGrey" style={styles.categoryTitle}>
            general
          </CustomText>
          <Setting
            type="toggle"
            title="fastInputMode"
            value={fastInputMode}
            onPress={onToggleFastInputMode}
            xmlGetter={keyboardSvg}
          />
          <Setting
            type="navigate"
            title="backupCopy"
            onPress={goToBackupScreen}
            xmlGetter={archieveSvg}
          />
          <Setting
            type="navigate"
            title="notifications"
            onPress={() => navigation.navigate('reminders')}
            xmlGetter={bellSvg}
          />
          <Setting
            type="navigate"
            title="theme"
            onPress={() => navigation.navigate('theme')}
            xmlGetter={paletteSvg}
          />
          <Setting
            type="navigate"
            title="language"
            onPress={() => navigation.navigate('language')}
            xmlGetter={translateSvg}
          />
        </View>
        <View style={styles.section}>
          <CustomText themed colorName="textGrey" style={styles.categoryTitle}>
            app
          </CustomText>
          <Setting
            type="navigate"
            title="shareWithFriend"
            onPress={shareApp}
            xmlGetter={shareSvg}
          />
          <Setting
            type="navigate"
            title="leaveReview"
            onPress={rateApp}
            xmlGetter={likeSvg}
          />
          <Setting
            type="navigate"
            title="suggestIdea"
            onPress={() => navigation.navigate('idea')}
            xmlGetter={lightBulbFillSvg}
          />
          <Setting
            type="navigate"
            title="reportProblem"
            onPress={() => navigation.navigate('problem')}
            xmlGetter={dangerFillSvg}
          />
        </View>
        <View style={styles.section}>
          <CustomText themed colorName="textGrey" style={styles.categoryTitle}>
            community
          </CustomText>
          <Setting
            type="navigate"
            title="whatIsNew"
            onPress={goToCommunity}
            xmlGetter={telegramSvg}
          />
        </View>
      </ScrollView>
      <SettingsFooter />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingTop: PADDING_TOP,
    paddingBottom: 100,
  },
  premium: {
    flexDirection: 'row',
  },
  section: {
    paddingTop: 12,
    paddingHorizontal: SCREEN_PADDING,
  },
  paddingContainer: {
    paddingHorizontal: SCREEN_PADDING,
  },
  categoryTitle: {
    ...TEXT_STYLES.standart,
    marginBottom: 10,
  },
});
