import axios from "axios";

export async function getAddress(uid: string) {
  return new Promise(async (resolve, reject) => {
    const config = {
      headers: { Authorization: `Bearer ${process.env.AUTH_TOKEN}` },
    };
    try {
      const res = await axios.get(
        "https://api.bitmon.io/bitmon/address/" + uid,
        config
      );
      if (res.data.success) resolve(res.data.address);
      reject();
    } catch (e) {
      reject();
    }
  });
}
