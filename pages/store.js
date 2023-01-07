import styles from "../styles/store.module.css";
import React,{ useEffect, useState } from "react";

import NftCard from "../components/NftCard"
import { NFT__DATA } from "../assets/data/data";
import { Container, Row, Col } from "reactstrap";
import "bootstrap"



export default function Store() {
  return (
    <React.Fragment>
      <section className={styles.trending__title}>
        <Container>
          <Row>

            {NFT__DATA.slice(0, 8).map((item) => (
              <Col key={item.id} className={styles.lg3}>
                <NftCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
}