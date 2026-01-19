import styles from "./Button.module.css";

function Button({ children, onClick, type }) {
  // type prop can be either - primary | back | position
  // Whoever calls this component will pass the type prop with any of the above 3 values.
  // This is then used to select a css class. see the Button.module.css file for css style of each button.
  return (
    <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
      {/* styles[type] could be -> styles.primary | styles.back | styles.position */}
      {children}
    </button>
  );
}

export default Button;
