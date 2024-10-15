import {shieldSvg} from '@/shared/assets/svg/shield';
import {checkCanUpdate, useUser} from '@/entities/user';
import {
  FormButton,
  FormInput,
  InputComment,
  PADDING_TOP,
  PasswordStackParamsList,
  SCREEN_PADDING,
  useInputValidator,
} from '@/shared';
import {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {shieldMinusSvg} from '@/shared/assets/svg/shieldMinus';
import {shieldCheckSvg} from '@/shared/assets/svg/shieldCheck';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const ChangePasswordForm = () => {
  const {t} = useTranslation();
  const user = useUser();
  const navigation =
    useNavigation<NativeStackNavigationProp<PasswordStackParamsList>>();
  const [
    currentPassword,
    onChangeCurrentPassword,
    isCurrentPasswordValid,
    currentPasswordError,
  ] = useInputValidator({minLength: 6});
  const [
    newPassword,
    onChangeNewPassword,
    isNewPasswordValid,
    newPasswordError,
  ] = useInputValidator({minLength: 6});
  const [
    passwordAgain,
    onChangePasswordAgain,
    isPasswordAgainValid,
    passwordAgainError,
    showPasswordAgainErrorForce,
  ] = useInputValidator({
    valueToConfirm: newPassword,
    confirmationErrorMessage: t('passwordsDontMatch'),
    required: true,
  });
  const [loading, setLoading] = useState(false);

  const isFormValid =
    isCurrentPasswordValid && isPasswordAgainValid && isNewPasswordValid;

  const onSubmit = () => {
    const canUpdatePassword = checkCanUpdate(user.passwordUpdatedAt);
    if (!canUpdatePassword) {
      Alert.alert(t('changingPeriodComment', {label: t('password')}));
    } else if (newPassword === currentPassword) {
      Alert.alert(t('passwordAlreadyInUse'));
    } else if (user.email) {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(user.email, currentPassword)
        .then(response => {
          return response.user.updatePassword(newPassword);
        })
        .then(() => {
          Alert.alert(t('success'), t('passwordSuccessfullyChanged'), [
            {
              onPress: () => navigation.goBack(),
            },
          ]);
        })
        .catch(error => {
          if (error.code === 'auth/wrong-password') {
            Alert.alert(t('error'), t('wrongPassword'));
          } else if (error.code === 'auth/network-request-failed') {
            Alert.alert(t('error'), t('noInternetConnection'));
          } else {
            Alert.alert(t('error'), t('somethingWentWrong'));
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const resetPassword = () => {
    navigation.navigate('PasswordReset');
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <View style={styles.inputs}>
        <FormInput
          xmlGetter={shieldMinusSvg}
          placeholder="oldPassword"
          value={currentPassword}
          onChangeText={onChangeCurrentPassword}
          error={currentPasswordError}
          maxLength={20}
          textContentType="password"
          secureTextEntry
        />
        <FormInput
          xmlGetter={shieldSvg}
          placeholder="newPassword"
          value={newPassword}
          onChangeText={onChangeNewPassword}
          error={newPasswordError}
          maxLength={20}
          textContentType="password"
          autoComplete="new-password"
          secureTextEntry
        />
        <FormInput
          xmlGetter={shieldCheckSvg}
          placeholder="passwordAgain"
          value={passwordAgain}
          onChangeText={onChangePasswordAgain}
          error={passwordAgainError}
          showErrorForce={showPasswordAgainErrorForce}
          maxLength={20}
          textContentType="password"
          autoComplete="new-password"
          secureTextEntry
        />
        <InputComment>
          {t('changingPeriodComment', {label: t('password')})}
        </InputComment>
      </View>
      <View style={styles.buttons}>
        <FormButton
          disabled={!isFormValid}
          type="accent"
          title="save"
          onPress={onSubmit}
          isLoading={loading}
        />
        <FormButton
          type="secondary"
          title="forgotPassword"
          onPress={resetPassword}
        />
      </View>
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
  buttons: {
    gap: 5,
  },
});
