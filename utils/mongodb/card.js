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

export async function addCard(question, answer) {
  try {
    if (!quiz) await init();

    if (!quiz) {
      const newCollection = await db.createCollection("quiz");
      console.log("Created new collection: quiz");
      quiz = newCollection;
    }

    await quiz.insertOne({ question, answer }); // Insert question and answer directly

    return { message: "Data saved successfully!" };
  } catch (error) {
    console.error("MongoDB Error:", error);
    throw new Error("Something went wrong!");
  }
}
