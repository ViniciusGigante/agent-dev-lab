function validateResponse(agentResponse) {
    // Se não houver resposta ou só espaços → NÃO aprovado
    if (!agentResponse || !agentResponse.trim()) return false;

    let cleaned = agentResponse.trim();


    const markdownMatch = cleaned.match(/```[\w]*\n?([\s\S]*?)```/);
    if (markdownMatch) {
        cleaned = markdownMatch[1].trim();
    }

    const normalized = cleaned
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");


    const errorPatterns = /(erro|error|falha|fail|bug)/;
    if (errorPatterns.test(normalized)) return false;


    const codePatterns = /function|const|let|var|=>|export|import|class|return|if\s*\(|\{|\}/;
    if (codePatterns.test(cleaned)) return false;


    const approvalKeywords = /(ok|aprovado|true|verificado|correto|valid)/;
    if (approvalKeywords.test(normalized)) return true;


    if (/^[.\-✓\s]{1,5}$/.test(cleaned)) return true;


    return false;
}

export default validateResponse;