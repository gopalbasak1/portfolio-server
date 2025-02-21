import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import router from './app/routes';
import globalErrorHandler from './app/middleware/globalErrorhandler';
import notFound from './app/middleware/notFound';

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

// Parse CORS origins from .env
const allowedOrigins = process.env.CORS_ORIGIN?.split(',') || [];
app.use(
  cors({
    origin: allowedOrigins, // Dynamically use environment variable
    credentials: true,
  }),
);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
  res.send({
    status: true,
    message: 'Portfolio Sever is running! 🏃‍♀️‍➡️🏃‍♀️‍➡️🏃‍♀️‍➡️',
  });
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
