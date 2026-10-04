const isUsefulMessage = (message) => {
  if (!message) return false;

  const text = message.trim().toLowerCase();

  // Ignore empty messages
  if (text.length === 0) return false;

  // Ignore very short replies
  if (text.length < 3) return false;

  // Ignore media placeholders
  if (
    text.includes("attached file") ||
    text.includes("media omitted")
  ) {
    return false;
  }

  // Ignore links
  if (
    text.startsWith("http://") ||
    text.startsWith("https://")
  ) {
    return false;
  }

  return true;
};

const extractExamples = (messages, limit = 25) => {
  const examples = [];

  for (let i = 0; i < messages.length - 1; i++) {
    const current = messages[i];
    const next = messages[i + 1];

    if (current.speaker === next.speaker) continue;

    if (
      !isUsefulMessage(current.message) ||
      !isUsefulMessage(next.message)
    ) {
      continue;
    }

    examples.push({
      user: current.message,
      reply: next.message,
    });

    if (examples.length >= limit) break;
  }

  return examples;
};

export default extractExamples;
