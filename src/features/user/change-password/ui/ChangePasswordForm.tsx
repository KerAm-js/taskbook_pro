import {shieldSvg} from '@/shared/assets/svg/shield';
import {useUser} from '@/entities/user';
import {
  AppStackParamsList,
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
import {shieldMinusSvg} from '@/shared/assets/svg/shieldMinus';
import {shieldCheckSvg} from '@/shared/assets/svg/shieldCheck';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {changePassword} from '../api/changePassword.api';

export const ChangePasswordForm = () => {
  const {t} = useTranslation();
  const {auth, firestore} = useFirebase();
  const usersCollection = firestore.collection('Users');
  const user = useUser();
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamsList>>();
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

  const onSubmit = async () => {
    setLoading(true);
    const result = await changePassword({
      auth,
      user,
      usersCollection,
      currentPassword,
      newPassword,
    });
    Alert.alert(
      t(result.title),
      t(result.message),
      result.status === 'resolved' ? [{onPress: navigation.goBack}] : undefined,
    );
    setLoading(false);
  };

  const resetPassword = () => {
    navigation.navigate('passwordReset');
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
          autoComplete="password"
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
          secureTextEntry
        />
        <InputComment>{t('passwordCanBeChangeNoMoreThan')}</InputComment>
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
