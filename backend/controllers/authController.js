const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ message: 'Invalid email or password', success: false });
        }

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password', success: false });
        }

        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ token, success: true });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error', success: false });
    }
};

module.exports = { login };
