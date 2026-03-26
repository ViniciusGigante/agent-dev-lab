import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import readTasks from './src/readTask.js';
import selectProject from './src/selector.js';
import saveCode from './src/saveCode.js';
import completeTask from './src/completeTask.js';
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

      let task = await readTasks('state.json', basePath);

      while(task){

          const codeResponse = await fetchCoder(task);
          const analyzedResponse = await fetchReviewer(codeResponse, task); 

          const isCorrect = normalizeAgentResponse(analyzedResponse);
          
          try{
              if(isCorrect) {
                      console.log("Coder não cometeu erros.")
                      await saveCode(codeResponse, task.file);
                    }else
                      {console.log("o Código precisou ser corrigido pelo reviewer.")
                        await saveCode(analyzedResponse, task.file);
          }}
          catch(error){
            console.log("Erro ao salvar tarefa.")
          }finally{
              await completeTask(task,path.join(basePath,'state.json'))
          }

          task = await readTasks('state.json', basePath);

        }

      
  } catch(err) {
    console.error("Erro no pipeline:", err.message);
    process.exit(1);
  }
}

main()

