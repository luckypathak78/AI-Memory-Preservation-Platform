import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const askGemini = async (prompt) => {
  try {
    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1024,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);
    throw error;
  }
};

export default askGemini;
