from fastapi import FastAPI 
from prompt import getPromptAgentCoder
from main import agent_coder

app = FastAPI()

@app.get("/health") 
def health():
    return {"status": "ok"}

@app.post("/work")
def coding(request: dict):

    prompt = getPromptAgentCoder()

    prompt.append({
            "role": "user",
            "content": f"""Tecnologia: {request['technology']}
            Dependencias: {request['dependencies']}
            Regras: {request['rules']}
            Arquivo: {request['file']}
            Instruções: {request['instructions']}
            Contexto do projeto: {request['context']}"""
        })

    result = agent_coder(prompt)

    return result