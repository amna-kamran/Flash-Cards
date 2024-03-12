import { getCards } from "@/utils/mongodb/card";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const cards = await getCards();
      res.status(200).json(cards);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
