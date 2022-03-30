import { playFabLogin } from "../../functions/playfab/login";

export default async function APIlogin(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const userdata = await playFabLogin(email, password, process.env.TITLE_ID);
  if (userdata) {
    res.status(200);
    res.json({ success: true, userdata });
    return;
  } else {
    res.status(200);
    res.json({ success: false });
  }
}
