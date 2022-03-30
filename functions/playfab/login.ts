import axios from "axios";

export async function playFabLogin(
  email: string,
  password: string,
  titleID: string
): Promise<string | null> {
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
    return req.data.data.SessionTicket;
  } catch (e) {
    return null;
  }
}
