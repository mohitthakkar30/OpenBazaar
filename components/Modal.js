import React from "react";

import styles from "../styles/modal.module.css";

const Modal = ({ setShowModal }) => {
  return (
    <div className={styles.modalwrapper}>
      <div className={styles.singlemodal}>
        <span className={styles.closemodal}>
          <i className="ri-close-line" onClick={() => setShowModal(false)}></i>
        </span>
        <h6>Place a Bid</h6>
        <p>
          You must bid at least <span className={styles.money}>5.89 ETH</span>
        </p>

        <div className={styles.inputitem}>
          <input type="number" placeholder="00 : 00 ETH" />
        </div>

        <div className={styles.inputitem}>
          <h6>Enter Quantity, 7 available</h6>
          <input type="number" placeholder="Enter quantity" />
        </div>

        <div className={styles.text}>
          <p>You must bid at least</p>
          <span className={styles.money}>&nbsp;5.89 ETH</span>
        </div>

        <div className={styles.text}>
          <p>Service Fee </p>
          <span className={styles.money}>&nbsp;0.89 ETH</span>
        </div>

        <div className={styles.text}>
          <p>Total Bid Amount</p>
          <span className={styles.money}>&nbsp;5.89 ETH</span>
        </div>

        <button className={styles.placebidbtn}>Place a Bid</button>
      </div>
    </div>
  );
};

export default Modal;