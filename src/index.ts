import 'colors';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import Express, { json, urlencoded } from 'express';
import morgan from 'morgan';
import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import { AuthControllers, PostsControllers } from './controllers';
import { connectDB, IS_PROD, NODE_ENV, PORT } from './utils';

connectDB()
  .then(() => {
    const app = Express();
    app.use(morgan('dev'));
    app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));
    app.use(cookieParser());
    app.use(json());
    app.use(urlencoded({ extended: false }));
    useExpressServer(app, {
      development: !IS_PROD,
      routePrefix: '/api',
      controllers: [PostsControllers, AuthControllers],
      cors: true,
    }).listen(PORT, () => {
      console.log(
        `Server up & running in ${
          NODE_ENV.bgGreen.black
        } mode & is listening for requests at ${
          'http://localhost:${PORT}/api'.rainbow.underline
        }`,
      );
    });
  })
  .catch((error: Error) => {
    switch (error.name) {
      case 'unhandledRejection':
        console.log(
          '👋UNHANDLED REJECTION! 💥Shutting down gracefully'.red.bold,
        );
        break;

      case 'SIGTERM':
        console.log('👋SIGTERM RECEIVED! 💥Shutting down gracefully'.red.bold);
        break;

      default:
        console.log(`${error.name} : ${error.message}`.bgRed.white.bold);
    }
    process.exit(1);
  });
