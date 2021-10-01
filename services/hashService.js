const encryptor = require("bcrypt");
///Salts password and enrypts it.
module.exports.encrypt = (password, salt_rounds,cb) => {
    encryptor.genSalt(salt_rounds,(err,salt)=>{
        encryptor.hash(password,salt, (err,hash)=>{
            cb(hash);
        });
    });
}

module.exports.decrypt =  (enteredPassword, realPassword) =>{
    return encryptor.compare(enteredPassword,realPassword);
}
