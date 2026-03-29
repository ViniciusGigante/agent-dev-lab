from fastapi import FastAPI 
from prompt import getPromptAgentReviewer
from main import agent_reviewer

app = FastAPI()

@app.get("/health") 
def health():
    return {"status": "ok"}

@app.post("/work")
def review(request: dict):

    prompt = getPromptAgentReviewer()
    prompt.append({
            "role": "user",
            "content": f"""Tecnologia: {request['technology']}
            Dependencias: {request['dependencies']}
            Regras: {request['rules']}
            Arquivo: {request['file']}
            Instruções: {request['instructions']}
            Código gerado: {request['code']}"""
        })
    
    result = agent_reviewer(prompt)
    return result