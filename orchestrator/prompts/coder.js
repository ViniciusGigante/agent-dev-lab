import dotenv from 'dotenv'
import fetch from 'node-fetch'

dotenv.config()


async function fetchCoder(artefact) {
    const { CODER_URL } = process.env.CODER_URL

    const response = await fetch(CODER_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artefact)
    })

    return response;
}

export default fetchCoder;