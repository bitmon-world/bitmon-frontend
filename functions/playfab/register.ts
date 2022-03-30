import axios from "axios";

async function register(
  email: string,
  password: string,
  titleID: string
): Promise<string | null> {
  try {
    const req = await axios.post(
      "https://" + titleID + "playfabapi.com/Client/RegisterPlayFabUser",
      {
        Email: email,
        Password: password,
        TitleId: titleID,
      }
    );
    if (req.status !== 200) return null;
    return req.data.SessionTicket;
  } catch (e) {
    return null;
  }
}
