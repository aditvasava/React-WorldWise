import { useNavigate } from "react-router-dom";
import styles from "./Button.module.css";

function BackButton() {
  const navigate = useNavigate();
  return (
    <button
      className={`${styles.btn} ${styles["back"]}`}
      type="back"
      onClick={(e) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr; Back
    </button>
  );
}

export default BackButton;
