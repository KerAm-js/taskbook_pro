import {bellSvg} from '@/shared/assets/svg/bell';
import {dialogSvg} from '@/shared/assets/svg/dialog';
import {translateSvg} from '@/shared/assets/svg/translate';
import {shareSvg} from '@/shared/assets/svg/share';
import {keyboardSvg} from '@/shared/assets/svg/keyboard';
import {paletteSvg} from '@/shared/assets/svg/palette';
import {
  COLORS,
  CustomText,
  PADDING_TOP,
  SCREEN_PADDING,
  Setting,
  SettingsStackParamsList,
  TEXT_STYLES,
  ThemedText,
  ThemedView,
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
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {UserCard, useUser} from '@/entities/user';
import {TaskbookForever} from './TaskbookForever';
import {archieveSvg} from '@/shared/assets/svg/archieve';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const SettingsList = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<SettingsStackParamsList>>();
  const {toggleFastInputMode} = useSettingsActions();
  const fastInputMode = useFastInputMode();
  const {bottom} = useSafeAreaInsets();
  const paddingBottom = bottom < 20 ? 20 : bottom;
  const user = useUser();

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
        <View style={styles.paddingContainer}>
          <TaskbookForever />
        </View>
        <ThemedView
          colorName="background"
          borderColorName="lineGrey"
          style={styles.section}>
          <CustomText themed colorName="textGrey" style={styles.categoryTitle}>
            account
          </CustomText>
          <UserCard data={user} onPress={goToAccount} />
        </ThemedView>
        <ThemedView
          colorName="background"
          borderColorName="lineGrey"
          style={styles.section}>
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
        </ThemedView>
        <ThemedView
          colorName="background"
          borderColorName="lineGrey"
          style={styles.section}>
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
        </ThemedView>
      </ScrollView>
      <ThemedView
        style={[styles.copyRightContainer, {paddingBottom}]}
        nightStyle={styles.copyRightContainerNight}
        borderColorName="lineGrey"
        colorName="background">
        <ThemedText colorName="accent" style={styles.appName}>
          Taskbook Pro
        </ThemedText>
        <CustomText
          themed
          translate
          colorName="accent"
          style={styles.authorName}>
          developedByAmirKerimov
        </CustomText>
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingTop: PADDING_TOP,
  },
  scrollContentContainer: {
    paddingBottom: 200,
  },
  premium: {
    flexDirection: 'row',
  },
  copyRightContainer: {
    alignItems: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
  },
  copyRightContainerNight: {
    borderTopWidth: 0.5,
    borderTopColor: COLORS.whiteUltraOpacity,
    shadowOpacity: 0,
  },
  section: {
    paddingTop: 12,
    marginTop: 10,
    borderTopWidth: 1,
    paddingHorizontal: SCREEN_PADDING,
  },
  paddingContainer: {
    paddingHorizontal: SCREEN_PADDING,
  },
  categoryTitle: {
    ...TEXT_STYLES.standart,
    marginBottom: 10,
  },
  appName: {
    marginBottom: 5,
    ...TEXT_STYLES.standartBold,
  },
  authorName: {
    ...TEXT_STYLES.small,
  },
});