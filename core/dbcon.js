const userDB = require("mongoose");
const emv = require("dotenv");

emv.config();
userDB.connect(process.env.MODB_CONNECTIONSTRING,
    { useNewUrlParser: true },
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,   },
    ()=>{console.log("User Database connection has been created!!");
});
