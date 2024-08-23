import OpenAI from "openai";

export const configureOpenAI = () => {
  const client = new OpenAI({
    apiKey: process.env.OPEN_AI_SECRET,
    organization: process.env.OPEN_AI_ORGANIZATION_ID,
  });
  return client;
};
