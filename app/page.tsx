"use client";
import Tasks from "./Components/tasks/Tasks";
import { useGlobalState } from "./context/globalProvider";

export default function Home() {
  const { tasks } = useGlobalState();  // Add parentheses to invoke the function
  return (
    <Tasks title="All Tasks" tasks={tasks} />
  );
}
