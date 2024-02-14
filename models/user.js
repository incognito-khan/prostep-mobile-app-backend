const moongose = require('mongoose');

const userSchema = new moongose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    phone: {
        type: String,
        required: [true, 'Phone is required'],
    },
    CNIC: {
        type: String,
        required: [true, 'CNIC is required'],
    }
    }
);

module.exports = moongose.model('User', userSchema);