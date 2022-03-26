import axios from "axios";
import { TrainerAttributes } from "../components/Builder/BuiltImage";
import { TRAINERS_API_URL } from "../constants";

export async function upload(
  attributes: TrainerAttributes,
  address: string,
  public_key: string,
  signature: string,
  mint: string | string[]
): Promise<{ success: boolean }> {
  try {
    const res = await axios.post(TRAINERS_API_URL + "upload", {
      attributes,
      address,
      public_key,
      signature,
      mint,
    });
    return { success: res.data.success };
  } catch (e) {
    return { success: false };
  }
}
