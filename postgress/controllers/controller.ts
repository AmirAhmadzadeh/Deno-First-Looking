import { Client } from "https://deno.land/x/postgres/mod.ts";
import { dbConfig } from "../config/config.ts";

const client = new Client(dbConfig);

//Product Interface
interface Product {
  name: string;
  desc: string;
  price: string;
}

//Response of Body Interface
export interface ResposeBodyForProduct {
  status: string;
  data?: Product;
  msg?: string;
}

// Add prdocut Controller
export async function addProduct({
  response,
  request,
}: {
  response: any;
  request: any;
}) {
  const body = await request.body();
  const product: Product = body.value;
  if (request.hasBody) {
    try {
      await client.connect();
      await client.query(
        "INSERT INTO public.products(name,description,price)VALUES($1,$2,$3)",
        product.name,
        product.desc,
        product.price
      );
      const responseBody: ResposeBodyForProduct = {
        status: "true",
        data: product,
      };
      response.status = 201;
      response.body = responseBody;
    } catch (error) {
      console.log(error);
      const responseBody: ResposeBodyForProduct = {
        status: "false",
        msg: error.toString(),
      };
      response.status = 500;
      response.body = responseBody;
    } finally {
      await client.end();
    }
  } else {
    const responseBody: ResposeBodyForProduct = {
      status: "false",
      msg: "we dont h:WuUUave body ",
    };
    response.status = 500;
    response.response.body = responseBody;
  }
}

// get All the products !!!
export async function getAll({ response }: { response: any }) {
  console.log("Hello ooooooo ");
  try {
    await client.connect();
    const result = await client.query(`SELECT * FROM products
        ORDER BY id ASC `);
    console.log("result is ", result.rows);
    response.status = 201;
    response.body = {
      status: "true",
      data: result.rows,
    };
  } catch (error) {
    response.body = {
      status: "false",
      msg: error.toString(),
    };
  } finally {
    await client.end();
  }
}
