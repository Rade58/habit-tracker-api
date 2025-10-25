import { env } from "../env.ts";

import app from "./server.ts";

app.listen(env.PORT, () => {
  console.log(`Server listening on port ${env.PORT}`);
  console.log(`Environment: ${env.APP_STGE}`);
});
