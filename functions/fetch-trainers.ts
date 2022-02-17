import { Connection } from "@solana/web3.js";
import axios from "axios";
import { API_URL } from "../constants";
import { getMintMetadata } from "./metadata";
import { MetadataData } from "@metaplex-foundation/mpl-token-metadata";
import { chunk } from "lodash";

export async function fetchTrainers(
  address: string,
  connect: Connection
): Promise<MetadataData[]> {
  const res = await axios.get(API_URL + "/mints/" + address);
  const mints = []
    .concat(res.data.mints.staked)
    .concat(res.data.mints.unstaked);
  const chunks = chunk(mints, 25);
  let metadata = [];

  for (let i = 0; i < chunks.length; i++) {
    const data = await Promise.all(
      chunks[i].map((d) => getMintMetadata(d, connect))
    );
    metadata = metadata.concat(data.map((d) => d.data));
  }

  return metadata;
}
