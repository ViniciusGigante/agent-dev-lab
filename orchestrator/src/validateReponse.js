function validateResponse(agentResponse) {
    let text;

    if (typeof agentResponse === 'object' && agentResponse !== null) {
        text = agentResponse.code ?? agentResponse.review ?? JSON.stringify(agentResponse);
    } else {
        text = String(agentResponse);
    }

    const markdownMatch = text.match(/```[\w]*\n?([\s\S]*?)```/);
    if (markdownMatch) text = markdownMatch[1];

    text = text.replace(/\\n/g, '\n')
               .replace(/\\t/g, '\t')
               .replace(/\\"/g, '"')
               .replace(/\\\\/g, '\\');

    text = text.trim();

    const hasCode = /def |class |import |function |const |let |var |return |if |for |while /.test(text);

    console.log({ isApproved: !hasCode, code: hasCode ? text : null })

    return { isApproved: !hasCode, code: hasCode ? text : null };
}

export default validateResponse;