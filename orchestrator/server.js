import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import readStates from './src/readArtefacts.js';
import selectProject from './src/selector.js';
import saveProgress from './src/saveProgress.js';
import validateResponse from './src/validateReponse.js';

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

      console.log("ARTEFATO: \n"+artefact);

      const codeResponse = await fetchCoder(artefact);
      const analyzedResponse = await fetchReviewer(codeResponse, artefact); 

      const isCorrect = validateResponse(analyzedResponse);
      

      if(isCorrect) {

        await saveProgress(codeResponse, artefact.file);
      }else

        {await saveProgress(analyzedResponse, artefact.file);}

      return console.error("Algum agente não está saudável. Verifique os logs.");
  } catch(err) {
    console.error("Erro no pipeline:", err.message);
    process.exit(1);
  }
}

main()

