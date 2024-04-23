import dotenv from "dotenv";
import express from "express";

import documents from "./Routes/documents.js";
import authenticate from "./Routes/authenticate.js";
import Keycloak from "keycloak-connect";
import session from "express-session";
import getUpdate from "./Routes/update.js";
(async function () {
  dotenv.config();

  const { PORT, VITE_KEYCLOAK_URL, VITE_KEYCLOAK_REALM, VITE_KEYCLOAK_CLIENT } =
    process.env;
  const app = express();
  const server = app.listen(PORT, () =>
    console.log(`Backend started on port ${PORT}`)
  );
  const memoryStore = new session.MemoryStore();
  const kcConfig = {
    clientId: "aritha",
    bearerOnly: true,
    serverUrl: "http://localhost:8080",
    realm: "Garu",
    credentials: {
      secret: "b6YD9Jprikh6rWtPZLq5YHnpr7Dkyfwm",
    },
    // realmPublicKey:
    //   "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAl7cZrIwQdUVoiJ/xLCfAlfQY7/8uqRG9b7seC7dk3yBcRlGh/hrXpxmZ3lcZ1vdtpKUu0CY/NLQ5e4DyHDPtwHV4WcF+ZRNaxWyiWZuU963j3n6juA0SNXQ4cMvq9QygKv7PQXhwwpJybNgx2rtbV8J9CppSDtqF0ap0PoK5zS0v9mx0SboaTVw5lhgp+fKofjQ7EKMa0S3uFaZBvqmdJdMFBHQjGvJSADTrW9Fm00Tc7527qK+e/m1fxxL38XdoZZ9+l9PVXtqoon2xySw3VQOvwbAuoIKH5QjQBN6MgXnopQPyQgSs5EfHnqSDHWOn+2zH4KAoSzOqRS8N8tfH/wIDAQAB",
  };
  const keycloakInstance = new Keycloak({ store: memoryStore }, kcConfig);

  // console.log("keycloakInstance", keycloakInstance);
  app.use(keycloakInstance.middleware());
  app.use("/documents", keycloakInstance.protect("aritha:admin"), documents);
  app.use("/update", keycloakInstance.protect("admin"), getUpdate);
  // app.use(
  //   "/documents",
  //   keycloakInstance.enforcer("documents", { response_mode: "token" }),
  //   documents
  // );
})();
