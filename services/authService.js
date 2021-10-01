const jwt = require("jsonwebtoken");
const conf = require("dotenv");
const decryptor = require("./hashService");
const dataValidator = require("./validationServce");
const User = require("../models/user");
conf.config();
async function authenticate(userData, response) {
    const {error} = dataValidator.LogValidator(userData) // validate login data
    if (!error) {
        //check if email is exists
        const user = await User.findOne({email: userData.email});//check if email is exists.
        if (!user) {
            response.status(400).send("Email or Password is wrong.");
        } else {
            const validPass = await decryptor.decrypt(userData.password, user.password);
            if (!validPass) {
                response.status(400).send("Email or Password is wrong")
            } else {
                const token = jwt.sign({_id: user._id }, process.env.TOKEN_SIGN);
                response.header("auth-token", token).send(token);
            }
        }
    } else {
        response.status(400).send(error.details[0].message);
        //Conduct the error message from joi validation api to response
    }
}
async function verify(data,response,next) {
    const accessToken = data.header("auth-token");//Get the token from request
    if (!accessToken) 
    {//If req does not have token
        response.status(401).send("Access Denied!");
    } else {
        try {
            const user = jwt.verify(accessToken,process.env.TOKEN_SIGN); //Get user id from token
            data.user = user;// Put id to the request for use from http methods.
            next();
        } catch (error) {
            response.status(401).send("Access Denied!");
        }
    }
}
module.exports.Login = authenticate;
module.exports.Verify = verify;