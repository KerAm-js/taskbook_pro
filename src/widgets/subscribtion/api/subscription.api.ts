import {useEffect, useRef, useState} from 'react';
import {TRate} from '@/features/choose-rate';
import {autoAuth, useFirebase} from '@/shared';
import {TApiMessage, useUser} from '@/entities/user';

const PRICES_DOCUMENT = 'subscription-rates_v_1';

type TReturnType = [TRate[] | null, boolean, TApiMessage | null];

export const useSubscriptionRates = (): TReturnType => {
  const {auth, firestore} = useFirebase();
  const {email} = useUser();
  const pricesCollection = firestore.collection('SubscriptionRates');
  const [rates, setRates] = useState<TRate[] | null>(null);
  const [error, setError] = useState<TApiMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  const loadRates = async () => {
    try {
      await autoAuth(auth, email);
      const response = await pricesCollection.doc(PRICES_DOCUMENT).get();
      const data = response.data() as {rates: TRate[]} | undefined | null;
      if (isMounted.current && data) {
        setRates(data.rates);
        setLoading(false);
      }
    } catch (error: any) {
      if (isMounted.current) setLoading(false);
      if (error.code === 'auth/network-request-failed') {
        setError({title: 'error', message: 'noInternetConnection'});
      } else {
        setError({title: 'error', message: 'somethingWentWrong'});
      }
    }
  };

  useEffect(() => {
    loadRates();
    return () => {
      isMounted.current = false;
    };
  }, []);

  return [rates, loading, error];
};
