import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { createConnection } from 'typeorm';
import { schema } from '../Schema/index.schema';
import { Users } from '../models/Users';
export class Server {
  app: any;
  port?: number;
  constructor(){

    require('dotenv').config();
    this.app = express();
    this.settings();
    this.mySql();
    this.routes();
    this.graphql();
    this.listen();
  
  }

  settings(){

    this.app.set('port', process.env.PORT || 3000);
    this.app.set('DB_USERNAME', process.env.DB_USER);
    this.app.set('DB_PASSWORD', process.env.DB_PASS);
    this.app.set('DB_HOST', process.env.DB_HOST);
    this.app.set('DB_PORT', process.env.DB_PORT);
    
  }


  middlewares(){
    this.app.use()
  }


  routes(){
    this.app.get('/', (req: any, res: any)  => {res.send('INDEX')});
  }

  graphql(){

    this.app.use('/graphql', graphqlHTTP({
      graphiql: true,
      schema
    }))

  }

  async mySql(){

     await createConnection({
      type: 'postgres',
      username: this.app.get('DB_USERNAME'),
      password: this.app.get('DB_PASSWORD'),
      port: this.app.get('DB_PORT'),
      host: this.app.get('DB_HOST'),
      database: 'usersdb',
      entities: [Users],
      synchronize: true,
      ssl: false
    })
    console.log('DB Connected')
  }

  listen(){

    this.app.listen(this.app.get('port'), () => {
      console.log(`Server Up on port ${this.app.get('port')}`)
    })

  }
 

  }
