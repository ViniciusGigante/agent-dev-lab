import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import readTasks from './src/readTask.js';
import selectProject from './src/selector.js';
import saveCode from './src/saveCode.js';
import completeTask from './src/completeTask.js';
import normalizeAgentResponse from './src/validateReponse.js';
import { getContext, saveContext } from './src/getContext.js';

import fetchCoder from './prompts/coder.js';
import fetchReviewer from './prompts/reviewer.js';
import fetchContext from './prompts/context.js';

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

        const task = await readTasks('state.json', basePath);

        if (task) {
            const context = await getContext();
            const codeResponse = await fetchCoder(task, context);
            console.log('codeResponse type:', typeof codeResponse);
            const analyzedResponse = await fetchReviewer(codeResponse, task);

            const { isApproved, code } = normalizeAgentResponse(analyzedResponse);
            const resultCode = isApproved ? codeResponse : code;

            try {
                const contextData = await fetchContext(resultCode);
                console.log('contextData:', JSON.stringify(contextData));
                await saveContext(task.file, contextData);
                await saveCode(resultCode, task.file);
                await completeTask(task, path.join(basePath, 'state.json'));
            } catch (error) {
                console.log("Erro ao salvar tarefa.");
            }
        }

    } catch (err) {
        console.error("Erro no pipeline:", err.message);
        process.exit(1);
    }
}
main();