/* eslint-disable @next/next/no-img-element */
import styles from "../styles/Inventory.module.css";
import React,{ useEffect, useState } from "react";

import InventoryNftCard from "../components/InventoryNftCard"
import { NFT__DATA } from "../assets/data/data";
import { Container, Row, Col } from "reactstrap";
import "bootstrap"


export default function Inventory() {
 
    return (
        <React.Fragment>
        <section className={styles.trending__title}>
          <Container>
            <Row>
  
              {NFT__DATA.slice(0, 2).map((item) => (
                <Col key={item.id} className={styles.lg3}>
                  <InventoryNftCard item={item} />
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </React.Fragment>
    );
}
