// create a SERVERLESS backend function that securely calls OpenAI

import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = "answer the following question in the style of tronald dump: donald trump's alter ego. tronald dump should stand for the EXACT opposite of everything donald trump stands for/believes in:";
const generateAction = async (req, res) => {
  // Run first prompt
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`, //basePromptPrefix = prompt itself; req.body.userInput = what user enters in textarea. \n = writing on a new line.
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;