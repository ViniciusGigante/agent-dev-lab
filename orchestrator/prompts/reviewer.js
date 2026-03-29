import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()

async function fetchReviewer(code, task) {
    const { REVIEWER_URL } = process.env;

    const response = await fetch(REVIEWER_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            technology: task.technology,
            dependencies: task.dependencies,
            rules: task.rules,
            file: task.file,
            instructions: task.instructions,
            code
        })
    })

    const data = await response.json();
    return data;
}

export default fetchReviewer;