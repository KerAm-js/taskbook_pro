import {Alert, ScrollView, StyleSheet} from 'react-native';
import {NavButton} from './NavButton';
import {
  AccountSettingsStackParamsList,
  FormButton,
  PADDING_TOP,
  SCREEN_PADDING,
  Setting,
} from '@/shared';
import {keySvg} from '@/shared/assets/svg/key';
import {useUser, useUserActions} from '@/entities/user';
import auth from '@react-native-firebase/auth';
import {useTranslation} from 'react-i18next';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const AccountSettings = () => {
  const user = useUser();
  const {removeUser} = useUserActions();
  const navigation =
    useNavigation<NativeStackNavigationProp<AccountSettingsStackParamsList>>();
  const {t} = useTranslation();
  const [loading, setLoading] = useState(false);
  const goToChangePassword = () => {
    navigation.navigate('Password');
  };
  const goToChangeEmail = () => {
    navigation.navigate('Email');
  };
  const goToChangeName = () => {
    navigation.navigate('Name');
  };

  const signOut = () => {
    setLoading(true);
    auth()
      .signOut()
      .then(() => {
        removeUser();
      })
      .catch(error => {
        if (error.code === 'auth/network-request-failed') {
          Alert.alert(t('error'), t('noInternetConnection'));
        } else {
          Alert.alert(t('error'), t('somethingWentWrong'));
        }
      })
      .finally(() => setLoading(false));
  };

  const onSignOutHandler = () => {
    Alert.alert(t('signingOutTitle'), undefined, [
      {text: t('cancel'), style: 'cancel'},
      {text: t('signout'), style: 'destructive', onPress: signOut},
    ]);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <NavButton
        title="emailAddress"
        value={user.email || ''}
        onPress={goToChangeEmail}
      />
      <NavButton
        title="fullName"
        value={user.name || ''}
        onPress={goToChangeName}
      />
      <Setting
        type="navigate"
        xmlGetter={keySvg}
        title="changePassword"
        onPress={goToChangePassword}
      />
      <FormButton
        type="destructive"
        title="signout"
        onPress={onSignOutHandler}
        isLoading={loading}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: PADDING_TOP,
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 200,
  },
});
