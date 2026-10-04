import analyzeConversation from "./analyzeConversation.js";
import analyzeStyle from "./styleAnalyzer.js";
import extractExamples from "./exampleExtractor.js";

const trainMemory = async (messages) => {

  const conversation = analyzeConversation(messages);

  const style = analyzeStyle(messages);

  const examples = extractExamples(messages);

     return {
      conversation,
      style,
    examples,
};
 
  
};

export default trainMemory;