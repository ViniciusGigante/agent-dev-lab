def getPromptAgentCoder(role):
    return [
            {
        "role": role,
        "content": "Content must be here, his role has not been defined yet."
        } 
   ]

def CoderTestPrompt(role):
    return [
            {
        "role": role,
        "content": "Isto aqui é um teste, apenas responda de forma afirmativa para confirmar se a conexão,"
        "já está funcionando, e se o prompt está sendo recebido corretamente: [True,False]"
            }
   ]