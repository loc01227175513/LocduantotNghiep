"use client";
import Header from './component/header/page';
import Homecomponent from "./component/home/page";
import Footercomponent from './component/footer/page';
import Home from './page/ChuaLogin/Home'; // Changed name and path casing

export default function RootPage() { // Renamed from Home to avoid conflicts
  const Nguoidung = typeof window !== 'undefined' ? localStorage.getItem("data") : null;
  return (
    <div>
      <Header />
      {Nguoidung ? <Homecomponent /> : <Home />}
      <Footercomponent />
    </div>
  );
}