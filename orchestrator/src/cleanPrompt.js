
import { fileURLToPath } from 'url';

function cleanPrompt(raw) {

    // Caso 1: JSON com campo code
    try {
        const parsed = JSON.parse(raw);
        if (parsed.code) return parsed.code.trim();
        if (parsed.content) return parsed.content.trim();
        if (parsed.result) return parsed.result.trim();
        if (parsed.output) return parsed.output.trim();
    } catch {}

    // Caso 2: Markdown com bloco de código
    const markdownMatch = raw.match(/```[\w]*\n?([\s\S]*?)```/);
    if (markdownMatch) return markdownMatch[1].trim();

    // Caso 3: Texto puro — retorna direto
    return raw.trim();
}

export default cleanPrompt;