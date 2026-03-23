import express from 'express';
import { checkApiHealth, checkAgentsHealth } from './src/checkHealth.js';
import readStates from './src/readArtefacts.js';
import selectProject from './src/selector.js';

const app = express();
const port = 3000;
app.use(express.json());


async function main() {
  if(await checkApiHealth() && await checkAgentsHealth()) {
    
    app.listen(port, () => {
    console.log(`Orchestrator listening at http://localhost:${port}`);
      

  });

  }else{return console.error("Algum agente não está saudável. Verifique os logs.");}

}

main()

