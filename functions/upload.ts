import { TrainerAttributes } from "../components/Builder";
import axios from "axios";

const API_URL = "http://localhost:8080";

export async function upload(
  attributes: TrainerAttributes,
  address: string,
  public_key: string,
  signature: string,
  mint: string | string[]
): Promise<boolean> {
  try {
    const res = await axios.post(API_URL, {
      attributes,
      address,
      public_key,
      signature,
      mint,
    });
    return res.data.success;
  } catch (e) {
    return false;
  }
}
