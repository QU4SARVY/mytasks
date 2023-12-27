"use client"
import React from 'react';
import { useGlobalState } from '../context/globalProvider';
import Tasks from '../Components/tasks/Tasks';

function page() {
  const { incompleteTasks } = useGlobalState(); // Добавлены скобки, чтобы вызвать функцию useGlobalState

  return <Tasks title='Incomplete tasks' tasks={incompleteTasks} />;
}

export default page;