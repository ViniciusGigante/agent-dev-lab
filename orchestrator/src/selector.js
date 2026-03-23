import dotenv from 'dotenv';

dotenv.config();

const yourProject = parseInt(process.env.PROJECT);

async function selectProject() {
    switch(yourProject){
        case 1:
            return 'state_calculadora.json'
        case 2:
            return 'state_snake.json'
        case 3:
            return 'state_server.json'
        case 4:
            return 'state_todo.json'
        case 5:
            return 'state_test.json'
    }
}
export default selectProject;