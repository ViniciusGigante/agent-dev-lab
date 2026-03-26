import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function saveProgress(data, fileName) {
    const dest = path.join(__dirname, '..', 'data', fileName);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    const output = typeof data === 'object' ? JSON.stringify(data, null, 2) : data;

    fs.writeFileSync(dest, output);
}

export default saveProgress;