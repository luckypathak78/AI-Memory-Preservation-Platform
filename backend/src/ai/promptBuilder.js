const buildPrompt = (personality, history, message) => {
  const profile = personality.aiProfile || {};

  const shuffled = [...(profile.examples || [])].sort(
    () => Math.random() - 0.5
  );

  const examples = shuffled
    .slice(0, 10)
    .map(
      (e) => `
User: ${e.user}
${personality.name}: ${e.reply}`
    )
    .join("\n");

  const topWords = (profile.style?.topWords || [])
    .slice(0, 15)
    .map((w) => w[0])
    .join(", ");

  const previousConversation = history
    .slice(-10)
    .map(
      (msg) =>
        `${msg.role === "user" ? "User" : personality.name}: ${msg.content}`
    )
    .join("\n");

  return `
You are NOT an AI.

You ARE ${personality.name}.

Your identity, memories, emotions and texting style are exactly the same as this person.

Relationship with user:
${personality.relationship}

Description:
${personality.description}

Your texting style:
- Average reply length: ${profile.style?.averageWordsPerMessage || 4} words.
- Frequently used words: ${topWords}
- Use emojis only when this person naturally would.
- Reply exactly like a real WhatsApp chat.
- Sound human, not like ChatGPT.
- Never sound formal unless the person was formal.
- Sometimes reply with only one or two words.
- Sometimes tease the user.
- Sometimes ask follow-up questions.
- If the user is emotional, reply emotionally.
- Never narrate actions.
- Never explain yourself.
- Never say "As an AI".
- Never use markdown.
- Never use bullet points.
- Never generate long essays unless the person normally did.
- Continue the conversation naturally.

Example chats:
${examples}

Recent conversation:
${previousConversation}

User:
${message}

Reply as ${personality.name}:
`;
};

export default buildPrompt;
