import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const {CODER_URL, CORRECTOR_URL, REVIEWER_URL } = process.env;


async function checkApiHealth() {
    try {
        const [coder, corrector, reviewer] = await Promise.all([
            fetch(CODER_URL + "/health").then(res => res.json()),
            fetch(CORRECTOR_URL + "/health").then(res => res.json()),
            fetch(REVIEWER_URL + "/health").then(res => res.json())
        ])

        console.log("Coder:", coder)
        console.log("Corrector:", corrector)
        console.log("Reviewer:", reviewer)

        const allHealthy = [coder, corrector, reviewer]
            .every(agent => agent.status === "ok")
        if (allHealthy) {
            console.log("✅ All agents are healthy")
            return true
        }
        console.error("❌ One or more agents are unhealthy")
        return false

    } catch(error) {
        console.error("❌ Error checking health:", error)
        return false
    }
}


export  { checkApiHealth };