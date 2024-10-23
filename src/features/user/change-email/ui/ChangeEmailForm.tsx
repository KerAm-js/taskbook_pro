import {emailSvg} from '@/shared/assets/svg/email';
import {shieldSvg} from '@/shared/assets/svg/shield';
import {
  checkCanUpdate,
  getNewUpdatedAt,
  UserInfo,
  useUser,
  useUserActions,
} from '@/entities/user';
import {
  EMAIL_REGEX,
  FormButton,
  FormInput,
  InputComment,
  PADDING_TOP,
  SCREEN_PADDING,
  useFirebase,
  useInputValidator,
} from '@/shared';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';

export const ChangeEmailForm = () => {
  const {t} = useTranslation();
  const {auth, firestore} = useFirebase();
  const usersCollection = firestore.collection('Users');
  const {removeUser} = useUserActions();
  const user = useUser();
  const [email, onChangeEmail, isEmailValid, emailError] = useInputValidator({
    pattern: EMAIL_REGEX,
    patternErrorMessage: t('incorrectEmail'),
    required: true,
  });
  const [
    emailAgain,
    onChangeEmailAgain,
    isEmailAgainValid,
    emailAgainError,
    showEmailAgainErrorForce,
  ] = useInputValidator({
    valueToConfirm: email,
    confirmationErrorMessage: t('emailAddressesDontMatch'),
    required: true,
  });
  const [password, onChangePassword, isPasswordValid, passwordError] =
    useInputValidator({minLength: 6});
  const [loading, setLoading] = useState(false);

  const isFormValid =
    isEmailValid &&
    isEmailAgainValid &&
    isPasswordValid &&
    email !== user.email;

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (!user.email) return;
      const authorization = await auth.signInWithEmailAndPassword(
        user.email,
        password,
      );
      const response = await usersCollection.doc(authorization.user.uid).get();
      const userInfo = response.data() as UserInfo;
      const canUpdate = checkCanUpdate(userInfo.emailUpdatedAt);
      if (canUpdate) {
        await authorization.user.updateEmail(email);
        const emailUpdatedAt: UserInfo['emailUpdatedAt'] = getNewUpdatedAt(
          userInfo.emailUpdatedAt,
        );
        usersCollection.doc(authorization.user.uid).set({...userInfo, emailUpdatedAt});
        Alert.alert(t('success'), t('emailAddressSuccessfullyChanged'), [
          {
            onPress: async () => {
              await auth.signOut();
              removeUser();
            },
          },
        ]);
      } else {
        Alert.alert(
          t('error'),
          t('changingPeriodComment', {label: t('emailAddress')}),
        );
      }
    } catch (error: any) {
      console.log(error);
      if (error.code === 'auth/wrong-password') {
        Alert.alert(t('error'), t('wrongPassword'));
      } else if (error.code === 'auth/email-already-in-use') {
        Alert.alert(t('error'), t('emailAlreadyInUse'));
      } else if (error.code === 'auth/network-request-failed') {
        Alert.alert(t('error'), t('noInternetConnection'));
      } else {
        Alert.alert(t('error'), t('somethingWentWrong'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <View style={styles.inputs}>
        <InputComment>{t('currentEmail', {email: user.email})}</InputComment>
        <FormInput
          xmlGetter={emailSvg}
          placeholder="newEmail"
          value={email}
          onChangeText={onChangeEmail}
          error={emailError}
          textContentType="emailAddress"
          autoComplete="email"
        />
        <FormInput
          xmlGetter={emailSvg}
          placeholder="emailAgain"
          value={emailAgain}
          onChangeText={onChangeEmailAgain}
          error={emailAgainError}
          showErrorForce={showEmailAgainErrorForce}
          textContentType="emailAddress"
          autoComplete="email"
        />
        <InputComment>
          {t('changingPeriodComment', {label: t('emailAddress')})}
        </InputComment>
        <FormInput
          xmlGetter={shieldSvg}
          placeholder="password"
          value={password}
          onChangeText={onChangePassword}
          error={passwordError}
          maxLength={20}
          textContentType="password"
          autoComplete="password"
          secureTextEntry
        />
      </View>
      <FormButton
        disabled={!isFormValid}
        type="accent"
        title="save"
        onPress={onSubmit}
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
  inputs: {
    marginBottom: 10,
  },
});
