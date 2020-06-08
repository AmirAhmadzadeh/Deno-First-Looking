import db from "./db.ts";
import { delay } from "https://deno.land/std/async/delay.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

export default async function() {
  const users = db.collection("users");
  async function createAndDeleteFakeUser(username : string){
    await users.deleteMany({ username : username  });
    return await users.insertOne({
      username: "amirarsalan",
      name: "amirarsalanashkan",
    });
  }
  Deno.test("Removing Users", async function () {
      const insertId = await createAndDeleteFakeUser("amirarsalan");
      await delay(100);
      const deletedUser = await users.findOne({  _id: insertId }) ;
      console.log(deletedUser._id)  ;

      //assertEquals(insertId, user._id);
  });
}
