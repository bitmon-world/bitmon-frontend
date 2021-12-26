import Image from "next/image";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export const ConnectWalletWarning = () => {
  const modal = useWalletModal();

  return (
    <div
      className={
        "w-64 mx-auto rounded-full border-2 shadow shadow-blue bg-blue border-blue"
      }
    >
      <button
        className="py-1 px-6 text-white text-xl uppercase border-2 border-black rounded-full relative w-full"
        onClick={() => modal.setVisible(true)}
      >
        <div className="flex flex-row items-center justify-center">
          <div>
            <h1>Connect wallet</h1>
          </div>
          <div className="absolute top-0 right-0 opacity-10">
            <Image src="/icons/bitmon-icon-white.svg" height="40" width="40" />
          </div>
        </div>
      </button>
    </div>
  );
};
