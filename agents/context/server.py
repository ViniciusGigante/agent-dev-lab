from fatapi import FastAPI
from main import agent_context
from prompt import getPromptAgentContext

app = FastAPI()

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/work")
def context(request: dict):
    prompt = getPromptAgentContext()
    prompt.append({
            "role": "user",
            "content": f"""Projeto: {request['project']}
            Tecnologia: {request['technology']}
            Arquivo: {request['file']}
            Código: {request['code']}"""
        })
    return agent_context(prompt)