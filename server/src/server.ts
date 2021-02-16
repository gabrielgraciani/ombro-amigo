import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import '@shared/database';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';

import routes from '@shared/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(process.env.PORT || 3333, () => {
  console.log(`server started on port ${process.env.PORT || 3333}`);
});