import {useEffect, useRef, useState} from 'react';
import {autoAuth, useFirebase} from '@/shared';
import {Rate, TApiMessage, useUser} from '@/entities/user';

const PRICES_DOCUMENT = 'subscription-rates_v_1';

type TReturnType = [Rate[] | null, boolean, TApiMessage | null];

export const useSubscriptionRates = (): TReturnType => {
  const {auth, firestore} = useFirebase();
  const {data: user} = useUser();
  const pricesCollection = firestore.collection('SubscriptionRates');
  const [rates, setRates] = useState<Rate[] | null>(null);
  const [error, setError] = useState<TApiMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const isMounted = useRef(true);

  const loadRates = async () => {
    try {
      await autoAuth(auth, user?.email);
      const response = await pricesCollection.doc(PRICES_DOCUMENT).get();
      const data = response.data() as {rates: Rate[]} | undefined | null;
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
