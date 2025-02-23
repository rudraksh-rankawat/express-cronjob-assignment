import express from 'express'
import crypto from 'crypto'

import User from '../models/user.js'


const router = express.Router();

router.post('/authenticate', async (req, res) => {
    const { username } = req.body;
    
    try {

        if (!username) {
            return res.status(400).json({ error: "Username is required" });
        }
        const token = crypto.randomBytes(16).toString('hex');
        let user = await User.findOne({ username });

        // if user doesn't exist, we create one and generate a token
        if (!user) {
            user = new User({ username, token });
            await user.save();
        }
        res.status(200).json({ message: 'User authenticated', token });
    } catch (error) {

        console.error("Error in /authenticate route:", error);
        res.status(500).json({ error: 'Server error...' });
    }

});


export default router;