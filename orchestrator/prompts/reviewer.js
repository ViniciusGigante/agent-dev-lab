import dotenv from 'dotenv'
import fetch from 'node-fetch'

import writeLog from '../src/writeLog.js'

dotenv.config()

async function fetchReviewer(code,artefact) {
    const { REVIEWER_URL } = process.env.REVIEWER_URL

    const response = await fetch(REVIEWER_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({  artefact, code: code })
    })

    await writeLog(response, 'logReviewer.txt');

    return response;
}

export default fetchReviewer;