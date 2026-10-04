const parseWhatsAppChat = (chatText) => {
  const lines = chatText.split("\n");

  const messages = [];

  // Matches:
  // 12/07/26, 10:15 am - Lucky: Hello
  const regex =
    /^(\d{1,2}\/\d{1,2}\/\d{2,4}),\s(.+?)\s-\s([^:]+):\s([\s\S]*)$/;

  for (const line of lines) {
    const match = line.match(regex);

    if (!match) continue;

    const [, date, time, speaker, message] = match;

    messages.push({
      date,
      time,
      speaker: speaker.trim(),
      message: message.trim(),
    });
  }

  return messages;
};

export default parseWhatsAppChat;