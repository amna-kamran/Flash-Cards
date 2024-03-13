import { getSets } from "@/utils/mongodb/set";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const sets = await getSets();

      res.status(200).json(sets);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
