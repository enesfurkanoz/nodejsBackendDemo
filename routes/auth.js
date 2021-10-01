const authRoute = require("express").Router();

const authService = require("../services/authService");


authRoute.post('/', async(req,res)=>{
    authService.Login(req.body,res);
});


module.exports = authRoute;