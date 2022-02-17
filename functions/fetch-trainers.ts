import { Connection } from "@solana/web3.js";
import axios from "axios";
import { API_URL } from "../constants";
import { getMintMetadata } from "./metadata";
import { MetadataData } from "@metaplex-foundation/mpl-token-metadata";
import { chunk } from "lodash";

export async function fetchTrainers(
  address: string,
  connect: Connection
): Promise<{ staked: MetadataData[]; unstaked: MetadataData[] }> {
  const res = await axios.get(API_URL + "/mints/" + address);
  return {
    staked: await fetchMetadata(res.data.mints.staked, connect),
    unstaked: await fetchMetadata(res.data.mints.unstaked, connect),
  };
}

async function fetchMetadata(
  mints: string[],
  connect: Connection
): Promise<MetadataData[]> {
  const chunks = chunk(mints, 25);
  let metadata = [];
  for (let i = 0; i < chunks.length; i++) {
    const promises = chunks[i].map((d) => getMintMetadata(d, connect));
    const data = await Promise.all(promises);
    metadata = metadata.concat(data.map((d) => d.data));
  }
  return metadata;
}
