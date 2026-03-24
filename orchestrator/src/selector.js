import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const yourProject = parseInt(process.env.PROJECT);

async function selectProject() {

     let stateFile;

    switch(yourProject){
        case 1:
            stateFile = 'state_calculadora.json'; break 
        case 2:
            stateFile = 'state_snake.json'; break
        case 3:
            stateFile =  'state_server.json'; break
        case 4:
            stateFile =  'state_todo.json'; break
        case 5:
            stateFile =  'state_test.json'; break

        default: throw new Error(`Projeto ${yourProject} não encontrado`);
    }

    const src = path.join(__dirname,'..','states',stateFile)
    const dest = path.join(__dirname,'..','data','state.json')

    fs.copyFileSync(src,dest);

}
export default selectProject;