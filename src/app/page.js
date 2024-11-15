"use client"; 
import Header from './component/header/page';
import Homecomponent from "./component/home/page";
import Footercomponent from './component/footer/page';


export default function Home() {
  return (
    <div>

      <Header/>
      <Homecomponent/>
      <Footercomponent/>
    </div>
  );
}
