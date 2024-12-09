import Header from './component/header/page';
import Homecomponent from "./component/home/page";
import Footercomponent from './component/footer/page';
import ClientWrapper from './ClientWrapper';

export default function RootPage() {
  return (
    <>
      <Header />
      <ClientWrapper />
      <Footercomponent />
    </>
  );
}