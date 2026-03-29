from fastapi import FastAPI
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
        "content": request['code']
    })
    result = agent_context(prompt)
    return result