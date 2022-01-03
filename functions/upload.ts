import { TrainerAttributes } from "../components/Builder";
import axios from "axios";
import { Transaction } from "@solana/web3.js";

const API_URL = "https://api.bitmon.io/";

export async function upload(
  attributes: TrainerAttributes,
  address: string,
  public_key: string,
  signature: string,
  mint: string | string[]
): Promise<{ success: boolean; data?: Transaction }> {
  try {
    const res = await axios.post(API_URL, {
      attributes,
      address,
      public_key,
      signature,
      mint,
    });
    const tx = Transaction.from(Buffer.from(res.data.tx, "hex"));
    return { success: true, data: tx };
  } catch (e) {
    return { success: false };
  }
}
