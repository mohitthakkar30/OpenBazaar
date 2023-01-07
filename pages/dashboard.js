import styles from "../styles/dashboard.module.scss";
import Navbar from "../components/Navbar";
import React from "react";
export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className={styles.dashboard}>
      </div>
    </>
  );
}
