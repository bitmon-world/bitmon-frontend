import { Connection } from "@solana/web3.js";
import axios from "axios";
import { API_URL } from "../constants";
import { getMintMetadata } from "./metadata";
import { MetadataData } from "@metaplex-foundation/mpl-token-metadata";

export async function fetchTrainers(
  address: string,
  connect: Connection
): Promise<MetadataData[]> {
  const res = await axios.get(API_URL + "/mints/" + address);
  const mints = []
    .concat(res.data.mints.staked)
    .concat(res.data.mints.unstaked);
  const metadata = await Promise.all(
    mints.map((d) => getMintMetadata(d, connect))
  );
  return metadata.map((d) => d.data);
}
