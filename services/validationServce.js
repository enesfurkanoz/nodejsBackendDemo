const validator = require("@hapi/joi");

const UserRegistrationValidator = (reqData)=>{
    userRegScema = {
        username: validator.string().min(6).required(),
        password: validator.string().max(1024).required(),
        email: validator.string().min(8).max(50).email().required(),
        gender: validator.string().valid("female", "male","undefined"),
        PhotoURL: validator.string(),
        phone: validator.string().length(10),
        location: validator.string().max(100)
    }
    return validator.validate(reqData,userRegScema);
}
const UserUpdateValidator = (reqData)=>{
    userRegScema = {
        username: validator.string().min(6),
        password: validator.string().max(1024),
        email: validator.string().min(8).max(50).email(),
        gender: validator.string().valid("female", "male","undefined"),
        PhotoURL: validator.string(),
        phone: validator.string().length(10),
        location: validator.string().max(100)
    }
    return validator.validate(reqData,userRegScema);
}

const UserLoginValidator = (req)=>{
    userLogScema = {
        password: validator.string().max(1024).required(),
        email: validator.string().min(8).max(50).required(),
    }
    return validator.validate(req, userLogScema);
}

module.exports.RegValidator = UserRegistrationValidator;
module.exports.LogValidator = UserLoginValidator;
module.exports.UpdateValidator = UserUpdateValidator;