"use client";
import Header from './component/header/page';
import Homecomponent from "./component/home/page";
import Footercomponent from './component/footer/page';
import Home from './page/ChuaLogin/Home';
import { useEffect, useState } from 'react';

export default function RootPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem("data");
    setIsLoggedIn(!!userData);
  }, []);

  const MainContent = () => {
    return isLoggedIn ? <Homecomponent /> : <Home />;
  };

  return (
    <>
      <Header />
      <MainContent />
      <Footercomponent />
    </>
  );
}