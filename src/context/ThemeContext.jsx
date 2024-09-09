"use client";

import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

const getFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem("theme");
    return value || "light";
  }
}; 

export const ThemeContextProvider = ({ children }) => {
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [questionBox, setQuestionBox] = useState(false);

  const [theme, setTheme] = useState(() => {
    return getFromLocalStorage();
  });

  const toggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
 
  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggle ,commentsOpen, setCommentsOpen,questionBox, setQuestionBox}}>
      {children}
    </ThemeContext.Provider>
  );
};
