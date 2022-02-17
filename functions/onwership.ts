import { Connection, PublicKey } from "@solana/web3.js";
import * as SPLToken from "@solana/spl-token";
import BN from "bn.js";
import { PROGRAM_NFT_STAKING } from "../constants";
import { fetchTrainers } from "./fetch-trainers";

export async function isMintOwner(
  mint: string,
  owner: PublicKey,
  connection: Connection
): Promise<boolean> {
  const staked = await isMintStaked(mint, connection);
  if (staked) {
    const mints = await fetchTrainers(owner.toBase58(), connection);
    return mints.staked.map((d) => d.mint).includes(mint);
  } else {
    const data = await connection.getTokenAccountsByOwner(owner, {
      mint: new PublicKey(mint),
    });
    if (data.value.length === 0) return false;
    const mintInfo = SPLToken.AccountLayout.decode(data.value[0].account.data);
    const balance = SPLToken.u64.fromBuffer(mintInfo.amount);
    return balance.gt(new BN(0));
  }
}

export async function isMintStaked(
  mint: string | string[],
  connection: Connection
): Promise<boolean> {
  const data = await connection.getTokenAccountsByOwner(PROGRAM_NFT_STAKING, {
    mint: new PublicKey(mint),
  });
  if (data.value.length === 0) return false;
  const mintInfo = SPLToken.AccountLayout.decode(data.value[0].account.data);
  const balance = SPLToken.u64.fromBuffer(mintInfo.amount);
  return balance.gt(new BN(0));
}
