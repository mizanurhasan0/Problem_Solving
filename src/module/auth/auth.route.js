import { Router } from 'express';
import passport from 'passport';
import { login, logout, register } from './auth.controller.js';


const router = Router();

router.post('/register', register);
router.post('/login', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: 'Internal server error' });
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        req.user = user;
        next();
    }
    )(req, res, next);
}, login);
router.get('/logout', logout);

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { session: false }), login);

export default router;
