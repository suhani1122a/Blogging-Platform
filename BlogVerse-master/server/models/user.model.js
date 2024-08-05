const { default: mongoose } = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        minlength: 3,
        maxlength: 20,
        required: true,
        validate: {
            validator: (value) => {
              const regex = /^[a-zA-Z0-9_]+$/; // Allow alphanumeric and underscores
              return regex.test(value);
            },
            message: 'Username must be alphanumeric and between 3-20 characters'
        }
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (value) => {
              const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // example@email.com - valid email
              return emailRegex.test(value);
            },
            message: 'Please enter a valid email address.'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        validate: {
        validator: (value) => {
            const hasUppercase = /[A-Z]/.test(value);
            const hasLowercase = /[a-z]/.test(value);
            const hasSpecialChar = /[!@#$%^&*_]/.test(value);
            return hasUppercase && hasLowercase && hasSpecialChar;
        },
        message: 'Password must be at least 8 characters and contain at least one uppercase, one lowercase, and one special character (!@#$%^&*)',
        }
    },
    phoneNumber: {
        type: String,
        reqiured: true,
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)