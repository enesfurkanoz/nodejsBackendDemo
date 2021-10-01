const User = require("../models/user");
const dataValidator = require("./validationServce");
const encryptor = require("./hashService");




///Function for user registration
async function registerUser(userData,response) {
    const {error} = dataValidator.RegValidator(userData);
    if(!error)//check if the data is valid.
    {
        const existing = await User.findOne({email: userData.email});
        if (!existing) //Check if the enail is used berfor.
        {
            encryptor.encrypt(userData.password, 10, (hashedPassword) =>{
                //Create an instansce of or User scema
                const user = new User({
                    username: userData.username,
                    password: hashedPassword,
                    email: userData.email,
                    gender:userData.gender
                });
            sendToDatabase(user,response);
            });
        } else {
            response.status(400).send("Another user has alredy registered with this email.!!!");
        }
    }else{
        response.status(400).send(error.details[0].message);
    }
}


async function updateUser(data, response,userId) {
    const {error} = dataValidator.UpdateValidator(data);
    if (error) {
        response.status(400).send(error.details[0].message);//chack the data if it is valid
    } else {
        if(data.password){
            encryptor.encrypt(data.password, 10, (hashedPassword) =>{
                data.password = hashedPassword;
                updateUserById(userId,data);
                response.status(200).send("Updated");
            });
        }else{           
            updateUserById(userId,data);
            response.status(200).send("Updated");
        }
    }
}

async function getUserData(userId) {
    return await User.findById(id=userId);
}

///Gets required user profile data.
async function getUserData(userId,infoList) {
    return await User.findById(id=userId, infoList);
}
async function deleteUserById(userId) {
    try {
        return await User.findByIdAndRemove(userId);
    } catch (error) {
        return null;
    }
}

async function updateUserById(userId,data) {
    try {
         return await User.findByIdAndUpdate(userId,data);
    } catch (error) {
        return null;
    }
}
///Creates a user registraiton in the database
function  sendToDatabase(user, respond){
    try {
        user.save();
        respond.send("User has been created successfully");
    } catch (err) {
        respond.status(400).send(err);
    }
}



module.exports.createProfile = registerUser;
module.exports.getUserData = getUserData; 
module.exports.deleteUser = deleteUserById;
module.exports.update = updateUser;
