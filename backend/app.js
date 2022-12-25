const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
// const cors = require('cors');
const routerAuth = require('./routes/auth');
const router = require('./routes/index');
const { notFoundError } = require('./utils/notFoundError');
const { limiter } = require('./middlewares/limiter');
const auth = require('./middlewares/auth');
const { handleErrors } = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routerCrash = require('./errors/CrashTest');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

// parser
app.use(cookieParser());

// CORS
// const options = {
//   origin: [
//     'http://mymesto.nomoredomains.club/',
//     'https://mymesto.nomoredomains.club/',
//     'http://localhost:3000',
//   ],
//   methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
//   credentials: true,
// };
// const allowedCors = [
//   'http://mymesto.nomoredomains.club/',
//   'https://mymesto.nomoredomains.club/',
//   'http://api.mymesto.nomoredomains.club/',
//   'https://api.mymesto.nomoredomains.club/',
//   'http://localhost:3000',
// ];
// const corsOptions = {
//   origin: true,
//   methods: ['POST', 'GET', 'PATCH', 'DELETE'],
//   optionsSuccessStatus: 200,
//   credentials: true,
//   maxAge: 3600,
// };

// app.options('*', cors());
// app.use('*', cors(options));

// protection
app.use(helmet());
app.use(limiter);

// requests logger
app.use(requestLogger);

// crash test
app.use(routerCrash);
// routes
app.use(routerAuth);
app.use(auth, router);
app.use('*', notFoundError);

// errors logger
app.use(errorLogger);

// errors validation
app.use(errors());
app.use(handleErrors);

async function start() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start();
