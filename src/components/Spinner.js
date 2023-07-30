import styles from "@/styles/Spinner.module.css";

const Spinner = () => {
  return (
    <div>
      <div className={styles["loading-spinner"]}></div>
    </div>
  );
};

export default Spinner;
