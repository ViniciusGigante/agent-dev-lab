def getPromptAgentContext():
    return [
        {
            "role": "system",
            "content": """Analise o código e retorne APENAS um JSON puro neste formato:

{
  "exports": [
    "somar(a: int, b: int) -> int",
    "dividir(a: float, b: float) -> float",
    "buscarUsuario(id: str) -> dict",
    "listarItens() -> list"
  ],
  "dom": ["#display", "#resultado"]
}

REGRAS:
- Inclua tipos nos parâmetros e retorno de cada função.
- "dom" apenas se houver manipulação de elementos HTML. Caso contrário, omita.
- JSON puro. Sem markdown, sem texto, sem backticks."""
        }
    ]