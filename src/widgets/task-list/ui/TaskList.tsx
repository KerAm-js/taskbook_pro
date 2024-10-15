import { ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useMemo, useRef } from "react";
import { PADDING_TOP, SCREEN_PADDING } from "@/shared";
import { EmptyListImage } from "./EmptyListImage";
import {
  useCompletedTasksCount,
  useSelectedDate,
  useTaskIds,
} from "@/entities/task";
import { updateDailyNotification, useDailyReminder } from "@/entities/settings";
import { useTranslation } from "react-i18next";
import { ListItem } from "./ListItem";

export const TaskList = () => {
  const taskIds = useTaskIds();
  const completedTasksCount = useCompletedTasksCount();
  const selectedDate = useSelectedDate();
  const { end, beginning } = useDailyReminder();
  const { t } = useTranslation();
  const prevDate = useRef<null | number>(null);
  const isInitialRender = useRef(true);

  useMemo(() => {
    if (!prevDate.current) {
      prevDate.current = selectedDate;
      return;
    }
    if (prevDate.current !== selectedDate) {
      prevDate.current = selectedDate;
      isInitialRender.current = true;
    } else {
      isInitialRender.current = false;
    }
  }, [taskIds, selectedDate]);

  useEffect(() => {
    if (!end.turnedOff) {
      for (let date in taskIds) {
        updateDailyNotification({
          type: "end",
          title: t("reviewOfTheDay"),
          body: t("tasksCompleted", {
            count: taskIds[date].length,
            completed: completedTasksCount,
          }),
          date: Number(date),
          ...end,
        });
      }
    }
  }, [end]);

  useEffect(() => {
    if (!beginning.turnedOff) {
      for (let date in taskIds) {
        updateDailyNotification({
          type: "beginning",
          title: t("plansForToday"),
          body: t("tasksToDo", { count: taskIds[date].length }),
          date: Number(date),
          ...beginning,
        });
      }
    }
  }, [beginning]);

  useEffect(() => {
    if (!beginning.turnedOff) {
      updateDailyNotification({
        type: "beginning",
        title: t("plansForToday"),
        body: t("tasksToDo", { count: taskIds[selectedDate].length }),
        date: selectedDate,
        ...beginning,
      });
    }
  }, [taskIds[selectedDate].length]);

  useEffect(() => {
    if (!end.turnedOff) {
      updateDailyNotification({
        type: "end",
        title: t("reviewOfTheDay"),
        body: t("tasksCompleted", {
          count: taskIds[selectedDate].length,
          completed: completedTasksCount,
        }),
        date: selectedDate,
        ...end,
      });
    }
  }, [completedTasksCount]);

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.contentContainer}
    >
      {!!taskIds[selectedDate].length ? (
        taskIds[selectedDate].map((id, index) => {
          const i = { value: index };
          return (
            <ListItem
              key={id}
              isInitialRender={isInitialRender}
              index={i}
              id={id}
            />
          );
        })
      ) : (
        <EmptyListImage />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: PADDING_TOP,
    paddingBottom: 200,
    paddingHorizontal: SCREEN_PADDING,
  },
  scroll: {
    flex: 1,
  },
});
