# agent-dev-lab

> Gere projetos de software completos com agentes de IA em segundos.

Modelo de IA utilizado
O projeto utiliza o modelo llama-3.3-70b-versatile via API da Groq.

⚠️ Vulnerabilidade conhecida: o projeto depende diretamente da disponibilidade deste modelo na plataforma Groq. Caso o modelo seja descontinuado, renomeado ou fique indisponível, o sistema deixará de funcionar até que o modelo seja atualizado manualmente nos agentes.


---

## Dependências

Antes de começar, certifique-se de ter instalado em sua máquina:

- [Docker](https://www.docker.com/get-started)
- [Git](https://git-scm.com/)

---

## 1. Crie sua chave de API da Groq

O agent-dev-lab usa a Groq como serviço de IA. Acesse [groq.com](https://groq.com/), crie uma conta gratuita e gere uma chave de API. Guarde essa chave, você vai precisar dela no próximo passo.

---

## 2. Clone o repositório

```bash
git clone https://github.com/ViniciusGigante/agent-dev-lab.git
cd agent-dev-lab
```

---

## 3. Configure o ambiente

Renomeie o arquivo `.env.example` para `.env` e abra-o. Você vai encontrar as seguintes variáveis:

```env
GROQ_API_KEY=suaChaveDeveEstarAqui
PROJECT=numeroDoProjeto

MODEL_AGENT=llama-3.3-70b-versatile
CODER_URL=http://coder-agent:8000
REVIEWER_URL=http://reviewer-agent:8000

```

Preencha `GROQ_API_KEY` com a chave que você gerou na Groq. As variáveis `CODER_URL` e `REVIEWER_URL` já estão configuradas corretamente, não precisa alterá-las.

---

## 4. Escolha um projeto

Na variável `PROJECT` do seu `.env`, coloque ou substitua o número do projeto que deseja gerar:

| Número | Projeto |
|--------|---------|
| `1` | Calculadora |
| `2` | Snake Game |
| `3` | Servidor Express |
| `4` | To-do List |

---

## 5. Execute

```bash
docker compose up --build
```

Acompanhe o progresso pelo terminal. Os agentes de IA irão trabalhar em etapas — você verá cada tarefa sendo concluída em tempo real.

---

## Resultado

Ao final da execução, o projeto completo estará disponível na pasta `./data` na raiz do repositório, seguindo a estrutura de arquivos definida para o projeto escolhido.

---