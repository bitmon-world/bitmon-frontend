import axios from "axios";

export async function playFabLogin(
  email: string,
  password: string,
  titleID: string
): Promise<{ token: string; id: string } | null> {
  try {
    const req = await axios.post(
      "https://" + titleID + ".playfabapi.com/Client/LoginWithEmailAddress",
      {
        Email: email,
        Password: password,
        TitleId: titleID,
      }
    );
    if (req.status !== 200) return null;
    return { token: req.data.data.SessionTicket, id: req.data.data.PlayFabId };
  } catch (e) {
    return null;
  }
}
