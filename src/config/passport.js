// === src/config/passport.ts ===
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import { User } from '../module/users/user.model.js';

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
    const user = await User.findOne({ email });
    if (!user || !user.password) return done(null, false, { message: 'Invalid email or password.' });
    const isMatch = await bcrypt.compare(password, user.password);
    return isMatch ? done(null, user) : done(null, false, { message: 'Invalid email or password.' });
}));

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || "1036903181068-ugpfcsfvvhq41l0efftel54u59lr26gn.apps.googleusercontent.com",
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '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',
    callbackURL: '/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const email = profile.emails?.[0].value;
    let user = await User.findOne({ email });
    if (!user) {
        user = new User({ email, googleId: profile.id, provider: 'google' });
        await user.save();
    }
    return done(null, user);
}));
