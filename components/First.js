import styles from "../styles/home.module.scss";
import Link from "next/link";
import Image from "next/image";
// import '@rainbow-me/rainbowkit/styles.css';
// import {
//     getDefaultWallets,
//     RainbowKitProvider,
//   } from '@rainbow-me/rainbowkit';
//   import { configureChains, createClient, WagmiConfig } from 'wagmi';
//   import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains';
//   import { alchemyProvider } from 'wagmi/providers/alchemy';
//   import { publicProvider } from 'wagmi/providers/public';
//   import { ConnectButton } from '@rainbow-me/rainbowkit';

//   const { chains, provider } = configureChains(
//     [mainnet, polygon, optimism, arbitrum],
//     [
//       alchemyProvider({ apiKey: process.env.ALCHEMY_ID }),
//       publicProvider()
//     ]
//   );
  
//   const { connectors } = getDefaultWallets({
//     appName: 'My RainbowKit App',
//     chains
//   });
  
//   const wagmiClient = createClient({
//     autoConnect: true,
//     connectors,
//     provider
//   })

//   const App = () => {
//     return (
//       <WagmiConfig client={wagmiClient}>
//         <RainbowKitProvider chains={chains}>
//           <YourApp />
//         </RainbowKitProvider>
//       </WagmiConfig>
//     );
//   };

export default function First() {
    return (
        <div className={styles.first}>
            {/* <div className={styles.nestDiv}> */}
                <section>
                    <h1>Mint anything to earn your $1 </h1>
                    <p>
                        A place where you can mint any file as ERC1155 nft. Now
                        you can sell the digital services you want—books,
                        audio, courses, and more—right to your audience as a digital asset.
                    </p>
                    {/* <ConnectButton /> */}
                    {/* <Link href="/store">
                        <button className={styles.btn}>Connect</button>
                    </Link> */}
                </section>
                <sidebar className={styles.sidebar}>
                <a href="https://storyset.com/online"><Image src="/uploading.svg" width={400} height={400} alt=""/></a>
                </sidebar>
            {/* </div> */}
        </div>
    );
}
