import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

async function fetchReviewer(code,artefact) {
    const { REVIEWER_URL } = process.env;

    const response = await fetch(REVIEWER_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            project: artefact.project,
            technology: artefact.technology,
            file: artefact.file,
            instructions: artefact.instructions,
            exports: artefact.exports,
            code: code
})
    })

    const data = await response.json();

    console.log("//////////RESPOSTA REVIEWER//////////")
    console.log(data);
    console.log("//////////RESPOSTA REVIEWER//////////")
    return data;
}

export default fetchReviewer;