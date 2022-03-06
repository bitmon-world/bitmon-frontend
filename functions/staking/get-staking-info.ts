import axios from "axios";

export async function getStakingInfo(): Promise<{
  users_staking: number;
  trainers_staked: number;
  tvl: number;
}> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get("https://api.bitmon.io/trainers/staked");
      console.log(res);
      if (res.data.success)
        resolve({
          users_staking: res.data.users_staking,
          trainers_staked: res.data.trainers_staked,
          tvl: (await getTrainersFloorPrice()) * res.data.trainers_staked,
        });
      reject();
    } catch (e) {
      reject();
    }
  });
}

export async function getTrainersFloorPrice(): Promise<number> {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.get(
        "https://api-mainnet.magiceden.dev/v2/collections/bitmon_adventures/stats"
      );
      resolve(res.data.floorPrice / 1e9);
    } catch (e) {
      reject();
    }
  });
}
