from groq import Groq
from dotenv import load_dotenv
import os

load_dotenv()

client = Groq(api_key=os.getenv('GROQ_API_KEY'))
agentModel = os.getenv('MODEL_AGENT')

def agent_coder(prompt):
    try:
        response = client.chat.completions.create(
            model=agentModel,
            messages=prompt
        )
        return response.choices[0].message.content
    except Exception as e:
        print(f"GROQ ERROR: {type(e).__name__}: {e}")
        raise