import { createContext, useContext, useState } from "react";

interface SettingsContextType{
  settings: any;
  setSettings: React.Dispatch<React.SetStateAction<any>>;
}

interface SettingsContextProviderProps {
  children: React.ReactNode;
}

export const SettingsContext = createContext<SettingsContextType>({
  settings: null,
  setSettings: () => {}
});

export const useSettingsContext = () => {
  return useContext(SettingsContext);
}

export const SettingsContextProvider: React.FC<SettingsContextProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState(
    JSON.parse(localStorage.getItem("lms-settings") as string) || null
  );
  return(
    <SettingsContext.Provider value = {{settings, setSettings}}>
      {children}
    </SettingsContext.Provider>
  )
}