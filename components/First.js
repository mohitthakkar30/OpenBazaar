import styles from "../styles/home.module.scss";
import Link from "next/link";
import Image from "next/image";
import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
  Theme,
} from "@rainbow-me/rainbowkit";
import merge from "lodash.merge";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import React, { useEffect, useState } from "react";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});
const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: "#0a0a0a",
  },
});
export default function First() {
  const router = useRouter();
  const { address, isConnecting, isDisconnected } = useAccount();

  useEffect(() => {
    console.log("useeffect===============>");
    if (address) {
      // router.push("/dashboard");
    }
    // else (isDisconnected) {
    //   router.push("/");
    // }
  }, [address]);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        <div className={styles.first}>
          {/* <div className={styles.nestDiv}> */}
          <section>
            <h1 class="linear-wipe">OPENBAZZAR</h1>
            <p>
            OpenBazaar is a decentralized, peer-to-peer marketplace that enables users to buy and 
            sell goods and services directly with one another without the need for intermediaries 
            or fees.
            </p>
            <div
              className={styles.btn}
              onClick={() => {
                router.push("/");
              }}
            >
              <ConnectButton />
            </div>
          </section>
          <sidebar className={styles.sidebar}>
            <Image src="/uploading.svg" width={400} height={400} alt="" />
          </sidebar>
          {/* </div> */}
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
