import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

async function fetchContext(code) {

    try{
        const { CONTEXT_URL } = process.env;

        const response = await fetch(CONTEXT_URL + "/work", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ code })
        });
        const data = await response.json();
        return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (error) {
        console.error('Error fetching context:', error);
        throw error;

    }

}
export default fetchContext;