import axios from "axios";

export async function getPlayFabUserAddress(
  token: string,
  titleID: string,
  userID: string
): Promise<string | null> {
  try {
    const req = await axios.post(
      "https://" + titleID + ".playfabapi.com/Server/GetUserReadOnlyData",
      {
        PlayFabId: userID,
        Keys: ["address"],
      },
      {
        headers: {
          "X-SecretKey": token,
        },
      }
    );
    if (!req.data.data.Data.address) return null;
    return req.data.data.Data.address.Value;
  } catch (e) {
    return null;
  }
}

export async function setPlayFabUserAddress(
  token: string,
  titleID: string,
  userID: string,
  address: string
): Promise<boolean> {
  try {
    const req = await axios.post(
      "https://" + titleID + ".playfabapi.com/Server/UpdateUserReadOnlyData",
      {
        PlayFabId: userID,
        Data: { address: address },
      },
      {
        headers: {
          "X-SecretKey": token,
        },
      }
    );
    return req.status === 200;
  } catch (e) {
    return false;
  }
}
