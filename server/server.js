const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const app = express();
const { sequelize } = require('./models');
const PORT = process.env.PORT || 8080;

global.__basedir = __dirname;

const api = require('./api');

const corsOptions = {
  origin: 'http://localhost:1234',
};
app.use(logger('dev'));
app.use(cors(corsOptions));
app.use(express.json({ limit: '500mb' }));
app.use(express.urlencoded({ limit: '500mb', extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('../client/dist'));
}

app.use(express.static('public'));
app.use('/api', api);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`API server listening on http://localhost:${PORT}!`);
  });
});
