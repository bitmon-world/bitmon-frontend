import Image from "next/image";
import { createConnectionConfig } from "@nfteyez/sol-rayz";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";

export default function Bit(): JSX.Element {
  const url =
    process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("mainnet-beta");
  const connect = createConnectionConfig(url);

  const wallet = useWallet();

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
          <h1 className="text-4xl uppercase">Converter</h1>
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
        <div className="flex flex-row items-center justify-center bg-contain bg-no-repeat bg-center bg-title-background h-[58px] mx-auto">
          <p className="top-0 text-xl text-white">
            Convert your <span className="text-orange">$BIT</span> to in-game
            coin
          </p>
        </div>
      </div>
    </div>
  );
}
