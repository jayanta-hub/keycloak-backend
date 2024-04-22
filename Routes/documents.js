import express from "express";
const router = express.Router();

let data = {
  "jayanta.garu@gmail.com": [
    "i am sorry",
    "not my fault",
    "binance is bad",
    "kevin is my best friend",
  ],
  "caroline@alameda.com": [
    "stop loss is bad",
    "conforable with risk",
    "never lost a trade",
    "alameda rocks!",
  ],
};

const getDocuments = async (req, res) => {
  console.log("🚀 ~ getDocuments ~ req:", req.user);
  try {
    const email = req.user;
    res.status(200).send(data[email]);
  } catch (err) {
    res.status(500).send(err);
  }
};

router.get("/", getDocuments);
export default router;
