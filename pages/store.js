import styles from "../styles/store.module.css";
import React,{ useEffect, useState } from "react";
import NftCard from "../components/NftCard"
import { NFT__DATA } from "../assets/data/data";
import { Container, Row, Col } from "reactstrap";
import web3modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { contractAddress } from "../address.js";

import OpenBazaar from "../artifacts/contracts/OpenBazaar.sol/OpenBazaar.json";
import Navbar from "../components/Navbar";


export default function Store() {
  const [items, setItems] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
      load();
  }, []);

  async function load() {
      const modal = new web3modal();
      const connection = await modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const contract = new ethers.Contract(
          contractAddress,
          OpenBazaar.abi,
          provider
      );
      const data = await contract.getStore();
      const items = await Promise.all(
          data.map(async (i) => {
              //when the array of promises is resolved then map over each promise
              const tokenUri = await contract.uri(i.tokenId.toString());
              const meta = await axios.get(tokenUri);
              let price = ethers.utils.formatEther(i.price);
              let item = {
                  price,
                  name: meta.data.name,
                  tokenId: i.tokenId.toNumber(),
                  supplyL: i.supplyleft.toNumber(),
                  cover: meta.data.cover,
              };
              return item;
          })
          );
          
          console.log(items);
          setItems(items);
      setLoaded(true);
  }

  async function buyDigitalAsset(item) {
      const modal = new web3modal({
          network: "mumbai",
          cacheProvider: true,
      });
      const connection = await modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
          contractAddress,
          OpenBazaar.abi,
          signer
      );
      const price = ethers.utils.parseUnits(item.price.toString(), "ether");
      const transaction = await contract.buyDigitalAsset(item.tokenId, {
          value: price,
          gasLimit: 1000000,
      });
      await transaction.wait();
      load();
  }

  function Card(prop) {
      return (
          <div className={styles.card}>
              <div className={styles.imgDiv}>
                  <img src={prop.img} alt="" />
              </div>
              <div className={styles.detailsDiv}>
                  <div className={styles.nestedDiv}>
                      <p>Name: &nbsp;{prop.name}</p>
                      <p>Remaining: &nbsp;{prop.supplyL}</p>
                  </div>
                  <div className={styles.nestedDiv}>
                      <p>Price: &nbsp;{prop.price} Matic</p>
                      <p>Token Id: &nbsp;{prop.tokenId}</p>
                  </div>
              </div>
              <div className={styles.buyDiv} onClick={() => buyDigitalAsset(prop)}>
                  <p>Buy Digital Assets Here</p>
              </div>
          </div>
      );
  }

  if (loaded == true && !items.length)
      return (
          <div className={styles.store}>
              <div className={styles.noItem}>
                  <h1>No items in marketplace :/</h1>
              </div>
          </div>
      );
  return (
    <React.Fragment>
        <Navbar/>
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