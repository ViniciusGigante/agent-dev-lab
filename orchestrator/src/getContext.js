import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
const contextPath = path.join(__dirname, '..', '..', 'data', 'memory', 'space.txt');

async function getContext() {
  try {
    const stats = await fs.promises.stat(contextPath);

    if (stats.size === 0) {
      return 'Sem contexto no momento, inicio do projeto!';
    }

    const context = await fs.promises.readFile(contextPath, 'utf-8');
    return context;

  } catch (err) {
    return '';
  }
}

export default getContext;