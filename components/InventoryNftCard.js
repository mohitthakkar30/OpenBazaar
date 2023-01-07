/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import styles from "../styles/InventoryNFTCard.module.scss"

// import { Link } from "react-router-dom";

// import "../styles/NFTCard.module.css";

import Modal from "../components/Modal";

const InventoryNftCard = (props) => {
  const { title, id, currentBid, creatorImg, imgUrl, creator } = props.item;

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles.single__nft__card}>
      <div className="nft__img">
        <img src={imgUrl.src} alt="" className={styles.image} />
      </div>

      <div className="nft__content">
        <h5 className={styles.nft__title}>
          {title}
        </h5>

        <div className={styles.creatorwrapper}>
          <div className="creator__img">
            <img src={creatorImg.src} alt="" className={styles.Creator}/>
          </div>

          <div className={styles.creatorinfo}>
            <div>
              <h6>Created By</h6>
              <p>{creator}</p>
            </div>

            <div>
              <h6>Current Bid</h6>
              <p>{currentBid} ETH</p>
            </div>
          </div>
        </div>

        <div className={styles.placebid}>
          <button
            className={styles.placebidbtn}
            onClick={() => setShowModal(true)}
          >Place Bid
          </button>

          {showModal && <Modal setShowModal={setShowModal} />}

          <span className="history__link">
            {/* <link to="#">View History</link> */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InventoryNftCard;