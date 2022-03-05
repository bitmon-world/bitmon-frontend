import axios from "axios";
import { getApp } from "@firebase/app";
import { getAuth } from "@firebase/auth";

export async function updateFb(
  uid: string,
  signature: string,
  public_key: string
): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    const token = await getAuth(getApp()).currentUser.getIdToken(true);
    try {
      const res = await axios.post("https://api.bitmon.io/bitmon/connect", {
        signature,
        public_key,
        uid,
        token,
      });
      if (res.data.success) resolve(true);
      reject();
    } catch (e) {
      reject();
    }
  });
}
