# agent-dev-lab

**Sistema multiagente de geração de código com revisão automática**

> Versão: Protótipo v1.0
> Status: Protótipo funcional para fins de estudo e avaliação técnica

---

## Sumário

1. [Visão Geral](#visão-geral)
2. [Propósito do Projeto](#propósito-do-projeto)
3. [Arquitetura do Sistema](#arquitetura-do-sistema)
4. [Componentes](#componentes)
5. [Fluxo de Execução](#fluxo-de-execução)
6. [Estrutura de Arquivos](#estrutura-de-arquivos)
7. [States — Projetos Predefinidos](#states--projetos-predefinidos)
8. [Tecnologias Utilizadas](#tecnologias-utilizadas)
9. [Limitações Conhecidas](#limitações-conhecidas)

---

## Visão Geral

O agent-dev-lab é um sistema experimental de geração automatizada de código composto por múltiplos agentes de inteligência artificial que trabalham em coordenação. O sistema é capaz de desenvolver projetos de software completos — como calculadoras, jogos com Pygame, servidores web com Express e outros — de forma autônoma e em alguns segundos.

O projeto foi construído como um laboratório de aprendizado prático na área de sistemas multiagente e orquestração de LLMs, com objetivo de explorar de forma técnica um dos campos mais relevantes da inteligência artificial aplicada ao desenvolvimento de software.

> ⚠️ **Aviso de Escopo:** Este é um protótipo destinado a fins de estudo, avaliação e curiosidade técnica. Não é um produto empresarial completo. Erros de geração de código ainda ocorrem e fazem parte do desafio de pesquisa do projeto.

---


## Arquitetura do Sistema

### Visão em Camadas

O sistema é composto por três camadas principais que interagem entre si:

| Camada | Descrição |
|--------|-----------|
| **Orquestrador (Node.js)** | Motor central do sistema. Coordena todos os agentes, define o fluxo de execução, lê os artefatos de estado e decide o que cada agente recebe e entrega. |
| **Agentes de IA (Python)** | Instâncias de APIs Python que encapsulam chamadas ao modelo LLM (Groq). Cada agente tem um papel específico e recebe instruções formatadas pelo orquestrador. |
| **Persistência (Docker Volume)** | Volume mapeado em `./data` na raiz do projeto. É o destino final de todos os arquivos gerados pelo sistema. |

### Serviços e Containers

Toda a infraestrutura roda dentro de uma rede Docker com três serviços isolados que se comunicam via HTTP interno:

| Serviço | Tecnologia e Função |
|---------|---------------------|
| **agente-coder** | Python 3.12 + FastAPI/Uvicorn. Responsável por gerar código com base em um prompt e uma tarefa recebidos do orquestrador. |
| **agente-reviewer** | Python 3.12 + FastAPI/Uvicorn. Responsável por revisar o código gerado, verificar se atende à tarefa e corrigir erros predefinidos. |
| **orquestrador** | Node.js 18 Alpine + Express. Cérebro do sistema. Controla o ciclo completo de geração, revisão, sanitização e salvamento dos arquivos. |

---

## Componentes

### Agente Codificador (agente-coder)

O agente-coder é o responsável pela geração inicial do código. Ele recebe do orquestrador duas informações fundamentais:

- Um prompt pronto com as regras e o contexto do projeto
- A descrição da tarefa específica a ser codificada naquele ciclo

Com base nessas informações, ele consulta o modelo LLM via API da Groq e retorna o código gerado. Internamente, cada agente Python é composto pelos seguintes arquivos:

| Arquivo | Função |
|---------|--------|
| `server.py` | Define a API HTTP com Uvicorn. É o ponto de entrada para comunicação com o orquestrador. |
| `main.py` | Instancia a conexão com o serviço de LLM (Groq) e executa as chamadas ao modelo. |
| `prompt.py` | Centraliza e organiza os prompts que definem o papel do agente e suas regras de operação. |
| `requirements.txt` | Lista as dependências Python necessárias para o container. |
| `Dockerfile` | Configura o container com Python 3.12-slim e inicia o servidor via Uvicorn. |

### Agente Revisor (agente-reviewer)

O agente-reviewer atua como o controle de qualidade do sistema. Ele recebe:

- O código gerado pelo agente-coder
- O artefato de estado (state.json) com os requisitos da tarefa

Com esses dois insumos, o revisor verifica se o código atende à tarefa descrita no artefato e se ele contém algum dos erros de uma lista predefinida. O revisor pode tomar duas decisões:

| Decisão | Ação |
|---------|------|
| **Código aprovado** | Sinaliza ao orquestrador que o código do coder pode ser salvo diretamente. |
| **Código com problemas** | Corrige e sanitiza o código e retorna a versão limpa para ser salva pelo orquestrador. |

A estrutura de arquivos do agente-reviewer é idêntica à do agente-coder, com os devidos ajustes nos prompts e na lógica de análise.

### Orquestrador

O orquestrador é o componente mais complexo do sistema. Construído em Node.js com Express, ele é o único serviço que tem visão completa do projeto em execução. Sua estrutura interna se divide em:

| Diretório / Arquivo | Função |
|---------------------|--------|
| `server.js` | Núcleo da aplicação. Define o servidor HTTP, importa todos os módulos de `/src` e controla o ciclo completo de execução. |
| `/states` | Repositório de projetos predefinidos. Cada arquivo `.json` descreve um projeto completo com tarefas, requisitos, caminhos de arquivo e status. |
| `/src` | Módulos JavaScript isolados que compõem as funcionalidades do orquestrador (seleção de projeto, salvamento, sanitização, leitura de artefato etc.). |
| `/prompts` | Define a estrutura de comunicação com os agentes. Monta os payloads enviados via HTTP para o coder e o reviewer usando os dados do state.json. |

---

## Fluxo de Execução

O orquestrador opera em ciclos contínuos até que todas as tarefas do projeto estejam concluídas. Cada ciclo segue rigorosamente estas sete etapas:

### Etapa 1 — Seleção de Projeto

O orquestrador lê a variável de ambiente definida no `.env` (um número inteiro) e usa o módulo `selector.js` para associá-la ao projeto correspondente em `/states`. O `state.json` do projeto selecionado é copiado para o diretório `/data`, que é o volume Docker mapeado na raiz do projeto.

### Etapa 2 — Leitura do Artefato

O orquestrador lê o `state.json` e identifica em qual etapa o projeto se encontra. O sistema suporta tanto iniciar do zero quanto retomar de um ponto de progresso salvo anteriormente, tornando o processo resiliente a interrupções.

### Etapa 3 — Loop de Controle

Um loop é iniciado para gerenciar as ações repetitivas dos agentes. Ele verifica continuamente a condição de encerramento do projeto: todas as tarefas grandes e suas subtarefas marcadas como concluídas.

### Etapa 4 — Chamada ao Agente Codificador

O orquestrador monta o payload com as informações da tarefa atual (extraídas do artefato) e faz uma requisição HTTP para a API do agente-coder. O agente recebe a tarefa e retorna o código gerado.

### Etapa 5 — Chamada ao Agente Revisor

O código do coder e o artefato são enviados ao agente-reviewer. O revisor analisa se o código satisfaz os requisitos da tarefa e se há erros da lista predefinida. Se encontrar problemas, ele corrige e sanitiza o código antes de retorná-lo.

### Etapa 6 — Salvamento do Arquivo

Com base na resposta do revisor, o orquestrador decide qual versão do código salvar:

- Se o revisor **aprovou** o código do coder, salva a versão original do coder
- Se o revisor **corrigiu** o código, salva a versão corrigida e sanitizada pelo revisor

O caminho de salvamento é definido pelas propriedades do artefato (`state.json`), garantindo que cada arquivo gerado vá para o lugar correto dentro da estrutura do projeto.

### Etapa 7 — Atualização do Progresso

A tarefa concluída é marcada como `True` no `state.json`. O ciclo então se repete a partir da Etapa 3, processando a próxima tarefa pendente, até que todas as tarefas grandes e suas subtarefas estejam completas.

---

## Estrutura de Arquivos

### Estrutura dos Agentes

Ambos os agentes (coder e reviewer) seguem a mesma estrutura de diretório:

```
./agente-coder/          (ou agente-reviewer/)
├── Dockerfile            # Container Python 3.12-slim
├── main.py               # Instância do cliente Groq e lógica de chamada ao LLM
├── prompt.py             # Prompts que definem o papel e as regras do agente
├── requirements.txt      # Dependências Python (FastAPI, Uvicorn, Groq, etc.)
└── server.py             # API HTTP (Uvicorn) — ponto de comunicação com o orquestrador
```

### Estrutura do Orquestrador

```
./orchestrator/
├── Dockerfile            # Container Node.js 18 Alpine
├── package.json          # Dependências Node (Express, node-fetch, etc.)
├── server.js             # Núcleo: servidor, importações e ciclo de execução
├── /prompts              # Monta os payloads enviados aos agentes via HTTP
├── /src                  # Módulos isolados do orquestrador:
│   ├── selector.js       # Seleciona projeto via variável .env
│   ├── sanitizer.js      # Sanitiza respostas dos agentes
│   ├── saver.js          # Salva os arquivos gerados em /data
│   └── ...               # Outros módulos funcionais
└── /states               # Projetos predefinidos em formato .json
```

### Estrutura Raiz do Projeto

```
./agent-dev-lab/
├── docker-compose.yml    # Orquestra os 3 containers e a rede Docker
├── .env                  # Variável de seleção de projeto (ex: PROJECT=1)
├── /agente-coder         # Container do agente codificador
├── /agente-reviewer      # Container do agente revisor
├── /orchestrator         # Container do orquestrador Node.js
└── /data                 # Volume Docker — saída final dos projetos gerados
```

---

## States — Projetos Predefinidos

Os states são arquivos `.json` localizados em `/orchestrator/states` que representam projetos completos prontos para serem executados pelo sistema. Cada state define todo o mapeamento de um projeto do início ao fim.

A estrutura hierárquica de um state é:

- **Tarefas grandes (tasks):** representam módulos ou etapas macro do projeto
- **Subtarefas:** etapas práticas e específicas dentro de cada tarefa grande

Cada tarefa e subtarefa possui as seguintes propriedades:

| Propriedade | Descrição |
|-------------|-----------|
| `caminho do arquivo` | Define onde o arquivo gerado deve ser salvo dentro de `/data` |
| `linguagem` | Linguagem de programação a ser utilizada naquela tarefa |
| `dependências` | Bibliotecas ou pacotes necessários para aquele arquivo |
| `status (True/False)` | Indica se a tarefa já foi concluída pelo sistema |

> **Regra de conclusão:** Uma tarefa grande só é marcada como concluída quando todas as suas subtarefas tiverem status `True`. O projeto como um todo só encerra quando todas as tarefas grandes estiverem concluídas.

---

## Tecnologias Utilizadas

| Tecnologia | Uso no Projeto |
|------------|----------------|
| **Python 3.12** | Runtime dos agentes de IA (coder e reviewer) |
| **FastAPI + Uvicorn** | Framework e servidor HTTP dos agentes Python |
| **Groq API** | Serviço de LLM utilizado para geração e revisão de código |
| **Node.js 18** | Runtime do orquestrador |
| **Express.js** | Framework HTTP do orquestrador |
| **Docker + Compose** | Containerização e orquestração dos serviços |
| **Docker Volumes** | Persistência e saída dos arquivos gerados |

---

## Limitações Conhecidas

Como protótipo v1.0, o sistema apresenta algumas limitações conhecidas que representam os próximos desafios de desenvolvimento:

| Limitação | Descrição |
|-----------|-----------|
| **Blocos de markdown no código** | O LLM ocasionalmente gera código com delimitadores ` ```javascript ` ou similares que quebram o arquivo gerado. |
| **Caracteres inválidos** | Aspas inteligentes, travessões e outros caracteres não-ASCII podem aparecer no código gerado. |
| **Comentários de IA** | Comentários como `// Implemente sua lógica aqui` podem escapar do processo de sanitização. |
| **Inconsistência de nomenclatura** | O agente pode definir uma função com um nome em um arquivo e referenciá-la com nome diferente em outro, causando erros de execução. |
| **Sem validação de execução** | O sistema não executa o código gerado para verificar se funciona de fato, apenas revisa estaticamente. |

> **Próximo passo:** A resolução dessas limitações é o foco da próxima fase de desenvolvimento, com implementação de camadas adicionais de pós-processamento, validação de sintaxe e análise de consistência entre arquivos. A infraestrutura base não será alterada.

---

*agent-dev-lab — Documentação v1.0 | Protótipo para fins de estudo e avaliação técnica*
