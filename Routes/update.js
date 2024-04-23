import express from "express";
const router = express.Router();
const { PORT, VITE_KEYCLOAK_URL, VITE_KEYCLOAK_REALM, VITE_KEYCLOAK_CLIENT } =
  process.env;
let data = {
  "jayanta.garu@gmail.com": [
    "i am sorry",
    "not my fault",
    "binance is bad",
    "kevin is my best friend",
  ],
  "test@gmail.com": [
    "stop loss is bad",
    "conforable with risk",
    "never lost a trade",
    "alameda rocks!",
  ],
};

const getUpdate = async (req, res) => {
  try {
    const token = await req.kauth.grant.access_token.content;
    const roles = await token.resource_access?.aritha?.roles;
    const permissions = token.authorization
      ? token.authorization.permissions
      : undefined;
    const email = token.email;
    if (roles?.includes("admin")) {
      res.status(200).send(data[email]);
      return;
    } else {
      res.status(403).send({ massage: "Access Denied" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

router.get("/", getUpdate);
export default router;
