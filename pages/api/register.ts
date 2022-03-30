import { playFabRegister } from "../../functions/playfab/register";

export default async function APIregister(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const valid = await playFabRegister(email, password, process.env.TITLE_ID);
  if (valid) {
    res.status(200);
    res.json({ success: true });
    return;
  } else {
    res.status(200);
    res.json({ success: false });
  }
}
