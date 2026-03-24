import dotenv from 'dotenv'
import fetch from 'node-fetch'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import cleanPrompt from '../src/cleanPrompt.js'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function fetchCoder(artefact) {
    const { CODER_URL } = process.env

    const response = await fetch(CODER_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artefact)
    })

    const raw = await response.text();
    const code = cleanPrompt(raw);

    await fs.writeFile(path.join(__dirname, '..', 'data', 'context.txt'), code);

    return code;
}

export default fetchCoder;