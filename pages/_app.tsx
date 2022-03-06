import React, { ReactNode, useEffect, useState } from "react";
import { AppProps } from "next/app";
import { Fragment } from "react";
import Head from "next/head";
import Layout from "../layout/Main";
import ReactGA from "react-ga4";

import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import dynamic from "next/dynamic";

require("@solana/wallet-adapter-react-ui/styles.css");
import "../styles/index.css";
import initAuth from "../functions/init-auth";
import AnchorAccountCacheProvider from "../context/anchor-account-context";
import { Program, Provider } from "@project-serum/anchor";
import { useAnchorWallet, useConnection } from "@solana/wallet-adapter-react";
import { getStakingProgram } from "../functions/staking/get-program";

const WalletConnectionProvider = dynamic<{ children: ReactNode }>(
  () =>
    import("../components/WalletConnectionProvider").then(
      ({ WalletConnectionProvider }) => WalletConnectionProvider
    ),
  {
    ssr: false,
  }
);

const AccountsCacheProvidersSetup = ({ children }: { children: ReactNode }) => {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  const [nftStakingProgram, setNftStakingProgram] = useState<
    Program | undefined
  >();

  useEffect(() => {
    if (!connection) {
      return;
    }
    (async function () {
      // @ts-ignore - calling provider without wallet is used to instantiate connection
      const provider = new Provider(connection, wallet, {});
      const nftStakingProgram = await getStakingProgram(provider);
      setNftStakingProgram(nftStakingProgram);
    })();
  }, [connection, wallet]);

  if (!nftStakingProgram) {
    return <>{children}</>;
  }

  return (
    <AnchorAccountCacheProvider nftStakingProgram={nftStakingProgram}>
      {children}
    </AnchorAccountCacheProvider>
  );
};

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS) {
      ReactGA.initialize(process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS);
    }
  }, []);

  return (
    <Fragment>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
        />
        <title key="title">
          Bitmon World | Play, Breed, Trade and Fight with decentralized
          monsters
        </title>

        <meta
          key="description"
          name="description"
          content="Play, Breed, Trade and Fight with decentralized monsters"
        />

        <meta
          name="application-name"
          content="Bitmon World | Play, Breed, Trade and Fight with decentralized monsters"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
        <meta
          name="apple-mobile-web-app-title"
          content="Bitmon World | Play, Breed, Trade and Fight with decentralized monsters"
        />

        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#3E4A94" />

        <meta key="twitter:card" name="twitter:card" content="app" />
        <meta
          key="twitter:title"
          name="twitter:title"
          content="Bitmon World | Play, Breed, Trade and Fight with decentralized monsters"
        />
        <meta
          key="twitter:url"
          name="twitter:url"
          content="https://bitmon.io"
        />

        <meta
          key="twitter:description"
          name="twitter:description"
          content="Play, Breed, Trade and Fight with decentralized monsters"
        />
        <meta
          key="twitter:image"
          name="twitter:image"
          content="https://bitmon.io/ms-icon-310x310.png"
        />
        <meta
          key="twitter:creator"
          name="twitter:creator"
          content="@BitmonWorld"
        />
        <meta key="og:type" property="og:type" content="website" />
        <meta
          key="og:site_name"
          property="og:site_name"
          content="Bitmon World | Play, Breed, Trade and Fight with decentralized monsters"
        />
        <meta key="og:url" property="og:url" content="https://bitmon.io" />
        <meta
          key="og:image"
          property="og:image"
          content="https://bitmon.io/ms-icon-310x310.png"
        />
        <meta
          key="og:description"
          property="og:description"
          content="Play, Breed, Trade and Fight with decentralized monsters"
        />
      </Head>
      <WalletConnectionProvider>
        <WalletModalProvider>
          <AccountsCacheProvidersSetup>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AccountsCacheProvidersSetup>
        </WalletModalProvider>
      </WalletConnectionProvider>
    </Fragment>
  );
}

export default MyApp;
