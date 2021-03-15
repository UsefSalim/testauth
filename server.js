require('dotenv').config({ path: './config/.env' });
// packages
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.routes');
const dashRoutes = require('./routes/dash.routes');

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

process.env.NODE_ENV === 'developpement' && app.use(morgan('tiny'));

// Db Connexion
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Mongo Db Connected'))
  .catch((err) => console.log(`error connection to the DataBase : ${err}`));

// Routes

app.use(authRoutes);
app.use('/dashboard', dashRoutes);
// app express
app.listen(PORT, () => {
  console.log(`app listning : localhost:${PORT}`);
});
