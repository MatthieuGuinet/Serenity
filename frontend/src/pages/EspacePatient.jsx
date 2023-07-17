import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import AboutUs from "../components/AboutUs";
import "../styles/EspacePatient.scss";
import StateContext from "../contexts/StateContext";
import AuthFunctionContext from "../contexts/AuthFunctionContext";
import HeaderLocation from "../components/HeaderLocation";
import AccountPatientModal from "../components/AccountPatientModal";

export default function EspacePatient() {
  const navigate = useNavigate();
  const { linkToActive, setActiveModal } = useContext(StateContext);
  const { userInfo, userToken } = useContext(AuthFunctionContext);

  useEffect(() => {
    switch (userInfo.role) {
      case "admin":
        setActiveModal("Praticiens");
        break;
      case "practician":
        setActiveModal("Patients");
        break;
      case "patient":
        setActiveModal("Ma préparation");
        break;
      default:
        break;
    }
  }, []);

  useEffect(() => {
    switch (userInfo.role) {
      case "admin":
        navigate("/espaceadmin");
        break;
      case "practician":
        navigate("/espacepro");
        break;
      case "patient":
        navigate("/espacepatient");
        break;
      default:
        navigate("/");
        break;
    }
  }, [userInfo]);

  let CurrentModalePatient;
  switch (linkToActive) {
    case "Home":
      break;
    case "Mon Compte":
      CurrentModalePatient = <AccountPatientModal />;
      break;
    case "Formulaires":
      break;
    case "Stats":
      break;
    case "A propos":
      CurrentModalePatient = <AboutUs />;
      break;
    default:
      break;
  }

  return (
    userInfo.role === "patient" &&
    userToken && (
      <div className="home-patient">
        <Navbar />
        <div className="modal-container">
          <HeaderLocation />
          {CurrentModalePatient}
        </div>
      </div>
    )
  );
}
