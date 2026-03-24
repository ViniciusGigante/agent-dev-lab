import dotenv from 'dotenv'
import fetch from 'node-fetch'
import cleanPrompt from '../src/cleanPrompt.js'

dotenv.config()

async function fetchReviewer(code,artefact) {
    const { REVIEWER_URL } = process.env

    const response = await fetch(REVIEWER_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artefact)
    })

    const raw = await response.text();
    const cleanCode = cleanPrompt(raw);

    return cleanCode;
}

export default fetchReviewer;