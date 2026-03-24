import dotenv from 'dotenv'
import fetch from 'node-fetch'
import cleanPrompt from '../src/cleanPrompt.js'

dotenv.config()


async function fetchCorrector(review, prompt) {
    const { CORRECTOR_URL } = process.env

    const response = await fetch(CORRECTOR_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, prompt })
    })

    const raw = await response.text();
    const correctedCode = cleanPrompt(raw);

    return correctedCode;
}

export default fetchCorrector;