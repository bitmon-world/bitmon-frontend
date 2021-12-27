import Image from "next/image";
import Link from "next/link";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectWalletWarning } from "../../components/ConnectWalletWarning";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { getMintMetadata } from "../../functions/metadata";
import { createConnectionConfig } from "@nfteyez/sol-rayz";
import { clusterApiUrl } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
import { Loader } from "../../components/Loader";
import { TrainerImage } from "../../components/TrainerImage";
export default function CreatorBuilder(): JSX.Element {
  const connect = createConnectionConfig(clusterApiUrl("mainnet-beta"));

  const router = useRouter();

  const wallet = useWallet();

  const [metadata, setMetadata] = useState<Metadata | null>(null);

  const fetch_metadata = useCallback(async (id: string | string[]) => {
    const data = await getMintMetadata(id, connect);
    console.log(data);
    setMetadata(data);
  }, []);

  useEffect(() => {
    if (!router.query.id) return;
    fetch_metadata(router.query.id);
  }, [router]);

  return (
    <div className="relative z-10 mx-4 h-full pb-10">
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
      <div className="mt-8">
        {wallet.connected ? (
          metadata ? (
            <div className="text-center">
              <div>
                <h1 className="text-xl">{metadata.data.data.name}</h1>
              </div>
              <div className="mx-auto w-[325px] h-[325px] mt-6">
                <TrainerImage
                  link={false}
                  uri={metadata.data.data.uri}
                  mint={metadata.data.mint}
                />
              </div>
            </div>
          ) : (
            <Loader />
          )
        ) : (
          <ConnectWalletWarning />
        )}
      </div>
    </div>
  );
}
