import { addCard } from "../../../utils/mongodb/card";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      // Parse the request body as JSON
      console.log(req.body);
      const { question, answer } = req.body;
      console.log("answer", answer);

      // Call the addCard function with question and answer parameters
      const { error } = await addCard(question, answer);

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
