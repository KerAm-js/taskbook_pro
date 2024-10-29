import {RateCard} from '@/features/choose-rate';
import {
  CustomText,
  FormButton,
  SCREEN_PADDING,
  TEXT_STYLES,
  ThemedView,
  useSafeAreaPadding,
} from '@/shared';
import {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {Slider} from './Slider';
import {useSubscriptionRates} from '../api/subscription.api';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import React from 'react';

export const SubscriptionInfo = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {paddingBottom} = useSafeAreaPadding();
  const [rate, setRate] = useState(0);
  const [rates, isRatesLoading, error] = useSubscriptionRates();

  const onSelectRate = (id: number) => setRate(id);

  useEffect(() => {
    if (error) {
      Alert.alert(t(error.title), t(error.message), [
        {onPress: () => navigation.goBack()},
      ]);
    }
  }, [error]);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        <Slider />
        <View style={styles.content}>
          {isRatesLoading ? (
            <ActivityIndicator />
          ) : rates ? (
            rates.map(item => (
              <RateCard
                onPress={onSelectRate}
                key={item.id}
                isSelected={item.id === rate}
                data={item}
              />
            ))
          ) : (
            <CustomText
              style={styles.loadingErrorText}
              colorName="textGrey"
              themed>
              couldntLoadRates
            </CustomText>
          )}
        </View>
      </ScrollView>
      <ThemedView
        colorName="background"
        borderColorName="lineGrey"
        style={[styles.footer, {paddingBottom: paddingBottom + 30}]}>
        <FormButton type="accent" title="continue" onPress={() => {}} />
        <FormButton type="secondary" title="tryForFree" onPress={() => {}} />
      </ThemedView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {flex: 1},
  content: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 100,
  },
  loadingErrorText: {
    textAlign: 'center',
    ...TEXT_STYLES.standart,
  },
  footer: {
    paddingTop: 10,
    borderTopWidth: 1,
    paddingHorizontal: SCREEN_PADDING,
  },
});
