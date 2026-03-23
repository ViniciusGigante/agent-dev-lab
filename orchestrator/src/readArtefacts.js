import fs from 'fs/promises'
import path from 'path'

async function readStates(projectName) {
    const basePath = "../states/"
    const state = JSON.parse(await fs.readFile(path.join(basePath, projectName), 'utf-8'))

    for (const [artifactName, artifact] of Object.entries(state.artifacts)) {
        if (artifact.status === "completo") continue

        for (const [subName, sub] of Object.entries(artifact.sub_artifacts)) {
            if (sub.done) continue

            const result = {
                artifactName,
                subName,
                file: sub.file,
                instructions: sub.instructions,
                exports: sub.exports,
                attempts: sub.attempts,
                technology: state.technology,
                project: state.project
            }

            return result
        }
    }

    console.log("Nenhum sub-artefato pendente")
    return false
}


export default readStates