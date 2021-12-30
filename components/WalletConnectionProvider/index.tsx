import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  getLedgerWallet,
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getTorusWallet,
} from "@solana/wallet-adapter-wallets";
import { clusterApiUrl } from "@solana/web3.js";
import { FC, ReactNode, useMemo } from "react";

export const WalletConnectionProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const url =
    process.env.NEXT_PUBLIC_SOLANA_RPC || clusterApiUrl("mainnet-beta");

  const wallets = useMemo(
    () => [
      getPhantomWallet(),
      getSlopeWallet(),
      getSolflareWallet(),
      getTorusWallet(),
      getLedgerWallet(),
    ],
    []
  );

  return (
    <ConnectionProvider endpoint={url}>
      <WalletProvider wallets={wallets} autoConnect>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
};
