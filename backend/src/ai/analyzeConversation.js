const analyzeConversation = (messages) => {
     console.log("Analyzer Running...");
  const participants = {};
  let totalLength = 0;

  messages.forEach((msg) => {
    totalLength += msg.message.length;

    if (!participants[msg.speaker]) {
      participants[msg.speaker] = 0;
    }

    participants[msg.speaker]++;
  });

  const averageMessageLength =
    messages.length === 0
      ? 0
      : Math.round(totalLength / messages.length);

  return {
    totalMessages: messages.length,
    participants: Object.keys(participants),
    messageCount: participants,
    averageMessageLength,
  };
};

export default analyzeConversation;