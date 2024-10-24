import {shieldSvg} from '@/shared/assets/svg/shield';
import {userSvg} from '@/shared/assets/svg/user';
import {useUser, useUserActions} from '@/entities/user';
import {
  FormButton,
  FormInput,
  InputComment,
  PADDING_TOP,
  SCREEN_PADDING,
  useFirebase,
  useInputValidator,
} from '@/shared';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {useEffect} from 'react';

export const ChangeNameForm = () => {
  const {loading, success, error, ...user} = useUser();
  const {auth, firestore} = useFirebase();
  const usersCollection = firestore.collection('Users');
  const {changeNameThunk, clearMessages} = useUserActions();
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
  const {t} = useTranslation();

  const onSubmit = () => {
    changeNameThunk({user, usersCollection, auth, password, name});
  };

  const isFormValid = name !== user.name && isNameValid && isPasswordValid;

  useEffect(() => {
    if (success) {
      Alert.alert(t(success.title), t(success.message), [
        {onPress: navigation.goBack},
      ]);
      clearMessages();
    }
  });

  useEffect(() => {
    if (error) {
      Alert.alert(t(error.title), t(error.message));
      clearMessages();
    }
  }, [error]);

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
        <InputComment>{t('nameCanBeChangedNoMoreThan')}</InputComment>
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
