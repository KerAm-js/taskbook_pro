import {emailSvg} from '@/shared/assets/svg/email';
import {shieldSvg} from '@/shared/assets/svg/shield';
import {
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
import {changeEmail} from '../api/changeEmail.api';

export const ChangeEmailForm = () => {
  const {t} = useTranslation();
  const {auth, firestore} = useFirebase();
  const usersCollection = firestore.collection('Users');
  const {signoutThunk} = useUserActions();
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
    const result = await changeEmail({
      auth,
      email,
      password,
      user,
      usersCollection,
    });
    Alert.alert(
      t(result.title),
      t(result.message),
      result.status === 'resolved'
        ? [{onPress: () => signoutThunk({auth})}]
        : undefined,
    );
    setLoading(false);
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
        <InputComment>{t('emailCanBeChangedNoMoreThan')}</InputComment>
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
