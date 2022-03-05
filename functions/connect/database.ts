import axios from "axios";

export async function updateDb(
  signature: string,
  collection: string,
  username: string,
  public_key: string
): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post("https://api.bitmon.io/minecraft/connect", {
        signature,
        collection,
        username,
        public_key,
      });
      if (res.data.success) resolve(true);
      reject();
    } catch (e) {
      reject();
    }
  });
}
