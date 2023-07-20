import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Faker from "../components/Faker/Faker";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../UserContext";
import { Alert, Fade } from "react-bootstrap";
import { AlertInfo } from "../interfaces";
import { SubscribeBanner } from "../components/Premium/SubscribeBanner";

const Layout = (props: { onTokenChange: () => void }) => {
  const user = useContext(UserContext);

  const [alert, setAlert] = useState<AlertInfo | null>(null);

  // store alert in context

  useEffect(() => {
    // if multiple alerts starting before 3sec, make them all last 3sec
    if (alert) {
      setTimeout(() => {
        setAlert(null);
      }, 3000);
    }
  }, [alert]);

  const Message = () => {
    return (
      alert && (
        <Alert
          variant={alert.variant}
          className="text-center"
          transition={Fade}
        >
          {alert.message}
        </Alert>
      )
    );
  };

  const handleAlert = (alertInfo: AlertInfo) => {
    setAlert(alertInfo);
  };

  console.log('user', user)
  return (
    <>
      <Navbar onTokenChange={props.onTokenChange} handleAlert={handleAlert} />
      {user?.role === "SUPERADMIN" && <Faker />}
      {!user?.isPremium && <SubscribeBanner />}
      {alert && <Message />}
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
