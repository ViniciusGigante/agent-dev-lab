import readline from 'readline'

const projetos = {
    1: 'state_calculadora.json',
    2: 'state_snake.json',
    3: 'state_server.json',
    4: 'state_todo.json'
}

function selectProject() {
    return new Promise((resolve) => {
        const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
        console.log("\nEscolha um projeto:\n1. Calculadora\n2. Jogo da Cobrinha\n3. Servidor CRUD\n4. Lista de Tarefas")
        rl.question("\nDigite um número: ", (resposta) => {
            rl.close()
            resolve(projetos[parseInt(resposta)])
        })
    })
}
export default selectProject