import {emailSvg} from '@/shared/assets/svg/email';
import {useUser} from '@/entities/user';
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

export const ResetPasswordForm = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const user = useUser();
  const [email, onChangeEmail, isEmailValid, emailError] = useInputValidator({
    pattern: EMAIL_REGEX,
    patternErrorMessage: t('incorrectEmail'),
    required: true,
    initValue: user.email,
  });
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
    if (email) {
      setLoading(true);
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(t('emailSent'), t('followLinkWeSent'), [
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
        <InputComment>{t('passwordResetLinkWillBeSent')}</InputComment>
        <FormInput
          xmlGetter={emailSvg}
          placeholder="email"
          value={email}
          onChangeText={onChangeEmail}
          error={emailError}
          textContentType="emailAddress"
          editable={!(user.uid && user.email)}
        />
        <InputComment>{t('passwordResettingPeriodComment')}</InputComment>
      </View>
      <FormButton
        disabled={!isEmailValid}
        type="accent"
        title="send"
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
