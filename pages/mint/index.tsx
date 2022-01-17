import { MintPage } from "../../components/Mint";
import { clusterApiUrl, PublicKey } from "@solana/web3.js";
import {
  CANDY_MACHINE_ID,
  CANDY_MACHINE_PROGRAM,
  CandyMachineAccount,
  getCandyMachineState,
} from "../../functions/candy-machine";
import { useWallet } from "@solana/wallet-adapter-react";
import { useCallback, useEffect, useState } from "react";
import Wallet from "@project-serum/sol-wallet-adapter";
import { createConnectionConfig } from "@nfteyez/sol-rayz";

export default function Mint(): JSX.Element {
  const url =
    process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("mainnet-beta");

  const wallet = useWallet();

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
        } as Wallet,
        CANDY_MACHINE_ID,
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

  return (
      <MintPage candyMachine={candyMachine} />
  );
}
