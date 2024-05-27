const express = require('express');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { Post, User, Comment } = require('./models');


const routes = require('./controllers');

const app = express();

const PORT = process.env.PORT || 3001;

const sessionConfigs = {
  secret: 'Super duper Changed Secret key',
  cookie: {
    maxAge: 1 * 60 * 60 * 1000, 
    httpOnly: true,
    secure: false,
    sameSite: 'strict'
  },
  
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
}

app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sessionConfigs));

const hbs = exphbs.create({});


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded( { extended: true}));

app.use(routes);

sequelize.sync({ force: false })
.then( () => {
  app.listen(PORT, () => console.log(`Now listening http://localhost:${PORT}`));
})

