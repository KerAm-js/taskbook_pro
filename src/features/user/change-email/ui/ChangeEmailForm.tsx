import {emailSvg} from '@/shared/assets/svg/email';
import {shieldSvg} from '@/shared/assets/svg/shield';
import {checkCanUpdate, useUser, useUserActions} from '@/entities/user';
import {
  EMAIL_REGEX,
  FormButton,
  FormInput,
  InputComment,
  PADDING_TOP,
  SCREEN_PADDING,
  useInputValidator,
} from '@/shared';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

export const ChangeEmailForm = () => {
  const {t} = useTranslation();
  const {updateEmail} = useUserActions();
  const navigation = useNavigation();
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

  const onSubmit = () => {
    const canUpdateEmail = checkCanUpdate(user.emailUpdatedAt);
    if (!canUpdateEmail) {
      Alert.alert(t('changingPeriodComment', {label: t('emailAddress')}));
    } else if (user.email) {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(user.email, password)
        .then(response => {
          return response.user.updateEmail(email);
        })
        .then(() => {
          auth().currentUser?.reload();
          updateEmail(email);
          Alert.alert(t('success'), t('emailAddressSuccessfullyChanged'), [
            {
              onPress: () => navigation.goBack(),
            },
          ]);
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert(t('error'), t('emailAlreadyInUse'));
          } else if (error.code === 'auth/network-request-failed') {
            Alert.alert(t('error'), t('noInternetConnection'));
          } else {
            Alert.alert(t('error'), t('somethingWentWrong'));
          }
        })
        .finally(() => setLoading(false));
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
