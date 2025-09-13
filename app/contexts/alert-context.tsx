"use client";

import { createContext, useState, useContext, ReactNode, useCallback } from 'react';


type Alert = {
  type: "weather" | "price";
  title: string;
  message: string;
};


type AlertContextType = {
  alerts: Alert[];
  setAlerts: (alerts: Alert[]) => void;
  hasUnreadAlerts: boolean;
  markAlertsAsRead: () => void;
};


const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, _setAlerts] = useState<Alert[]>([]);
  const [hasUnreadAlerts, setHasUnreadAlerts] = useState(false);

  const setAlerts = useCallback((newAlerts: Alert[]) => {
    _setAlerts(newAlerts);
   
    if (newAlerts.length > 0) {
      setHasUnreadAlerts(true);
    }
  }, []);

  const markAlertsAsRead = useCallback(() => {
    setHasUnreadAlerts(false);
  }, []);

  return (
    <AlertContext.Provider value={{ alerts, setAlerts, hasUnreadAlerts, markAlertsAsRead }}>
      {children}
    </AlertContext.Provider>
  );
};


export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};