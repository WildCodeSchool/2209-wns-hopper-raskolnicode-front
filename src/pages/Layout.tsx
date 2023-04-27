import { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Faker from "../components/Faker/Faker";
import Footer from "../components/Footer/Footer";
import { UserContext } from "../UserContext";
import { Alert, Fade } from "react-bootstrap";
import { AlertInfo } from "../interfaces";

const Layout = (props: { onTokenChange: () => void }) => {

  const user = useContext(UserContext);
  console.log(user?.role)

  const [alert, setAlert] = useState<AlertInfo|null>(null)
  
  useEffect(() => {
    setTimeout(() => {
      setAlert(null)
    }, 3000)
  }, [alert])

  const Message = () => {
    return alert && <Alert variant={alert.variant} className="text-center" transition={Fade}>
      {alert.message}
    </Alert>
  }

  const handleAlert = (alertInfo: AlertInfo) => {
    setAlert(alertInfo)
  }

  return (
    <>
      <Navbar onTokenChange={props.onTokenChange} handleAlert={handleAlert} />
      <hr className="mb-0" style={{ margin: "0" }} />
      {
        user?.role === "SUPERADMIN" && <Faker />
      }
      {
        alert && <Message />
      }
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
