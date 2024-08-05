const Joi = require("joi");

const validateUser = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string()
                    .alphanum()
                    .min(3)
                    .max(20)
                    .required()
                    .error(new Error('Invalid username\n- username must be alphanumeric\n- username should be 3 to 20 characters long')),
        
        email: Joi.string()
                .email()
                .required()
                .error(new Error('Invalid email address')),
        
        password: Joi.string()
                    .min(8)
                    .required()
                    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_]).{8,}$'))
                    .error(new Error('Invalid Password.\n- Password should be at least 8 characters long\n- Password should have at least one uppercase letter\n- Password should have at least one lowercase letter\n- Password should have at least one special character')),

        phoneNumber: Joi.string()
                        .required()
                        .error(new Error('Phone number is required'))
    });

    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ message: error.message });
    }

    next();
}

module.exports = validateUser;