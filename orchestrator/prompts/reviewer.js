import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

async function fetchReviewer(code,task) {
    const { REVIEWER_URL } = process.env;

    const response = await fetch(REVIEWER_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            project: task.project,
            technology: task.technology,
            file: task.file,
            instructions: task.instructions,
            exports: task.exports,
            code: code
})
    })

    const data = await response.json();
    return data;
}

export default fetchReviewer;