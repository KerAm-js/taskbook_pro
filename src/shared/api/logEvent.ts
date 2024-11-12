import analytics, {
  FirebaseAnalyticsTypes,
} from '@react-native-firebase/analytics';

type Arguments = [
  name: string,
  params?: {
    [key: string]: any;
  },
  options?: FirebaseAnalyticsTypes.AnalyticsCallOptions,
];

export const logEvent = async (...args: Arguments) => {
  try {
    await analytics().logEvent(...args);
  } catch (error) {}
};