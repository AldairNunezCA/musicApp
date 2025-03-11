const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { usersModel } = require("../models");
const { tokenSign } = require('../utils/handleJwt')
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
                    done(null,  {token, user});
                }
            } catch (err) {
                done(err, null);
            }
        }
    )
);
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        let user;
        if (ENGINE_DB === 'nosql') {
            user = await usersModel.findOne({ _id: id });
        }
        else {
            user = await usersModel.findeOne({ where: { id } });
        }
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

module.exports = passport;