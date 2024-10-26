import {bellSvg} from '@/shared/assets/svg/bell';
import {dialogSvg} from '@/shared/assets/svg/dialog';
import {translateSvg} from '@/shared/assets/svg/translate';
import {shareSvg} from '@/shared/assets/svg/share';
import {keyboardSvg} from '@/shared/assets/svg/keyboard';
import {paletteSvg} from '@/shared/assets/svg/palette';
import {
  CustomText,
  PADDING_TOP,
  SCREEN_PADDING,
  Setting,
  SettingsStackParamsList,
  TEXT_STYLES,
} from '@/shared';
import {
  Alert,
  Linking,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  View,
} from 'react-native';
import {useFastInputMode, useSettingsActions} from '@/entities/settings';
import {likeSvg} from '@/shared/assets/svg/like';
import {TaskbookForever} from './TaskbookForever';
import {archieveSvg} from '@/shared/assets/svg/archieve';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SettingsFooter} from './Footer';
import {UserInfo} from './UserInfo';

export const SettingsList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamsList>>();
  const {toggleFastInputMode} = useSettingsActions();
  const fastInputMode = useFastInputMode();

  const itunesItemId = 1604538068;
  const url = `itms-apps://itunes.apple.com/app/${itunesItemId}`;

  const shareApp = async () => {
    try {
      const result = await Share.share(
        Platform.OS === 'ios'
          ? {
              url,
            }
          : {
              message: url,
            },
      );
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
    const itunesItemId = 1604538068;
    Linking.openURL(
      `itms-apps://itunes.apple.com/app/viewContentsUserReviews/id${itunesItemId}?action=write-review`,
    );
  };

  const contactDeveloper = () => {
    const url = 'https://t.me/Amir_Kerimov';
    Linking.openURL(url);
  };

  const goToAccount = () => {
    navigation.navigate('Account');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}>
        <UserInfo onPress={goToAccount} />
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
            onPress={() => toggleFastInputMode()}
            xmlGetter={keyboardSvg}
          />
          <Setting
            type="navigate"
            title="backupCopy"
            onPress={() => navigation.navigate('Backup')}
            xmlGetter={archieveSvg}
          />
          <Setting
            type="navigate"
            title="notifications"
            onPress={() => navigation.navigate('Reminders')}
            xmlGetter={bellSvg}
          />
          <Setting
            type="navigate"
            title="theme"
            onPress={() => navigation.navigate('Theme')}
            xmlGetter={paletteSvg}
          />
          <Setting
            type="navigate"
            title="language"
            onPress={() => navigation.navigate('Language')}
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
            title="contactDeveloper"
            onPress={contactDeveloper}
            xmlGetter={dialogSvg}
          />
          {/* <Setting
          type="navigate"
          title="supportProject"
          onPress={() => {}}
          xmlGetter={dollarSvg}
        /> */}
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
