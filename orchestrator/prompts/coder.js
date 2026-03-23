import dotenv from 'dotenv'
import fetch from 'node-fetch'

// teste
import fs from 'fs';

dotenv.config()

async function fetchCoder(project,artefact) {
    const { CODER_URL } = process.env

    const response = await fetch(CODER_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artefact)
    })

    //teste
    fs.writeFile('../context/context.txt',response)

    return response;
}

export default fetchCoder