import { TrainerAttributes } from "../components/Builder";
import axios from "axios";

const API_URL = "http://localhost:8080";

export async function upload(
  attributes: TrainerAttributes,
  public_key: string,
  address: string,
  token: string,
  signature: string
) {
  return axios.post(API_URL, {
    attributes,
    public_key,
    address,
    token,
    signature,
  });
}
