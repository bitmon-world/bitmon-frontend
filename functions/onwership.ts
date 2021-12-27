import { Connection, PublicKey } from "@solana/web3.js";
import * as SPLToken from "@solana/spl-token";
import BN from "bn.js";

export async function isMintOwner(
  mint: string | string[],
  owner: PublicKey,
  connection: Connection
): Promise<boolean> {
  let data = await connection.getTokenAccountsByOwner(owner, {
    mint: new PublicKey(mint),
  });
  if (data.value.length === 0) return false;
  const mintInfo = SPLToken.AccountLayout.decode(data.value[0].account.data);
  const balance = SPLToken.u64.fromBuffer(mintInfo.amount);
  return balance.gt(new BN(0));
}
