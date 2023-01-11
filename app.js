import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';

import immoRouter from './routes/immo.js';

dotenv.config();
const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(morgan('tiny'));
app.use(express.json());
app.use('/', immoRouter);
app.use(express.static('./public'));

const dirname = path.resolve();

app.get('*', (req, res) =>
	res.status(404).sendFile(path.join(dirname, 'error/404-error.webp'))
);

const PORT = process.env.PORT ?? 5555;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
console.log('Server started');
