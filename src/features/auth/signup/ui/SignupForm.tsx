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
import {useState} from 'react';
import {Alert, Dimensions, StyleSheet, View} from 'react-native';
import {userSvg} from '@/shared/assets/svg/user';
import {shieldCheckSvg} from '@/shared/assets/svg/shieldCheck';
import {useTranslation} from 'react-i18next';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {useNavigation} from '@react-navigation/native';
import {User, UserInfo} from '@/entities/user';

const HEIGHT = Dimensions.get('screen').height;

export const SignupForm = () => {
  const {t} = useTranslation();
  const {auth, firestore} = useFirebase();
  const usersCollection = firestore.collection('Users');
  const navigation = useNavigation();
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
  const [loading, setLoading] = useState(false);
  const headerHeight = useHeaderHeight();

  const onSubmit = async () => {
    setLoading(true);
    try {
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password,
      );
      if (response) {
        const userData: UserInfo = {
          emailUpdatedAt: undefined,
          passwordUpdatedAt: undefined,
          nameUpdatedAt: undefined,
        };
        await response.user.updateProfile({displayName: name});
        await usersCollection.doc(response.user.uid).set(userData);
        await response.user.sendEmailVerification();
        Alert.alert(
          t('emailConfirmationTitle'),
          t('emailConfirmationMessage'),
          [
            {
              onPress: () => navigation.goBack(),
            },
          ],
        );
      }
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        Alert.alert(t('error'), t('emailAlreadyInUse'));
      } else if (error.code === 'auth/network-request-failed') {
        Alert.alert(t('error'), t('noInternetConnection'));
      } else {
        Alert.alert(t('error'), t('somethingWentWrong'));
      }
    }
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
