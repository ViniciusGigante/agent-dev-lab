from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv('../.env')

client = Groq(api_key=os.getenv('GROQ_API_KEY'))

def agent_corrector(prompt):

    # Aqui deverá ter conteúdo para impor o historico do projeto tambem
    # e outros complementos do contexto da etapa e estágio da produução

    response = client.chat.completions.create(
        model='llama-3.3-70b-versatile',
        messages =prompt
    )

    return response.choices[0].message.content