import Dashboard from "../components/Dashboard";
import styles from "../styles/dashboard.module.scss";
import { useEffect, useState } from "react";
import web3modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { contractAddress } from "../address.js";
import { saveAs } from "file-saver";
import OpenBazaar from "../artifacts/contracts/OpenBazaar.sol/OpenBazaar.json";
import file from "@babel/core/lib/transformation/file/file";


export default function Inventory() {

    const [myItems, setMyItems] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        myAssets();
    }, []);
    async function myAssets() {
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
        const data = await contract.getInventory();
        const items = await Promise.all(
            data.map(async (i) => {
                const tokenUri = await contract.uri(i.tokenId.toString());
                const meta = await axios.get(tokenUri);
                let price = ethers.utils.formatEther(i.price);
                let item = {
                    price,
                    name: meta.data.name,
                    tokenId: i.tokenId.toNumber(),
                    creator: i.creator,
                    supplyL: i.supplyleft.toNumber(),
                    cover: meta.data.cover,
                    file: meta.data.file,
                };
                return item;
            })
        );
        setMyItems(items);
        setLoaded(true);
    }
    async function Download(_fileName, _fileUrl) {
        const name = _fileName;
        const fileUrl = _fileUrl;
        saveAs(fileUrl, name);
    }
    function Card(prop) {
        return (
            <div className={styles.card}>
                <div className={styles.imgDiv}>
                    <img src={prop.cover} alt="" />
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
                <div className={styles.buyDiv} onClick={() => Download(prop.name, prop.file)}>
                    <p>Download</p>
                </div>
            </div>
        );
    }

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
