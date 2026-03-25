from fastapi import FastAPI 
from prompt import getPromptAgentCorrector,CorrectorTestPrompt
from main import agent_corrector

app = FastAPI()

@app.get("/health") 
def health():
    return {"status": "ok"}


@app.post("/work")
def correct(request: dict):
    print("request recebida no corrector:", request)

    prompt = getPromptAgentCorrector()
    prompt.append({
            "role": "user",
            "content": f"""Projeto: {request['project']}
            Tecnologia: {request['technology']}
            Arquivo: {request['file']}
            Instruções: {request['instructions']}
            Exports disponíveis: {request['exports']}
            Código com erro: {request['prompt']}
            Erros encontrados: {request['review']}"""
        })
    
    result = agent_corrector(prompt)
    print("resposta enviada ao orquestrador:", result)

    return {"code": result}