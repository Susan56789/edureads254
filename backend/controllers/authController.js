const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const nodemailer = require('nodemailer');
const crypto = require('crypto');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required', success: false });
    }

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password', success: false });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password', success: false });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, success: true });
    } catch (error) {
        console.error('Internal server error:', error);
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

const requestPasswordReset = async (req, res) => {

    console.log('Request received for password reset');
    const { email } = req.body;
    const usersCollection = req.app.locals.users;

    const user = await usersCollection.findOne({ email });
    if (!user) {
        console.log('Email not found');
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
            console.log('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email' });
        }
        console.log('Reset token sent to email');
        res.status(200).json({ message: 'Reset token sent to email' });
    });




}

const resetPassword = async (req, res) => {

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


}

module.exports = { login, requestPasswordReset, resetPassword };



