import { Outlet } from "react-router-dom";
import Header from "../sections/header";
import Footer from "../sections/footer";

const RootLayout = () => {
  return (
    <main className="overflow-hidden">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
};

export default RootLayout;
