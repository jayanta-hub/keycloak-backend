import jwtmod from "jsonwebtoken";

export default async (req, res, next) => {
  console.log("🚀 ~ req:", req.headers);
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader && bearerHeader.split(" ")[1];
  if (token === null) return res.sendStatus(401);

  const public_key = `-----BEGIN PUBLIC KEY-----\n${process.env.PUBLICKEY}\n-----END PUBLIC KEY-----`;

  console.log("🚀 ~ public_key:", public_key);
  const decodedToken = jwtmod.verify(token, public_key, {
    algorithms: ["RS256"],
  });

  const { email } = decodedToken;
  req.user = email;
  next();
};
