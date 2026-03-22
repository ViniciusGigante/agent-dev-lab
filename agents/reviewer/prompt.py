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
        "content": "Code agent Test successfully, you can ask me to do some coding work now."
        } 
   ]