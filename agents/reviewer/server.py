from fastapi import FastAPI 
from prompt import getPromptAgentReviewer,ReviewerTestPrompt
from main import agent_reviewer

app = FastAPI()

@app.get("/health") 
def health():
    return {"status": "ok"}


@app.post("/work")
def review(request: dict):

    print("request recebida no reviewer:", request)

    prompt = getPromptAgentReviewer()
    prompt.append({
            "role": "user",
            "content": f"""Projeto: {request['project']}
            Tecnologia: {request['technology']}
            Arquivo: {request['file']}
            Instruções: {request['instructions']}
            Exports disponíveis: {request['exports']}
            Código gerado: {request['code']}"""
        })
    
    result = agent_reviewer(prompt)
    print("resposta enviada ao orquestrador:", result)
    return {"review": result}