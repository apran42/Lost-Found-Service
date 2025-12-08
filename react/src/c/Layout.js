import { useLocation } from "react-router-dom";
import Header from "./Header";
import MainHeader from "./MainHeader";
import Footer from "./Footer";

function Layout({ children }) {
  const location = useLocation();
  const isMainPage = location.pathname === "/";  

  return (
    <>
      {isMainPage ? <MainHeader /> : <Header />}
      <main>{children}</main>
      <Footer />
    </>
  );
}

export default Layout;
