from fastapi import FastAPI 
from prompt import getPromptAgentReviewer,ReviewerTestPrompt
from main import agent_reviewer

app = FastAPI()

@app.get("/health") 
def health():
    return {"status": "ok"}

@app.post("/test")
def reviewer_test():
    prompt = ReviewerTestPrompt("user")

    result = agent_reviewer(prompt)

    return {"result": result + "<Coder>"}

@app.post("/test/context")
def test_context(request: dict):
    print(request)
    return {"status": "ok"}