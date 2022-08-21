import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default 
{
    "entry":["./client/public/js/main.js"],
    "watch": true,
    "output": {
        "filename": "index.js",
        "path": path.resolve(__dirname, 'client/dist'),
        "library": "main"
    }
}