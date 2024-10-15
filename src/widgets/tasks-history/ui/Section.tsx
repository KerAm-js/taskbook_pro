import { useCompletedTasks } from "@/entities/task";
import { getDateTitle } from "@/shared";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { LayoutAnimation } from "react-native";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";
import { Card } from "./Card";
import { SectionTitle } from "./SectionTitle";

export const Section = React.memo(
  ({ date }: { date: number }) => {
    const ids = useCompletedTasks(date);
    const { t } = useTranslation();
    const title = getDateTitle(date, t);

    useEffect(() => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    }, [ids]);

    if (ids.length === 0) {
      return null;
    }

    return (
      <Animated.View entering={FadeIn} exiting={FadeOut.duration(150)}>
        <SectionTitle>{title}</SectionTitle>
        {ids.map((id) => (
          <Card key={id} id={id} />
        ))}
      </Animated.View>
    );
  },
  () => true
);
