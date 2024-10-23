import {useEffect, useRef, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import {TRate} from '@/features/choose-rate';
import {autoAuth, useFirebase} from '@/shared';
import {useUser} from '@/entities/user';

const PRICES_DOCUMENT = 'subscription-rates_v_1';

export const useSubscriptionRates = (): [TRate[] | null, boolean] => {
  const {t} = useTranslation();
  const {auth, firestore} = useFirebase();
  const {email} = useUser();
  const pricesCollection = firestore.collection('SubscriptionRates');
  const [rates, setRates] = useState<TRate[] | null>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  const loadRates = async () => {
    try {
      await autoAuth(auth, email);
      const response = await pricesCollection.doc(PRICES_DOCUMENT).get();
      const data = response.data() as TRate[];
      if (isMounted.current && data) {
        setRates(data);
        setLoading(false);
      }
    } catch (error: any) {
      if (isMounted.current) setLoading(false);
      if (error.code === 'auth/network-request-failed') {
        Alert.alert(t('error'), t('noInternetConnection'));
      } else {
        Alert.alert(t('error'), t('somethingWentWrong'));
      }
    }
  };

  useEffect(() => {
    loadRates();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return [rates, loading];
};
