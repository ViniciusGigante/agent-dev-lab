import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config()

async function fetchCoder(artefact) {
    const { CODER_URL } = process.env;

    const response = await fetch(CODER_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artefact)
    })

    const data = await response.json();

    console.log("//////////RESPOSTA CODER//////////")
    console.log(data);
    console.log("//////////RESPOSTA CODER//////////")

    return data;
}

export default fetchCoder;