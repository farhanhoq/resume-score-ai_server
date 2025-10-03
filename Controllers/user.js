const user = require('../Models/user');

exports.register = async (req, res) => {
    try {
        const { email, name, photoURL } = req.body;
        const userExist = await user.findOne({ email });
        if (userExist) {
            return res.status(200).json({ message: 'Welcome Back', user: userExist });
        }
        const newUser = new user({ email, name, photoURL });
        await newUser.save();
        res.status(200).json({ message: 'User registered successfully', user: newUser });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ error: 'Server Error',message: err.message });
    }
};
