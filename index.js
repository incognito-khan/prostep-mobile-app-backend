const express = require('express');
const moongoose = require('mongoose');
const User = require('./models/user');
const bodyParser = require('body-parser');

const app = express();

moongoose.connect('mongodb://localhost:27017/ProStep', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use(bodyParser.json());

app.post('/signup', async (req,res) => {
    const { name, email, password, phone, CNIC } = req.body;
    const user = new User({ name, email, password, phone, CNIC });

    try{
    if (!name || !email || !password || !phone || !CNIC) {
        res.status(401).json({ status: 'Invalid Credentials' });
    }
    else if (name.length < 6) {
        res.status(401).json({ status: 'Name too short' });
    }
    else if (email.length < 6 || email.indexOf('@') === -1 || email.indexOf('.') === -1) {
        res.status(401).json({ status: 'Invalid Email' });
    }
    else if (password.length < 8) {
        res.status(401).json({ status: 'Password too short' });
    }
    else if (phone.length !== 11) {
        res.status(401).json({ status: 'Invalid Phone Number' });
    }
    else if (CNIC.length < 13) {
        res.status(401).json({ status: 'Invalid CNIC' });
    }
    else {
        user.save();
        console.log(user);
        res.status(201).json({ status: 'ok' });
    }
}
catch (error) {
    res.status(500).json({ status: 'error' });
}
})

app.post('/login', async (req,res) => {
    const { email, password } = req.body;
    const user = await User.findOne ({ email, password });
    
    try{
        if(!user) {
            res.status(401).json({ status: 'User not found!' });
        }
        else {
            res.status(200).json({ status: 'User Login' });
            console.log(user);
        }
    }
    catch (error) {
        res.status(500).json({ status: 'error' });
    }
});




const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})