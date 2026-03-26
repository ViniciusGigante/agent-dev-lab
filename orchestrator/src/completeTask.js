import fs from 'fs/promises';

async function completeTask(task, pathFile) {

    let state = JSON.parse(await fs.readFile(pathFile, 'utf-8'));

    for (const artifactName in state.artifacts) {
        const artifact = state.artifacts[artifactName];
        const subTasks = artifact.sub_artifacts;

        let found = false;

        for (const subName in subTasks) {
            
            if (subName === task.subName) {
                subTasks[subName].done = true;
                subTasks[subName].attempts = (subTasks[subName].attempts || 0) + 1;
                found = true;
                break;
            }
        }

        if (found) {
            
            const allDone = Object.values(subTasks).every(sub => sub.done);
            if (allDone) {
                artifact.status = "concluido";
            }

            await fs.writeFile(pathFile, JSON.stringify(state, null, 2), 'utf-8');

            return { success: true, message: `Sub-artifact '${task.subName}' marcado como concluído` };
        }
    }


    throw new Error(`Sub-artifact ${task.subName} não encontrado`);
}

export default completeTask;