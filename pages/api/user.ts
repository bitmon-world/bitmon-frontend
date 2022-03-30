import { getPlayFabUserAddress } from "../../functions/playfab/user";

export default async function APIuser(req, res) {
  const { uid } = req.body;
  const data = await getPlayFabUserAddress(
    process.env.LOGIN_KEY,
    process.env.TITLE_ID,
    uid
  );
  res.status(200);
  res.json({ address: data });
  return;
}
