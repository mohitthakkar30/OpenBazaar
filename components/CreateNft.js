import { ethers } from "ethers";
const ipfsClient = require("ipfs-http-client");
import { useRouter } from "next/router";
import { useState } from "react";
import web3modal from "web3modal";
import styles from "../styles/dashboard.module.scss";
import { contractAddress } from "../address.js";
import OpenBazaar from "../OpenBazaar.json";
import { Controller, useForm } from 'react-hook-form';
import {
  Center,
  FormLabel,
  FormControl,
  Input,
  Button,
  Container,
  HStack,
  InputGroup,
  InputRightAddon,
  Select,
  Textarea,
  Flex,
  Text,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
// import { MdCloudUpload } from 'react-icons/md';


export default function CreateNft() {
    const [form, setForm] = useState(false);
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
    const ipfsGateway = "https://collab-nft.infura-ipfs.io/ipfs/"

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
            OpenBazaar,
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


    return (
        <>
            <div className={styles.container}>
                <div className={styles.CreateNft}>
                    <form>
                    <container  maxW='full' pb='1.2rem' display='flex' 
                      alignItems={'start'} justifyContent='space-between'flexDir={'column'} gap='1rem' styles={{}}>
                       <FormControl isRequired>
                        <FormLabel>Item Name</FormLabel>
                        <Input placeholder='Item Name' name="name" _placeholder={{ color: 'inherit' }}

                            required
                            onChange={(e) =>
                                setFormInput({
                                    ...formInput,
                                    name: e.target.value,
                                })
                            } />
                        </FormControl>
                       
                        {/* <label>Item Name</label>
                        <input
                            name="name"
                            required
                            onChange={(e) =>
                                setFormInput({
                                    ...formInput,
                                    name: e.target.value,
                                })
                            }
                        /> */}
                        <label>Price</label>
                        <input
                            name="price"
                            placeholder="Matic"
                            required
                            onChange={(e) =>
                                setFormInput({
                                    ...formInput,
                                    price: e.target.value,
                                })
                            }
                        />
                        <label>Copies</label>
                        <input
                            name="supply"
                            placeholder="10"
                            required
                            onChange={(e) =>
                                setFormInput({
                                    ...formInput,
                                    supply: e.target.value,
                                })
                            }
                        />
                        <label>Cover image</label>
                        <input
                            type="file"
                            name="cover"
                            required
                            onChange={handleFile}
                        />
                        <label>Upload file</label>
                        <input
                            type="file"
                            name="file"
                            required
                            h='8rem'
                            opacity={'0'}
                            display={'flex'}
                            alignItems='center'
                            justifyContent={'center'}
                            background={'blackAlpha.200'}
                            onChange={handleFile}
                        />
                        <input
                            type="submit"
                            className={styles.submitbtn}
                            value="Mint"
                            onClick={uploadToIpfs}
                        />
                         <input
                            type="submit"
                            className={styles.submitbtn}
                            value="Cancel"
                            onClick={() => false}
                        />
                        </container>
                    </form>

                </div>
            </div>
        </>
    );
}