import {shieldSvg} from '@/shared/assets/svg/shield';
import {userSvg} from '@/shared/assets/svg/user';
import {checkCanUpdate, useUser, useUserActions} from '@/entities/user';
import {
  FormButton,
  FormInput,
  InputComment,
  PADDING_TOP,
  SCREEN_PADDING,
  useInputValidator,
} from '@/shared';
import {useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

export const ChangeNameForm = () => {
  const user = useUser();
  const {updateName} = useUserActions();
  const navigation = useNavigation();
  const [name, onChangeName, isNameValid, nameError] = useInputValidator({
    required: true,
    minLength: 2,
    initValue: user.name,
  });
  const [password, onChangePassword, isPasswordValid, passwordError] =
    useInputValidator({
      required: true,
      minLength: 6,
    });
  const [loading, setLoading] = useState(false);
  const {t} = useTranslation();

  const onSubmit = () => {
    const canUpdateName = checkCanUpdate(user.nameUpdatedAt);
    if (!canUpdateName) {
      Alert.alert(t('changingPeriodComment', {label: t('fullName')}));
    } else if (user.email) {
      setLoading(true);
      auth()
        .signInWithEmailAndPassword(user.email, password)
        .then(response => {
          return response.user.updateProfile({displayName: name});
        })
        .then(() => {
          auth().currentUser?.reload();
          updateName(name);
          Alert.alert(t('success'), t('nameSuccessfullyChanged'), [
            {
              onPress: () => navigation.goBack(),
            },
          ]);
        })
        .catch(error => {
          if (error.code === 'auth/network-request-failed') {
            Alert.alert(t('error'), t('noInternetConnection'));
          } else {
            Alert.alert(t('error'), t('somethingWentWrong'));
          }
        })
        .finally(() => setLoading(false));
    }
  };

  const isFormValid = name !== user.name && isNameValid && isPasswordValid;

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.content}>
      <View style={styles.inputs}>
        <FormInput
          xmlGetter={userSvg}
          value={name}
          onChangeText={onChangeName}
          placeholder="fullName"
          error={nameError}
          textContentType="name"
          autoComplete="name"
        />
        <InputComment>
          {t('changingPeriodComment', {label: t('name')})}
        </InputComment>
        <FormInput
          xmlGetter={shieldSvg}
          value={password}
          onChangeText={onChangePassword}
          placeholder="password"
          error={passwordError}
          maxLength={20}
          textContentType="password"
          autoComplete="password"
          secureTextEntry
        />
      </View>
      <FormButton
        type="accent"
        title="save"
        onPress={onSubmit}
        disabled={!isFormValid}
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
