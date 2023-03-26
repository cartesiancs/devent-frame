import "reflect-metadata";
import { DataSource } from "typeorm";
import { createConnection } from 'mysql2';

import data from '../config/database.js';

import { User } from './entity/User.js'
import { Feed } from './entity/Feed.js'

const MySQLConnect = createConnection({
  host     : data[ process.env.NODE_ENV ].host,
  user     : data[ process.env.NODE_ENV ].username,
  password : data[ process.env.NODE_ENV ].password,
  database : data[ process.env.NODE_ENV ].database,
  multipleStatements: true 
});


const AppDataSource = new DataSource({
  type: "mysql",
  host: data[ process.env.NODE_ENV ].host,
  port: data[ process.env.NODE_ENV ].port,
  username: data[ process.env.NODE_ENV ].username,
  password: data[ process.env.NODE_ENV ].password,
  database: data[ process.env.NODE_ENV ].database,
  synchronize: true,
  logging: true,
  entities: [ User, Feed ],
  subscribers: [],
  migrations: [],
})

AppDataSource.initialize()
.then(() => {
    // here you can start to work with your database
})
.catch((error) => console.log(error))

export { MySQLConnect, AppDataSource };