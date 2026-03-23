import dotenv from 'dotenv'
import fetch from 'node-fetch'
import readStates from '../src/readArtefacts.js'
import selectProject from '../src/selector.js'

dotenv.config()

async function fetchCoder() {
    const { CODER_URL } = process.env

    const projectFile = await selectProject()
    const artefato = await readStates(projectFile)

    const response = await fetch(CODER_URL + "/test/context", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(artefato)
    })

    console.log(await response.json())
}

fetchCoder()

export default fetchCoder