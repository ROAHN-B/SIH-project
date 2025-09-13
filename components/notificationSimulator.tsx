"use client";

import { useEffect, useState } from 'react';
import { useAlerts } from '@/app/contexts/alert-context';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/lib/translations';

// This is our list of demo alerts to cycle through
const demoAlerts = (t: any) => [
  {
    type: "weather" as const,
    title: t.weatherWarning,
    message: "High winds (45 km/h) detected in Solapur. Secure loose items.",
  },
  {
    type: "price" as const,
    title: t.priceAlert,
    message: "Onion prices have surged by 25% in the Pune market today.",
  },
  {
    type: "weather" as const,
    title: "Heat Advisory",
    message: "Temperature expected to exceed 40°C. Ensure proper irrigation for crops.",
  }
];

export function NotificationSimulator() {
  const { setAlerts } = useAlerts();
  const { language } = useLanguage();
  const t = useTranslation(language);
  const [alertIndex, setAlertIndex] = useState(0);

  useEffect(() => {
    
    const interval = setInterval(() => {
      const alertsToShow = demoAlerts(t);
      
      const nextAlert = alertsToShow[alertIndex % alertsToShow.length];
      
     
      setAlerts([nextAlert]);
      
      
      setAlertIndex(prevIndex => prevIndex + 1);

    }, 15000); 

    
    return () => clearInterval(interval);
  }, [setAlerts, t, alertIndex]); 

  
  return null; 
}