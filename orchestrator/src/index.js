import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const {CODER_URL, CORRECTOR_URL, REVIEWER_URL } = process.env;

// quero testar os 3 endpoints healths dos 3 agentes, para garantir que estão funcionando corretamente
async function checkHealth() {
    try {
        const [coder, corrector, reviewer] = await Promise.all([
            fetch(CODER_URL + "/health").then(res => res.json()),
            fetch(CORRECTOR_URL + "/health").then(res => res.json()),
            fetch(REVIEWER_URL + "/health").then(res => res.json())
        ])

        console.log("Coder:", coder)
        console.log("Corrector:", corrector)
        console.log("Reviewer:", reviewer)

        console.log("✅ All agents are healthy")
        return true
    } catch(error) {
        console.error("❌ Error checking health:", error)
    }
}