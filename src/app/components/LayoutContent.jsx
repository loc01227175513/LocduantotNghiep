"use client";
import { useState } from 'react';

export default function LayoutContent({ children }) {
  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(prev => !prev);
  };

  return (
    <div className={`app-container ${toggle ? 'toggled' : ''}`}>
      <button onClick={handleToggle}>
        Toggle Menu
      </button>
      <main>
        {children}
      </main>
    </div>
  );
} 