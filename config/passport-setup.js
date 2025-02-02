const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const keys = require('./keys');
const User = require('../src/Models/User/userModel');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new FacebookStrategy({
        // options for facebook strategy
        callbackURL: '/auth/facebook/redirect',
        clientID: keys.facebook.clientID,
        clientSecret: keys.facebook.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // check is user already exists in our DB
        User.findOne({facebookId: profile.id})
            .then((currentUser) => {
                if(currentUser){
                    // allready have the user
                    console.log('user:id' + currentUser);
                    done(null, currentUser);
                }else{
                    // if not, create user in our DB
                    new User({
                        username: profile.displayName,
                        email: profile.id,
                        facebookId: profile.id
                    }).save().then((newUser) => {
                        console.log('new user created: ', newUser);
                        done(null, newUser);
                    });
                }
            })
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
    })
);

passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL: '/auth/google/redirect',
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        // check is user already exists in our DB
        User.findOne({googleId: profile.id})
            .then((currentUser) => {
                if(currentUser){
                    // allready have the user
                    console.log('user:id' + currentUser);
                    done(null, currentUser);
                }else{
                    // if not, create user in our DB
                    new User({
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        username: profile.displayName,
                        googleId: profile.id,
                        email:profile.id
                    }).save().then((newUser) => {
                        console.log('new user created: ', newUser);
                        done(null, newUser);
                    });
                }
            })
        // passport callback function
        console.log('passport callback function fired:');
        console.log(profile);
    })
);