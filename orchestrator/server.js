import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import { checkApiHealth, checkAgentsHealth } from './src/checkHealth.js';
import readStates from './src/readArtefacts.js';
import selectProject from './src/selector.js';
import saveProgress from './src/saveProgress.js';

import fetchReviewer from './prompts/reviewer.js';
import fetchCoder from './prompts/coder.js';
import fetchCorrector from './prompts/corrector.js';

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const basePath = path.join(__dirname, 'data');


app.use(express.json());


async function main() {
  try {
    if(await checkApiHealth() && await checkAgentsHealth()) {
      app.listen(port, () => {
        console.log(`Orchestrator listening at http://localhost:${port}`);
      });

      await selectProject();

      const artefact = await readStates('state.json', basePath);

      const prompt = await fetchCoder(artefact);
      const review = await fetchReviewer(prompt, artefact);
      const correctorCode = await fetchCorrector(review,prompt);

      await saveProgress(correctorCode, artefact.file);

      console.log(prompt);
      console.log(review);

    } else {
      return console.error("Algum agente não está saudável. Verifique os logs.");
    }
  } catch(err) {
    console.error("Erro no pipeline:", err.message);
    process.exit(1);
  }
}

main()

