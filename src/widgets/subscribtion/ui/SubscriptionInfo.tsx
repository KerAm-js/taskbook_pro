import { RateCard, TRate } from "@/features/choose-rate";
import { FormButton, SCREEN_PADDING } from "@/shared";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Slider } from "./Slider";

const rates: TRate[] = [
  {
    id: 0,
    type: "yearly",
    title: "yearlySubscription",
    price: 1590,
    discount: 42,
  },
  { id: 1, type: "monthly", title: "monthlySubscription", price: 229 },
];

export const SubscriptionInfo = () => {
  const [rate, setRate] = useState(0);

  const onSelectRate = (id: number) => setRate(id);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Slider />
      <View style={styles.content}>
        {rates.map((item) => (
          <RateCard
            onPress={onSelectRate}
            key={item.id}
            isSelected={item.id === rate}
            data={item}
          />
        ))}
        <View style={styles.buttons}>
          <FormButton type="accent" title="continue" onPress={() => {}} />
          <FormButton type="secondary" title="tryForFree" onPress={() => {}} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: 200,
  },
  buttons: {
    marginTop: 20,
  },
});
