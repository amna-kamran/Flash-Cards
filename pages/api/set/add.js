import { addSet } from "@/utils/mongodb/set";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { name } = req.body;
      console.log("name", name);

      const { error } = await addSet(name);

      if (error) throw new Error(error);
      return res.status(200).json({ message: "Card added successfully" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} is not allowed.`);
};

export default handler;
