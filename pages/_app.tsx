// import "../styles/globals.css";
import type { AppProps } from "next/app";
import "../styles/app.sass";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";
import MetamaskProvider from "../components/wallet/provider";
import Layout from "../components/layout";
import Auth from "../components/auth";

function getLibrary(provider: any) {
  return new Web3(provider);
}

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      {/* <MetamaskProvider> */}
      {/* <Auth> */}
      <Layout>
        <Component {...pageProps} />
        {/* </MetamaskProvider> */}
      </Layout>
      {/* </Auth> */}
    </Web3ReactProvider>
  );
}

export default MyApp;
