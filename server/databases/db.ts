import { createConnection } from 'mysql2';
import data from '../config/database.js';

const conn = createConnection({
  host     : data[process.env.NODE_ENV].host,
  user     : data[process.env.NODE_ENV].username,
  password : data[process.env.NODE_ENV].password,
  database : data[process.env.NODE_ENV].database,
  multipleStatements: true 
});

export default conn;