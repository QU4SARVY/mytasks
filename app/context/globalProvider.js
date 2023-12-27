"use client";

import React, { createContext, useState, useContext } from "react";
import themes from "./themes";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();

export const GlobalProvider = ({ children }) => {

  const { user } = useUser();

  const [selectedTheme, setSelectedTheme] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const theme = themes[selectedTheme];
  const [tasks, setTasks] = useState([]);

  const openModal = () => {setModal(true);};

  const closeModal = () => {setModal(false);};

  const collapsedMenu = () => {
    setCollapsed(!collapsed);
  }

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("/api/tasks");
  
      const sorted = res.data.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  
      setTasks(sorted);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  

  const deleteTask = async (id) => {
    try {
      const res = await axios.delete(`/api/tasks/${id}`);
      toast.success("Task deleted successfully");
      allTasks();
    } catch (error) {
      console.error(error); // Add the error parameter here
      toast.error("Something went wrong");
    }
  };
  

  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);
      toast.success("Task updated successfully");
      allTasks();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  React.useEffect(() => {
    allTasks();
  }, []); // Вызывается при первой загрузке страницы
  
  React.useEffect(() => {
    if (user) {
      allTasks();
    }
  }, [user]); // Вызывается при изменении пользователя

  return (
    <GlobalContext.Provider value={{ theme, tasks, isLoading, deleteTask, completedTasks, importantTasks, incompleteTasks, updateTask, modal,  openModal, closeModal, allTasks, collapsed, collapsedMenu }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalContext);
