import { TrainerAttributes } from "../components/Builder";
import axios from "axios";

const API_URL = "https://api.bitmon.io";

export async function upload(
  attributes: TrainerAttributes,
  address: string,
  public_key: string,
  signature: string,
  mint: string | string[]
) {
  await axios.post(API_URL, {
    attributes,
    address,
    public_key,
    signature,
    mint,
  });
}
