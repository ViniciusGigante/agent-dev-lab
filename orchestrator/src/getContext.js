import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);
const contextPath = path.join(__dirname, '..', 'data', 'memory', 'space.json');

async function getContext() {
  try {
    const stats = await fs.stat(contextPath);

    if (stats.size === 0) {
      return 'Sem contexto no momento, inicio do projeto!';
    }

    const context = await fs.readFile(contextPath, 'utf-8');
    return context;

  } catch (err) {
    return '';
  }
}

async function saveContext(filePath, newContext) {
  try {
    await fs.mkdir(path.dirname(contextPath), { recursive: true });

    let existing = {};
    try {
      const raw = await fs.readFile(contextPath, 'utf-8');
      existing = JSON.parse(raw);
    } catch {
      existing = {};
    }

    const merged = { ...existing, [filePath]: newContext };
    await fs.writeFile(contextPath, JSON.stringify(merged, null, 2), 'utf-8');

  } catch (error) {
    console.error('Erro ao salvar contexto:', error);
  }
}

export { getContext, saveContext };