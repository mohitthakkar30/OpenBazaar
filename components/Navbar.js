import styles from "../styles/navbar.module.scss";
import Image from "next/image";
import Link from "next/link";
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
export default function Navbar() {
  const router = useRouter();
  const currentRoute = router.pathname;
  const { address, isConnecting, isDisconnected } = useAccount();

  // useEffect(() => {
  //   console.log("useeffect===============>");
  //   if (address) {
  //     router.push("/publish");
  //     localStorage.clear();
  //   }
  // }, [address]);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={myTheme}>
        <div className={styles.nav}>
          <div className={styles.logo}>
            <Image src="/logo.png" width={150} height={150} alt="" />
          </div>
            <Link href="/store">
              <a className={currentRoute === "/store" ? styles.active : ""} style={{marginLeft:"40%"}} >
                <h3 className={styles.col}>Store</h3>
              </a>
            </Link>
            <Link href="/publish">
              <a className={currentRoute === "/publish" ? styles.active : ""}>
                <h3 className={styles.col}>Dashboard</h3>
              </a>
            </Link>
          <div>
            <div
              className={styles.btn}
              onClick={() => {
                router.push("/");
              }}
            >
              <ConnectButton />
            </div>
          </div>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

