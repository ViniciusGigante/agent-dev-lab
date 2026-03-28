dependencias
docker git

acesse a groq, crie uma conta e gere uma chave de API
https://groq.com/

clone 
bash
git clone https://github.com/ViniciusGigante/agent-dev-lab.git


va ao direotiro do repositorio:
cd agent-dev-lab

altere o nome de .env.example para .env

copie sua chave da API groq e coloque na variavel do arquivo .env chamada GROQ_API_KEY

selecione um projeto dentre estes a seguir escolhendo um numero inteiro e colocando na variavel do .env PROJECT:

1 : calculadora

2 : snake game

3 : express server

4 : To-do list

formato esperado de seu .env:

GROQ_API_KEY=suaChaveDeveEstarAqui

CODER_URL=http://coder-agent:8000
REVIEWER_URL=http://reviewer-agent:8000

PROJECT=5

apos isto rode docker compose up --build

o projeto escolhido ficará em /data, espere a conclusão das tarefas das IA´s analisadno o terminal e depois voce terá
o projeto desejado entregue em ./data seguindo as especificações determinadas.
