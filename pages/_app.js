import Navbar from '../components/Navbar'
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';


function MyApp({ Component, pageProps }) {
  return (
    <>
    <Navbar />
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
