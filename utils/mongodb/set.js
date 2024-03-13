import clientPromise from "./mongodb";

let client;
let db;
let set;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    set = await db.collection("set");
  } catch (error) {
    throw new Error("Error initializing database connection");
  }
}

(async () => {
  await init();
})();

export async function addSet(name) {
  try {
    if (!set) await init();

    if (!set) {
      const newCollection = await db.createCollection("set");
      console.log("Created new collection: set");
      set = newCollection;
    }
    const id = new Date().getTime();
    await set.insertOne({ id, name });

    return { message: "Set added successfully!" };
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw new Error("Something went wrong!");
  }
}

export async function getSets() {
  try {
    if (!set) await init();

    const sets = await set.find({}).sort({ id: -1 }).toArray();

    return sets;
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw new Error("Something went wrong!");
  }
}
