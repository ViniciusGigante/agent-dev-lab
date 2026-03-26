import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import readStates from './src/readArtefacts.js';
import selectProject from './src/selector.js';
import saveProgress from './src/saveProgress.js';
import normalizeAgentResponse from './src/validateReponse.js';

import fetchReviewer from './prompts/reviewer.js';
import fetchCoder from './prompts/coder.js';

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = path.join(__dirname, 'data');

app.use(express.json());

async function main() {
  try {
      app.listen(port, () => {
        console.log(`Orchestrator listening at http://localhost:${port}`);
      });

      await selectProject();

      const artefact = await readStates('state.json', basePath);

      const codeResponse = await fetchCoder(artefact);
      const analyzedResponse = await fetchReviewer(codeResponse, artefact); 

      const isCorrect = normalizeAgentResponse(analyzedResponse);
      

      if(isCorrect) {
        console.log("Coder não cometeu erros.")
        await saveProgress(codeResponse, artefact.file);
      }else
        {console.log("o Código precisou ser corrigido pelo reviewer.")
          await saveProgress(analyzedResponse, artefact.file);}

  } catch(err) {
    console.error("Erro no pipeline:", err.message);
    process.exit(1);
  }
}

main()

