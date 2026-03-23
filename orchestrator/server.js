import express from 'express';
import { checkApiHealth, checkAgentsHealth } from './src/index.js';

const app = express();
const port = 3000;
app.use(express.json());


// Consultar estado atual do projeto em andamento
app.get('/estado', (req, res) => {
  // lê artifacts.json do volume
  // retorna progresso atual
})

const projetos = {
  1: 'calculadora',
  2: 'snake',
  3: 'express-crud',
  4: 'todo'
}

function escolherProjeto() {
  return new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
    console.log("\nEscolha um projeto:\n1. Calculadora\n2. Jogo da Cobrinha\n3. Servidor CRUD\n4. Lista de Tarefas")
    rl.question("\nDigite um número: ", (resposta) => {
      rl.close()
      resolve(projetos[parseInt(resposta)])
    })
  })
}

async function runLoop(projectName) {
    const state = await readState(projectName)

    for (const [artifactName, artifact] of Object.entries(state.artifacts)) {
        for (const [subName, sub] of Object.entries(artifact.sub_artifacts)) {

            if (sub.done) continue


            await writeContextTemp({ project: projectName, current_artifact: artifactName, current_sub_artifact: subName, file: sub.file, cycle: 1 })


            await runSmallCycle(state, artifactName, subName, sub)


            await clearContextTemp()


            sub.done = true
            await saveState(projectName, state)
        }

        artifact.status = "completo"
        await saveState(projectName, state)
    }
}

async function main() {
  if(await checkApiHealth() && await checkAgentsHealth()) {
    
    app.listen(port, () => {
    console.log(`Orchestrator listening at http://localhost:${port}`);

      const projeto = escolherProjeto()
      if (!projeto) return console.error("Projeto inválido.")

      runLoop(projeto)

  });

  }else{return console.error("Algum agente não está saudável. Verifique os logs.");}

}

main()

