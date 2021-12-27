import Image from "next/image";
import { ButtonBlue } from "../components/Button";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CANDY_MACHINE_ID,
  CandyMachineAccount,
  getCandyMachineState,
  mintOneToken,
} from "../functions/candy-machine";
import { useWallet } from "@solana/wallet-adapter-react";
import { createConnectionConfig } from "@nfteyez/sol-rayz";
import { clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import Wallet from "@project-serum/sol-wallet-adapter";
import { Loader, LoaderSmall } from "../components/Loader";

export default function Home(): JSX.Element {
  const wallet = useWallet();
  const connect = createConnectionConfig(clusterApiUrl("mainnet-beta"));

  const anchorWallet = useMemo(() => {
    if (
      !wallet ||
      !wallet.publicKey ||
      !wallet.signAllTransactions ||
      !wallet.signTransaction
    ) {
      return;
    }

    return {
      publicKey: wallet.publicKey,
      signAllTransactions: wallet.signAllTransactions,
      signTransaction: wallet.signTransaction,
    } as Wallet;
  }, [wallet]);

  const [state, setState] = useState<CandyMachineAccount | null>(null);

  const fetch_state = useCallback(async () => {
    const data = await getCandyMachineState(
      anchorWallet,
      CANDY_MACHINE_ID,
      connect
    );
    setState(data);
  }, []);

  useEffect(() => {
    fetch_state();
  }, []);

  const [minting, setMinting] = useState(false);

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
            Start now
          </h1>
          <h1 className="text-2xl" style={{ fontFamily: "Candal" }}>
            Enter the Bitmon World
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
      <div className="text-center mt-10 justify-center">
        <Image
          className="rounded-lg"
          src="/img/unknown-trainer.png"
          width="250"
          height="250"
          alt="Bitmon Unknown Trainer"
        />
        <h1 className="text-xl mt-6">
          Start your journey minting a Bitmon Trainer!
        </h1>
        <p className="text-md mt-2">
          Bitmon trainers can be customized and the first generation will
          receive a ticket to mint the first Bitmons.
        </p>
        {state ? (
          <>
            <h1 className="text-lg mt-4">
              Public Mint Price:{" "}
              {state.state.price.toNumber() / LAMPORTS_PER_SOL}
            </h1>
            <h1 className="text-lg mt-4">
              Whitelist Mint Price:{" "}
              {state.state.whitelistMintSettings.discountPrice.toNumber() /
                LAMPORTS_PER_SOL}
            </h1>
            <h1 className="text-lg mt-4">
              {state.state.itemsRedeemed} / 10000 Trainers Minted
            </h1>
          </>
        ) : (
          <Loader />
        )}

        <div className="mt-5">
          {minting ? (
            <LoaderSmall />
          ) : (
            <ButtonBlue
              text={"Mint"}
              onClick={async () => {
                setMinting(true);
                await mintOneToken(state, wallet.publicKey);
                setMinting(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
