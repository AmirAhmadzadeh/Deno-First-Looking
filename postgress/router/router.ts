import { Router } from "https://deno.land/x/oak/mod.ts";
import { addProduct, getAll } from "../controllers/controller.ts";

const productsRouter = new Router();

productsRouter
	.get("/api", getAll)
        .post("/api/add", addProduct)


export default productsRouter;
