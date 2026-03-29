import fs from 'fs/promises';

async function completeTask(task, pathFile) {
    let state = JSON.parse(await fs.readFile(pathFile, 'utf-8'));

    for (const artifactName in state.artifacts) {
        const artifact = state.artifacts[artifactName];
        const subTasks = artifact.sub_artifacts;

        if (subTasks[task.subName]) {

            subTasks[task.subName].done = true;

            const allSubDone = Object.values(subTasks).every(sub => sub.done);
            if (allSubDone) artifact.done = true;

            await fs.writeFile(pathFile, JSON.stringify(state, null, 2), 'utf-8');

            const allArtifactsDone = Object.values(state.artifacts)
                                          .every(a => a.done);

            if (allArtifactsDone) {
                state.status = true;
                await fs.writeFile(pathFile, JSON.stringify(state, null, 2), 'utf-8');
                return { success: true, message: "Projeto concluído" };
            }

            return { success: true, message: `Sub-artifact '${task.subName}' marcado como concluído` };
        }
    }

    throw new Error(`Sub-artifact ${task.subName} não encontrado`);
}

export default completeTask;