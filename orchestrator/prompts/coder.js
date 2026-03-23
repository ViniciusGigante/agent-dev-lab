import dotenv from 'dotenv'
import fetch from 'node-fetch'
import fs from 'fs/promises'

dotenv.config()

async function fetchCoder(project, artefact) {
    const { CODER_URL } = process.env

    const response = await fetch(CODER_URL + "/work", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artefact)
    })

    const code = await response.text()

    await fs.writeFile('./context/context.txt', code)

    return code
}

export default fetchCoder