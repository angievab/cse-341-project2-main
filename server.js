const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors')

const app = express(); 
const port = process.env.PORT || 3000;

app
    .use(bodyParser.json())
    /// PARSE JSON REQUESTS
    .use(session({ 
        secret: "secret", 
        resave: false, 
        saveUninitialized: true,
    }))
  //This is the basic express session({..}) initialization.
  .use(passport.initialize())
  //init passport on every route call.
  .use(passport.session())
  // allow passport to use "express-session".
  .use((req, res, next) => {   
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Z-key, Authorization'
    );
    // res.setHeader('Content-Type', 'application/json');
    res.setHeader('Accesss-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
})
.use(cors({methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']}))
    .use(cors({origin: '*' }))
    //anterior index.js
    .use('/', require('./routes/index'));

    passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
      // User.findOrCreate({ githubId: profile.id }, function (err, user) {
      return done(null, profile);
      // });
  }
  ));
//user o pokedex?
  passport.serializeUser((user, done) => {
    done(null, user);
}
);
passport.deserializeUser((user, done) => {
    done(null, user);
  });
//userName
app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : 'Logged Out'); });

  app.get('/github/callback', 
    passport.authenticate('github', { 
    failureRedirect: '/api-docs', 
    session: false }),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    });

mongodb.initDb((err, mongodb) => {
    if(err) {
        console.log(err);
    }
    else {
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`)});
    }
});
