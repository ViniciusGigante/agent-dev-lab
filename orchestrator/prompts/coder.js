import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config()

async function fetchCoder(task) {
    const { CODER_URL } = process.env;

    const response = await fetch(CODER_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    })

    const data = await response.json();

    return data;
}

export default fetchCoder;