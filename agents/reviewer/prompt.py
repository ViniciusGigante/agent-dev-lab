def getPromptAgentReviewer(role):
    return [
            {
        "role": role,
        "content": "Content must be here, his role has not been defined yet."
        } 
   ]

def ReviewerTestPrompt(role):
    return [
            {
        "role":role,
        "content": "Isto é um teste de conexão, responda apenas True se isto chegou em você. Sem pegadinhas por gentileza."
        } 
   ]