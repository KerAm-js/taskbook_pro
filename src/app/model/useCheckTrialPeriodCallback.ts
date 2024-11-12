import {useUserActions, Subscription} from '@/entities/user';
import {TRIAL_PERIOD_IN_MILLIS_SECONDS} from '../config/consts';

export const useCheckTrialPeriodCallback = (subscription: Subscription) => {
  const {endTrialPeriod} = useUserActions();
  return () => {
    if (!subscription.isTrialPeriodExpired) {
      const timeUntilTrialPeriodEnd =
        Date.now() - subscription.trialPeriodStartDate;
      if (timeUntilTrialPeriodEnd <= TRIAL_PERIOD_IN_MILLIS_SECONDS) {
        endTrialPeriod();
      } else {
        setTimeout(() => {
          endTrialPeriod();
        }, timeUntilTrialPeriodEnd);
      }
    }
  };
};
