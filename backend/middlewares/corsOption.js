const options = {
  origin: [
    'http://mymesto.nomoredomains.club',
    'https://mymesto.nomoredomains.club',
    'http://api.mymesto.nomoredomains.club',
    'https://api.mymesto.nomoredomains.club',
    'http://localhost:3000',
  ],
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  preflightContinue: false,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'origin', 'Authorization'],
  credentials: true,
};

module.exports = options;
