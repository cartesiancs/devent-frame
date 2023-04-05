import path from 'path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default 
{
    "entry":["./client/src/index.js"],
    "watch": true,
    "module": {
        "rules": [
            {
                "test": /\.jsx?/,
                "loader": 'babel-loader',
                "options": {
                    "presets": ['@babel/preset-env', '@babel/preset-react']
                }
            },
            {
                "test": /\.css$/,
                "use": ['style-loader', 'css-loader']
            }
        ],
    },

    "output": {
        "filename": "index.js",
        "path": path.resolve(__dirname, 'client/dist'),
        "library": "main"
    }
}