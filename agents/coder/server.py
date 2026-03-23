from fastapi import FastAPI 
from prompt import getPromptAgentCoder,CoderTestPrompt
from main import agent_coder

app = FastAPI()

@app.get("/health") 
def health():
    return {"status": "ok"}

@app.post("/test")
def coder_test():
    prompt = CoderTestPrompt("user")

    result = agent_coder(prompt)

    return {"result": result + "<Coder>"}

@app.post("/test/context")
def test_context(request: dict):
    print(request)
    return {"status": "ok"}

@app.post("/work")
def coding(request: dict):

    prompt = getPromptAgentCoder()

    prompt.append({
            "role": "user",
            "content": f"""Projeto: {request['project']}
            Tecnologia: {request['technology']}
            Arquivo: {request['file']}
            Instruções: {request['instructions']}
            Exports disponíveis: {request['exports']}"""
        })

    result = agent_coder(prompt)

    return {"code": result}