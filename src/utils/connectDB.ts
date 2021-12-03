import { createConnection } from 'typeorm';
import { Post, User } from '../entities';
import { DB_URI, IS_PROD } from './constants';

export default function connectDB() {
  return createConnection({
    type: 'postgres',
    url: DB_URI,
    logging: !IS_PROD,
    synchronize: !IS_PROD,
    entities: [Post, User],
  })
    .then((conn) => {
      console.log(
        `\nConnected to the ${conn.name} PostgreSQL DataBase...`.america.bold,
      );
    })
    .catch((error) => {
      console.log(error.message.red);
      process.exit(1);
    });
}
