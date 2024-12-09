'use client'
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

// Dynamically import components with no SSR
const Home = dynamic(() => import('./page/ChuaLogin/Home'), {
  ssr: false
});

const Homecomponent = dynamic(() => import('./component/home/page'), {
  ssr: false
});

export default function ClientWrapper() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const userData = localStorage.getItem("data");
    setIsLoggedIn(!!userData);
  }, []);

  if (!isClient) {
    return null; // or a loading spinner
  }

  return isLoggedIn ? <Homecomponent /> : <Home />;
} 