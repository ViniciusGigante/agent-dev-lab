import fs from 'fs/promises';

async function completeTask(task, pathFile) {
    let state = JSON.parse(await fs.readFile(pathFile, 'utf-8'));

    for (const artifactName in state.artifacts) {
        const artifact = state.artifacts[artifactName];
        const subTasks = artifact.sub_artifacts;

        if (subTasks[task.subName]) {
            
            subTasks[task.subName].done = true;
            subTasks[task.subName].attempts = (subTasks[task.subName].attempts || 0) + 1;

            
            const allSubDone = Object.values(subTasks).every(sub => sub.done);
            if (allSubDone) artifact.status = "concluido";

            
            await fs.writeFile(pathFile, JSON.stringify(state, null, 2), 'utf-8');

            
            const allArtifactsDone = Object.values(state.artifacts)
                                          .every(a => a.status === "concluido");

            if (allArtifactsDone) {
                return { success: true, message: "Projeto concluído" };
            }

            return { success: true, message: `Sub-artifact '${task.subName}' marcado como concluído` };
        }
    }

    throw new Error(`Sub-artifact ${task.subName} não encontrado`);
}

export default completeTask;