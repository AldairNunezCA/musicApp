const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const { usersModel } = require("../models");
const { tokenSign } = require('../utils/handleJwt');
const { token } = require('morgan');
const ENGINE_DB = process.env.ENGINE_DB


passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3001/api/v1/auth/login/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let existingUser;
                if (ENGINE_DB === 'nosql') {
                    existingUser = await usersModel.findOne({ email: profile.emails[0].value });
                } else {
                    existingUser = await usersModel.findOne({ where: { email: profile.emails[0].value } });
                }
                if (existingUser) {
                    const token = await tokenSign(existingUser);
                    return done(null,  {token, user: existingUser});
                } else {
                    const newUser ={
                        googleId: profile.id,
                        email: profile.emails[0].value,
                        name: profile.displayName
                    };
                    const user = await usersModel.create(newUser);
                    const token = await tokenSign(user);
                    done(null,  {token, profile});
                }
            } catch (err) {
                done(err, null);
            }
        }
    )
);

passport.use(
    new FacebookStrategy(
        {
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
            callbackURL: 'http://localhost:3001/api/v1/auth/login/facebook/callback',
            scope: ['email']
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let existingUser;
                console.log(profile)
                if (ENGINE_DB === 'nosql') {
                    existingUser = await usersModel.findOne({ email: profile.emails[0].value });
                } else {
                    existingUser = await usersModel.findOne({ where: { fbId: profile.id } });
                }
                if (existingUser) {
                    const token = await tokenSign(existingUser);
                    console.log('token', token)
                    return done(null, profile);
                } else {
                    const newUser ={
                        fbId: profile.id,
                        name: profile.displayName
                    };
                    await usersModel.create(newUser);
                    const token = await tokenSign(newUser);
                    console.log('token', token)
                    done(null, profile);
                }
            } catch (err) {
                done(err, null);
            }
        }
    )
);


passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});
module.exports = passport;