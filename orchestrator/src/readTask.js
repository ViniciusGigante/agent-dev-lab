import fs from 'fs/promises'
import path from 'path'

async function readTasks(projectFile,basePath) {
    
    const state = JSON.parse(await fs.readFile(path.join(basePath, projectFile), 'utf-8'))

    for (const [artifactName, artifact] of Object.entries(state.artifacts)) {
        if (artifact.status === "concluido") continue

        for (const [subName, sub] of Object.entries(artifact.sub_artifacts)) {
            if (sub.done) continue;

            return {
                artifactName,
                subName,
                file: sub.file,
                instructions: sub.instructions,
                exports: sub.exports,
                attempts: sub.attempts,
                technology: state.technology,
                project: state.project
            }
        }
    }

    return false;
}

export default readTasks