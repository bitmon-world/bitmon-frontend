import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectWalletWarning } from "../../components/ConnectWalletWarning";

export default function CreatorBuilder(): JSX.Element {
  const wallet = useWallet();

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
        {wallet.connected ? <div /> : <ConnectWalletWarning />}
      </div>
    </div>
  );
}
