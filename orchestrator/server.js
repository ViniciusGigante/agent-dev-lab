import express from 'express';
import { checkApiHealth, checkAgentsHealth } from './src/checkHealth.js';
import readStates from './src/readArtefacts.js';
import selectProject from './src/selector.js';
import fetchCoder from './prompts/coder.js';

const app = express();
const port = 3000;
app.use(express.json());


async function main() {

  if(await checkApiHealth() && await checkAgentsHealth()) {
    app.listen(port, () => {
    console.log(`Orchestrator listening at http://localhost:${port}`);
  });

    const projectFile = await selectProject();
    const artefact = await readStates(projectFile); 
    const prompt = await fetchCoder(projectFile,artefact)

  }else{return console.error("Algum agente não está saudável. Verifique os logs.");}

}

main()

