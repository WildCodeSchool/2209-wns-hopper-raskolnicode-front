import { useNavigate } from "react-router-dom";
import styles from "./GoBack.module.scss";

function GoBack(): JSX.Element {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.goback}>
      <img src="/arrow.png" alt="back" onClick={goBack}></img>
    </div>
  );
}

export default GoBack;
