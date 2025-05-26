
import bcrypt from 'bcryptjs';
import { User } from '../users/user.model.js';
import { generateToken } from '../../utils/generateToken.js';


export const register = async (req, res) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, provider: 'local' });
    await user.save();

    const token = generateToken(user._id.toString());
    res.cookie('token', token, { httpOnly: true });
    return res.status(201).json({ user, token });
};

export const login = async (req, res) => {
    console.log(req);
    const user = req.user;
    const token = generateToken(user._id.toString());
    res.cookie('token', token, { httpOnly: true });
    return res.status(200).json({ user, token });
};

export const logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out successfully.' });
};

