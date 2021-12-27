import Image from "next/image";
import { useWallet } from "@solana/wallet-adapter-react";
import { ConnectWalletWarning } from "../../components/ConnectWalletWarning";
import { useRouter } from "next/router";

export default function Trainer(): JSX.Element {
  const router = useRouter();

  const wallet = useWallet();

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
            className="text-3xl text-light-orange"
            style={{ fontFamily: "Candal" }}
          >
            Trainer {router.query.id}
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
    </div>
  );
}