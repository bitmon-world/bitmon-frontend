import Image from "next/image";
import {
  getParsedNftAccountsByOwner,
  createConnectionConfig,
} from "@nfteyez/sol-rayz";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { useCallback, useEffect, useState } from "react";
import { Loader } from "../../components/Loader";
import { ConnectWalletWarning } from "../../components/ConnectWalletWarning";
import { BITMON_DAO_ADDRESS } from "../../constants";
import { TrainerImage } from "../../components/TrainerImage";

export default function Creator(): JSX.Element {
  const connect = createConnectionConfig(clusterApiUrl("mainnet-beta"));
  const wallet = useWallet();

  const [loading, setLoading] = useState(true);

  const [tokens, setTokens] = useState([]);

  const fetch_tokens = useCallback(async () => {
    setLoading(true);
    // Fetch tokens from phantom wallet
    const tokensList = await getParsedNftAccountsByOwner({
      publicAddress: wallet.publicKey.toString(),
      connection: connect,
    });

    // Parse tokens based on the token creator
    const bitmon_tokens = tokensList.filter(
      (t) =>
        t.data.creators
          .map((c) => c.address.toLowerCase())
          .indexOf(BITMON_DAO_ADDRESS.toLowerCase()) !== -1
    );
    setTokens(bitmon_tokens);
    setLoading(false);
  }, [wallet, connect, getParsedNftAccountsByOwner]);

  useEffect(() => {
    if (!wallet || !wallet.connected || !wallet.ready || !wallet.publicKey)
      return;
    fetch_tokens();
  }, [wallet]);

  return (
    <div className="relative z-10 mx-4">
      <div className="pt-16 text-center flex flex-row justify-center items-center gap-x-10">
        <div className="hidden md:inline-flex ml-10">
          <Image
            src="/img/separator-right.svg"
            width="250"
            height="17"
            alt="Bitmon Separator"
          />
        </div>
        <div>
          <h1
            className="text-5xl text-light-orange"
            style={{ fontFamily: "Candal" }}
          >
            Creator
          </h1>
          <h1 className="text-2xl" style={{ fontFamily: "Candal" }}>
            Customize your Bitmon trainer
          </h1>
        </div>
        <div className="hidden md:inline-flex mr-10">
          <Image
            src="/img/separator-left.svg"
            width="250"
            height="17"
            alt="Bitmon Separator"
          />
        </div>
      </div>
      <div className="mt-20">
        {wallet.connected ? (
          loading ? (
            <Loader />
          ) : tokens.length > 0 ? (
            <div className="text-center -mt-10">
              <h1 className="text-xl">Select a Bitmon Trainer to start</h1>
              <div className="z-10 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-3/4 mx-auto">
                {tokens.map((t) => {
                  return (
                    <TrainerImage key={t.mint} uri={t.data.uri} mint={t.mint} />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h1 className="text-xl">No Bitmon trainers found.</h1>
            </div>
          )
        ) : (
          <ConnectWalletWarning />
        )}
      </div>
    </div>
  );
}
