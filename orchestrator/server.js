import express from 'express';
import fetch from 'node-fetch';
import fs from 'fs';
import path from 'path';

const app = express();
const port = 3000;
app.use(express.json());

// 1. Verificar se todos os agentes estão prontos
app.get('/health', async (req, res) => {
  // chama GET /health de cada agente
  // retorna status de todos
})

// 2. Iniciar o projeto
// recebe { "tipo": "calculadora" } ou { "artefatos": "./caminho.json" }
app.post('/iniciar', async (req, res) => {
  // valida projeto
  // verifica saúde dos agentes
  // inicia ciclo
  // retorna resultado
})

// 3. Consultar estado atual do projeto em andamento
app.get('/estado', (req, res) => {
  // lê artifacts.json do volume
  // retorna progresso atual
})

app.listen(port, () => {
  console.log(`Orchestrator listening at http://localhost:${port}`);
});