import {StyleSheet} from 'react-native';
import React from 'react';
import {RecentTasks} from './ResentTasks/RecentTasks';
import {Header} from './Header/Header';

export const TaskHistory = () => {
  return (
    <>
      <Header />
      <RecentTasks />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 200,
  },
});
