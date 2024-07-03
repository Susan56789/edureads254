const express = require('express');
const { login } = require('../controllers/authController');
const asyncHandler = require('express-async-handler');
const nodemailer = require('nodemailer');
const crypto = require('crypto');


const router = express.Router();

router.post('/login', login);

router.post(
    '/request-password-reset',
    asyncHandler(async (req, res) => {
        const { email } = req.body;
        const usersCollection = req.app.locals.users;

        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Email not found' });
        }

        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // 1 hour from now

        await usersCollection.updateOne(
            { _id: user._id },
            { $set: { resetToken, resetTokenExpiry } }
        );

        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Password Reset',
            text: `You requested a password reset. Here is your reset code: ${resetToken}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).json({ message: 'Error sending email' });
            }
            res.status(200).json({ message: 'Reset token sent to email' });
        });
    })
);

router.post(
    '/reset-password',
    asyncHandler(async (req, res) => {
        const { email, resetToken, newPassword } = req.body;
        const usersCollection = req.app.locals.users;

        const user = await usersCollection.findOne({
            email,
            resetToken,
            resetTokenExpiry: { $gt: Date.now() },
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        await usersCollection.updateOne(
            { _id: user._id },
            { $set: { password: newPassword, resetToken: null, resetTokenExpiry: null } }
        );

        res.status(200).json({ message: 'Password reset successful' });
    })
);

module.exports = router;
