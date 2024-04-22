import dotenv from "dotenv";
import express from "express";

import documents from "./Routes/documents.js";
import authenticate from "./Routes/authenticate.js";
import Keycloak from "keycloak-connect";
import session from "express-session";
(async function () {
  dotenv.config();

  const { PORT, VITE_KEYCLOAK_URL, VITE_KEYCLOAK_REALM, VITE_KEYCLOAK_CLIENT } =
    process.env;
  const app = express();
  const server = app.listen(PORT, () =>
    console.log(`Backend started on port ${PORT}`)
  );
  const memoryStore = new session.MemoryStore();
  const keycloakInstance = new Keycloak({});

  console.log("keycloakInstance", keycloakInstance);
  // app.use(
  //   keycloakInstance.middleware({
  //     logout: "/logout",
  //     admin: "/",
  //   })
  // );

  app.use("/documents", authenticate, documents);
  // app.use("/update", keycloakInstance.protect(), documents);
})();
