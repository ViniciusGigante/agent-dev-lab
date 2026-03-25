import dotenv from 'dotenv'
import fetch from 'node-fetch'

import writeLog from '../src/writeLog.js';

dotenv.config()

async function fetchCorrector(review, prompt) {
    const { CORRECTOR_URL } = process.env;


    const response = await fetch(CORRECTOR_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ review, prompt})
    })

    await writeLog(response,'logCorrector.txt');

    return response;
}

export default fetchCorrector;