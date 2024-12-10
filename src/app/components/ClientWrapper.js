"use client";
import { useState, createContext, useContext } from 'react';

// Create a context for the toggle state
export const ToggleContext = createContext();

export function useToggle() {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error('useToggle must be used within a ToggleProvider');
  }
  return context;
}

export default function ClientWrapper({ children }) {
  const [toggle, setToggle] = useState(false);

  const toggleValue = {
    toggle,
    setToggle: (value) => {
      if (typeof value === 'boolean') {
        setToggle(value);
      } else if (typeof value === 'function') {
        setToggle(value(toggle));
      }
    }
  };

  return (
    <ToggleContext.Provider value={toggleValue}>
      <div className="app-container">
        {children}
      </div>
    </ToggleContext.Provider>
  );
} 