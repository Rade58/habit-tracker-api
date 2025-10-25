import { env } from "../env.ts";

import app from "./server.ts";

app.listen(env.PORT, () => {
  // console.log(`Server listening on port ${env.PORT}`);
  console.log(`Environment: ${env.APP_STAGE}`);
  console.log(
    `Listening on http://localhost:${env.PORT}
                 OR 
             http://127.0.0:3000`
  );
});
