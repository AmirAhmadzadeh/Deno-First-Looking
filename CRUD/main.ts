import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Application } from "https://deno.land/x/oak/mod.ts";
import router from "./router.ts";




const app = new Application();
const env = config();

app.use(router.routes());
app.use(router.allowedMethods());




console.log("Server is Running on Port ", +env.PORT);
await app.listen({ port: +env.PORT, hostname: env.HOST });
