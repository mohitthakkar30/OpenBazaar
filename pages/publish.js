import { ethers } from "ethers";
const ipfsClient = require("ipfs-http-client");
import { useRouter } from "next/router";
import { useState } from "react";
import web3modal from "web3modal";
import Dashboard from "../components/Dashboard";
import styles from "../styles/dashboard.module.scss";
import { contractAddress } from "../address.js";
import OpenBazaar from "../artifacts/contracts/OpenBazaar.sol/OpenBazaar.json";
import Listing from "./listings"
import Inventory from "./inventory";
import React, { useContext } from 'react';
import {
    Button,
    Center,
    Container,
    Text,
    VStack,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
  } from '@chakra-ui/react';
  import 'bootstrap/dist/css/bootstrap.min.css'
  import { Alert } from '@coreui/bootstrap-react';
  import { CContainer, CRow, CCol } from '@coreui/bootstrap-react'
  import CreateNft from "../components/CreateNft"
  import pkg from 'framesync';




export default function Publish() {
    const { cancelSync, getFrameData } = pkg;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [formInput, setFormInput] = useState({
        name: "",
        price: "",
        supply: "",
        cover: null,
        file: null,
    });

    
    // ------- infura ipfs

    const projectId = process.env.NEXT_PUBLIC_projectId
    const projectSecret = process.env.NEXT_PUBLIC_projectSecret
    const ipfsGateway = "https://anshs-gum3road.infura-ipfs.io/ipfs/"

    const auth =
        "Basic " +
        Buffer.from(projectId + ":" + projectSecret).toString("base64");

    const client = ipfsClient.create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
            authorization: auth,
        },
    });

    // -------

    const router = useRouter();

    async function handleFile(e) {
        const file = e.target.files[0];
        const name = e.target.name;
        try {
            const added = await client.add(file);
            const url = `${ipfsGateway}${added.path}`;
            setFormInput({ ...formInput, [name]: url });
            console.log(url);
        } catch (error) {
            console.log("Error uploading:", error);
        }
    }

    async function metadata() {
        const { name, price, cover, file } = formInput;
        if (!name || !price || !cover || !file) return;
        const data = JSON.stringify({ name, cover, file });
        try {
            const added = await client.add(data);
            const metaUrl = `${ipfsGateway}${added.path}`;
            return metaUrl;
        } catch (error) {
            console.log("Error uploading:", error);
        }
    }

    async function uploadToIpfs(e) {
        e.preventDefault();
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
        const url = await metadata();
        const price = ethers.utils.parseEther(formInput.price);
        const supply = formInput.supply;
        const publish = await contract.createToken(url, supply, price, {
            gasLimit: 1000000,
        });
        await publish.wait();

        console.log(url);

        router.push("/store");
    }

    function redirect(){
        router.push("/store");
    }


    return (
        <>
            <div className={styles.container}> 
                <div className={styles.publish}>
                    <CContainer>
                        <CRow className={styles.row}>
                        <CCol><h3 style={{color:"black"}}>Created NFTs</h3></CCol>
                        <div className={styles.vertical}></div>
                        <CCol><h3 style={{color:"black"}}>Bought NFTs</h3></CCol>
                        </CRow>
                        <CRow className={styles.row}>
                        <CCol><Listing/>
                        <Container className={styles.modal} py='6rem' pr='10rem' maxW='full'>
                                <Modal size={'3xl'} isOpen={isOpen} onClose={onClose}>
                                    <ModalOverlay />
                                    <ModalContent rounded='3xl'>
                                        <ModalHeader color='black'>Create NFT</ModalHeader>
                                        <ModalCloseButton color='black' />
                                        <ModalBody>
                                            <CreateNft />
                                        </ModalBody>
                                    </ModalContent>
                                </Modal>
                                    <Center gap='2rem' flexDir={'column'} mx={'auto'}>
                                        <Button type="button" class="btn btn-primary" onClick={onOpen}>Create NFT</Button>
                                    </Center>
                            </Container>
                            </CCol>
                            <div className={styles.vertical}></div>
                            <CCol><Inventory/>
                            <Center gap='2rem' flexDir={'column'} mx={'auto'} mt='25%'>
                                        <Button type="button" style={{width:'17%'}} class="btn btn-primary" onClick={redirect}>Store</Button>
                                    </Center>
                            </CCol>
                            </CRow>
                    </CContainer>

                </div>
            </div>
        </>);
}
