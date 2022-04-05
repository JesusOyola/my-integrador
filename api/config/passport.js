/* const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const localStrategyInstance = new localStrategy(
  {
    usernameField: "email",
    passwordField: "password",
  },
  async function (email, password, done) {
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      } else {
        const match = await user.matchPassword(password);
        if (match) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      }
    } catch (error) {
      done(error);
    }
  }
);

const serializeUserCb = (user, done) => {
  done(null, user.id);
};

const deserializeUserCb = (id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
};

module.exports = { localStrategyInstance, serializeUserCb, deserializeUserCb }; */

const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

const localStrategyInstance = new localStrategy(
  
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne( { email } )
        .then((user) => {
          if (!user) {
            // email not found
            return done(null, false);
          }

          user.matchPassword(password).then((bool) => {
            if (!bool ) {
              return done(null, false); // wrong password
            }

            return done(null, user); // success :D
          });
        })
        .catch(done); // done(err)
    }
  )

const serializeUser = function (user, done) {
  done(null, user.id);
};

const deserializeUser = function (id, done) {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch(done);
};

module.exports = { localStrategyInstance, serializeUser, deserializeUser };