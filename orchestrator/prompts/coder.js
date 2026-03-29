import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config()

async function fetchCoder(task,context) {
    const { CODER_URL } = process.env;

    const response = await fetch(CODER_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            technology: task.technology,
            dependencies: task.dependencies,
            rules: task.rules,
            file: task.file,
            instructions: task.instructions,
            context
})
    })

    const data = await response.json();

    return data;
}

export default fetchCoder;