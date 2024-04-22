import jwtmod from "jsonwebtoken";

export default async (req, res, next) => {
  // console.log("🚀 ~ keycloakInstance:", keycloakInstance);
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader && bearerHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);
  const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLICKEY}\n-----END PUBLIC KEY-----`;
  const decodedToken = jwtmod.verify(token, public_key, {
    algorithms: ["RS256"],
  });
  console.log("🚀 ~ decodedToken:", decodedToken);
  // const { email } = decodedToken;
  // req.user = email;
  // next();
};
