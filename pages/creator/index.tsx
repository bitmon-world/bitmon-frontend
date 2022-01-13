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
import { BITMON_UPDATE_AUTHORITY } from "../../constants";
import { TrainerImage } from "../../components/TrainerImage";

export default function Creator(): JSX.Element {
  const url =
    process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("mainnet-beta");
  const connect = createConnectionConfig(url);

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

    const bitmon_tokens = tokensList.filter(
      (t) =>
        t.updateAuthority.toLowerCase() ===
        BITMON_UPDATE_AUTHORITY.toLowerCase()
    );
    setTokens(bitmon_tokens);
    setLoading(false);
  }, [wallet, connect, getParsedNftAccountsByOwner]);

  useEffect(() => {
    if (!wallet || !wallet.connected || !wallet.publicKey) return;
    fetch_tokens();
  }, [wallet]);

  return (
    <div className="relative z-10 mx-4 h-full pb-10">
      <div className="pt-14 text-center flex flex-row justify-center items-center gap-x-10">
        <div className="hidden md:inline-flex ml-10">
          <Image
            src="/img/separator-right.svg"
            width="250"
            height="17"
            alt="Bitmon Separator"
          />
        </div>
        <div>
          <Image
            src="/img/trainer-creator.png"
            width="200"
            height="85"
            alt="Bitmon Separator"
          />
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
      <div className="mt-6">
        {wallet.connected ? (
          loading ? (
            <Loader />
          ) : tokens.length > 0 ? (
            <div className="text-center">
              <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[58px] mx-auto">
                <p className="top-0 text-xl text-white">
                  Select a Bitmon <span className="text-orange">trainer</span>{" "}
                  to start
                </p>
              </div>
              <div className="z-10 mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-3/4 mx-auto">
                {tokens.map((t) => {
                  return (
                    <TrainerImage
                      link
                      key={t.mint}
                      uri={t.data.uri}
                      mint={t.mint}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[58px] mx-auto">
              <p className="top-0 text-xl text-white">
                No Bitmon trainers found.
              </p>
            </div>
          )
        ) : (
          <ConnectWalletWarning />
        )}
      </div>
    </div>
  );
}
