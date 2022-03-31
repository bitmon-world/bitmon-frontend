import { getPlayFabUserBit } from "../../functions/playfab/user";

export default async function APIInventory(req, res) {
  const { uid } = req.body;
  const amount = await getPlayFabUserBit(
    process.env.LOGIN_KEY,
    process.env.TITLE_ID,
    uid
  );
  res.status(200);
  res.json({ amount });
  return;
}
