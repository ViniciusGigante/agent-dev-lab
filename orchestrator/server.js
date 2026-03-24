import express from 'express';
import { checkApiHealth, checkAgentsHealth } from './src/checkHealth.js';
import readStates from './src/readArtefacts.js';
import selectProject from './src/selector.js';
import fetchCoder from './prompts/coder.js';
import saveProgress from './src/saveProgress.js';
import { fileURLToPath } from 'url';
import path from 'path';

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
      
      await saveProgress(prompt, artefact.file);

      console.log(prompt);

    } else {
      return console.error("Algum agente não está saudável. Verifique os logs.");
    }
  } catch(err) {
    console.error("Erro no pipeline:", err.message);
    process.exit(1);
  }
}

main()

