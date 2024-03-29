import clientPromise from "./mongodb";

let client;
let db;
let quiz;

async function init() {
  if (db) return;
  try {
    client = await clientPromise;
    db = await client.db();
    quiz = await db.collection("quiz");
  } catch (error) {
    throw new Error("Error initializing database connection");
  }
}

(async () => {
  await init();
})();

export async function addCard(setId, question, answer) {
  try {
    if (!quiz) await init();

    if (!quiz) {
      const newCollection = await db.createCollection("quiz");
      console.log("Created new collection: quiz");

      quiz = newCollection;
    }

    const id = new Date().getTime();
    await quiz.insertOne({ id, setId, question, answer });

    return { message: "Data saved successfully!" };
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw new Error("Something went wrong!");
  }
}

export async function getCards() {
  try {
    if (!quiz) await init();

    const cards = await quiz.find({}).toArray();

    return cards;
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw new Error("Something went wrong!");
  }
}
