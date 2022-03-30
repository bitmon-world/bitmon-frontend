import axios from "axios";

export async function playFabRegister(
  email: string,
  password: string,
  titleID: string
): Promise<boolean> {
  try {
    const req = await axios.post(
      "https://" + titleID + ".playfabapi.com/Client/RegisterPlayFabUser",
      {
        Email: email,
        Password: password,
        TitleId: titleID,
        RequireBothUsernameAndEmail: false,
      }
    );
    return req.status === 200;
  } catch (e) {
    return false;
  }
}
