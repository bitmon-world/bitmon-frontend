import { Connection, PublicKey } from "@solana/web3.js";
import { Metadata } from "@metaplex-foundation/mpl-token-metadata";

export async function getMintMetadata(
  mint: string,
  connection: Connection
): Promise<Metadata> {
  let pubKey = await Metadata.getPDA(new PublicKey(mint));
  return await Metadata.load(connection, pubKey);
}
