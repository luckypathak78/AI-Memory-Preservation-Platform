const STOP_WORDS = [
  "the", "is", "a", "an", "to", "of", "and",
  "i", "you", "me", "my", "we", "our",
  "hai", "ha", "h", "ki", "ke", "ka",
  "to", "ko", "yaar", "aur"
];

const analyzeStyle = (messages) => {
  const emojiUsage = {};
  const wordFrequency = {};

  let questionCount = 0;
  let linkCount = 0;
  let totalWords = 0;

  const emojiRegex =
    /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu;

  messages.forEach((msg) => {

    if (msg.message.includes("?")) {
      questionCount++;
    }

    if (msg.message.includes("http")) {
      linkCount++;
    }

    const emojis = msg.message.match(emojiRegex);

    if (emojis) {
      emojis.forEach((emoji) => {
        emojiUsage[emoji] =
          (emojiUsage[emoji] || 0) + 1;
      });
    }

    const words = msg.message
      .toLowerCase()
      .replace(/[^\w\s]/g, "")
      .split(/\s+/);

    totalWords += words.length;

    words.forEach((word) => {

      if (
        word.length < 2 ||
        STOP_WORDS.includes(word)
      ) {
        return;
      }

      wordFrequency[word] =
        (wordFrequency[word] || 0) + 1;
    });

  });

  const topWords = Object.entries(wordFrequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15);

  return {
    emojiUsage,
    topWords,
    questionCount,
    linkCount,
    averageWordsPerMessage:
      Math.round(totalWords / messages.length),
  };
};

export default analyzeStyle;