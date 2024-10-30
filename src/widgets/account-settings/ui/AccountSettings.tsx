import {Alert, ScrollView, StyleSheet} from 'react-native';
import {NavButton} from './NavButton';
import {
  AppStackParamsList,
  FormButton,
  PADDING_TOP,
  SCREEN_PADDING,
  Setting,
  useFirebase,
} from '@/shared';
import {keySvg} from '@/shared/assets/svg/key';
import {useUser, useUserActions} from '@/entities/user';
import {useTranslation} from 'react-i18next';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const AccountSettings = () => {
  const {auth} = useFirebase();
  const {error, loading, email, name} = useUser();
  const {signoutThunk, clearMessages} = useUserActions();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
  const {t} = useTranslation();
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
    signoutThunk({auth});
  };

  const onSignOutHandler = () => {
    Alert.alert(t('signingOutTitle'), undefined, [
      {text: t('cancel'), style: 'cancel'},
      {text: t('signout'), style: 'destructive', onPress: signOut},
    ]);
  };

  useEffect(() => {
    if (error) {
      Alert.alert(t(error.title), t(error.message));
      clearMessages();
    }
  }, [error]);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}>
      <NavButton
        title="emailAddress"
        value={email || ''}
        onPress={goToChangeEmail}
      />
      <NavButton title="fullName" value={name || ''} onPress={goToChangeName} />
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
