import Image from "next/image";
import { clusterApiUrl } from "@solana/web3.js";
import {
  CandyMachineAccount,
  getCandyMachineState,
  mintOneToken,
} from "../../functions/candy-machine";
import { useWallet } from "@solana/wallet-adapter-react";
import { createConnectionConfig } from "@nfteyez/sol-rayz";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Loader, LoaderSmall } from "../../components/Loader";
import { ButtonBlue, ButtonBlueDisabled } from "../../components/Button";
import * as anchor from "@project-serum/anchor";

export default function Mint(): JSX.Element {
  const wallet = useWallet();

  const url =
    process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("mainnet-beta");

  const connect = createConnectionConfig(url);

  const [candyMachine, setCandyMachine] = useState<CandyMachineAccount | null>(
    null
  );

  const fetch_state = useCallback(
    async (wallet) => {
      const data = await getCandyMachineState(
        {
          publicKey: wallet.publicKey,
          signAllTransactions: wallet.signAllTransactions,
          signTransaction: wallet.signTransaction,
        } as anchor.Wallet,
        new anchor.web3.PublicKey(
          "4nnueiRRS8tDhfdhomRBuebqgkJnr2yXZaRMfxXqKtek"
        ),
        connect
      );

      setCandyMachine(data);
    },
    [wallet]
  );

  useEffect(() => {
    if (!wallet.connected) return;
    fetch_state(wallet);
  }, [wallet]);

  const [minting, setMinting] = useState(false);

  return (
    <div className="relative z-10 mx-4 h-full pb-10">
      <div className="pt-8 text-center flex flex-row justify-center items-center gap-x-10">
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
        <h1 className="text-xl mt-6">
          Start your journey minting your Bitmon!
        </h1>
        {candyMachine ? (
          <>
            <h1 className="text-lg">
              {candyMachine.state.itemsRedeemed} / 8337 Bitmons Minted
            </h1>
          </>
        ) : (
          <div className="mt-4">
            <Loader />
          </div>
        )}

        <div className="mt-5 mx-auto">
          {!wallet ||
          !wallet.connected ||
          !wallet.publicKey ||
          !candyMachine ||
          !candyMachine.program.provider.wallet ? (
            <ButtonBlueDisabled text={"Connect wallet"} />
          ) : minting ? (
            <LoaderSmall />
          ) : (
            <ButtonBlue
              text={"Mint"}
              onClick={async () => {
                setMinting(true);
                await mintOneToken(candyMachine, wallet.publicKey);
                setMinting(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
