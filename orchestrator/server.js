import express from 'express';
import { checkApiHealth, checkAgentsHealth } from './src/index.js';

const app = express();
const port = 3000;
app.use(express.json());

// 1. Verificar se todos os agentes estão prontos
app.get('/health', async (req, res) => {
  // chama GET /health de cada agente
  // retorna status de todos
})

// 3. Consultar estado atual do projeto em andamento
app.get('/estado', (req, res) => {
  // lê artifacts.json do volume
  // retorna progresso atual
})

async function main() {
  // opcional: loop para monitorar saúde dos agentes e reiniciar se necessário
  if(await checkApiHealth() && await checkAgentsHealth()) {
    
    app.listen(port, () => {
    console.log(`Orchestrator listening at http://localhost:${port}`);
  });

  }else{return console.error("Algum agente não está saudável. Verifique os logs.");}

}

main()

