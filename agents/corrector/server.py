from fastapi import FastAPI 
from prompt import getPromptAgentCorrector,CorrectorTestPrompt
from main import agent_corrector

app = FastAPI()

@app.get("/health") 
def health():
    return {"status": "ok"}

@app.post("/test")
def corrector_test():
    prompt = CorrectorTestPrompt("user")

    result = agent_corrector(prompt)

    return {"result": result + "<Coder>"}

@app.post("/test/context")
def test_context(request: dict):
    print(request)
    return {"status": "ok"}