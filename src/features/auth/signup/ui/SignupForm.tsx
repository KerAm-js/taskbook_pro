import {emailSvg} from '@/shared/assets/svg/email';
import {shieldSvg} from '@/shared/assets/svg/shield';
import {
  EMAIL_REGEX,
  FormButton,
  FormInput,
  SCREEN_PADDING,
  useFirebase,
  useHeaderHeight,
  useInputValidator,
} from '@/shared';
import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import {userSvg} from '@/shared/assets/svg/user';
import {shieldCheckSvg} from '@/shared/assets/svg/shieldCheck';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {signup} from '../api/singup.api';

const HEIGHT = Dimensions.get('screen').height;

export const SignupForm = () => {
  const {t} = useTranslation();
  const {auth} = useFirebase();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [email, onChangeEmail, isEmailValid, emailError] = useInputValidator({
    pattern: EMAIL_REGEX,
    patternErrorMessage: t('incorrectEmail'),
    required: true,
  });
  const [name, onChangeName, isNameValid, nameError] = useInputValidator({
    required: true,
    minLength: 2,
  });
  const [password, onChangePassword, isPasswordValid, passwordError] =
    useInputValidator({minLength: 6});
  const [
    passwordAgain,
    onChangePasswordAgain,
    isPasswordAgainValid,
    passwordAgainError,
    showPasswordAgainErrorForce,
  ] = useInputValidator({
    valueToConfirm: password,
    confirmationErrorMessage: 'passwordsDontMatch',
  });
  const headerHeight = useHeaderHeight();

  const onSubmit = async () => {
    setLoading(true);
    const result = await signup({email, name, password, auth});
    Alert.alert(
      t(result.title),
      t(result.message),
      result.status === 'rejected' ? [{onPress: navigation.goBack}] : undefined,
    );
    setLoading(false);
  };

  const isFormValid =
    isEmailValid && isNameValid && isPasswordValid && isPasswordAgainValid;

  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={styles.container}
      bottomOffset={20}>
      <View
        style={[
          styles.form,
          {height: HEIGHT - headerHeight, paddingBottom: headerHeight + 70},
        ]}>
        <FormInput
          placeholder="email"
          xmlGetter={emailSvg}
          value={email}
          onChangeText={onChangeEmail}
          error={emailError}
          textContentType="emailAddress"
          autoComplete="email"
        />
        <FormInput
          placeholder="nameAndSurname"
          xmlGetter={userSvg}
          value={name}
          onChangeText={onChangeName}
          error={nameError}
        />
        <FormInput
          placeholder="password"
          xmlGetter={shieldSvg}
          value={password}
          onChangeText={onChangePassword}
          error={passwordError}
          maxLength={20}
          textContentType="password"
          autoComplete="password"
          secureTextEntry
        />
        <FormInput
          placeholder="passwordAgain"
          xmlGetter={shieldCheckSvg}
          value={passwordAgain}
          onChangeText={onChangePasswordAgain}
          error={passwordAgainError}
          showErrorForce={showPasswordAgainErrorForce}
          maxLength={20}
          textContentType="password"
          secureTextEntry
          autoComplete="password"
        />
        <View style={styles.buttonsContainer}>
          <FormButton
            type="accent"
            title="signup"
            onPress={onSubmit}
            isLoading={loading}
            disabled={!isFormValid}
          />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    paddingHorizontal: SCREEN_PADDING,
    justifyContent: 'center',
  },
  buttonsContainer: {
    marginTop: 10,
  },
});
