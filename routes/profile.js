const route = require("express").Router();
const authenticator = require("../services/authService").Verify;
const profileService = require("../services/profileService");

route.post('/', async(req,res)=>{
    profileService.createProfile(req.body, res);
});

route.post('/GetProfile',authenticator,async(req,res)=>{
    const userProfile = await profileService.getUserData(req.user._id);
    res.status(200).send(userProfile);
} );
///Gets only required user data.
route.post('/GetProfile/filter/:infolist',authenticator,async(req,res)=>{
    if(req.params.infolist.includes("password")){
        res.status(401).send("Access Denied");
    }else{
        const userProfile = await profileService.getUserData(req.user._id,req.params.infolist);
        res.status(200).send(userProfile);
    }

} );
route.post('/GetProfile/:id/:infolist',authenticator,async(req,res)=>{
    if (req.params.infolist.includes("password")) {
        res.status(401).send("Access Denied");
    } else {
        const userProfile = await profileService.getUserData(req.params.id,req.params.infolist);
        res.status(200).send(userProfile);
    }
} );
///Deletes a user
route.post('/Delete',authenticator,async(req,res)=>{
    const deleted = await profileService.deleteUser(req.user._id,res);
    if(deleted){
        res.status(200).send("account deleted");
    }else{
        res.status(500);
    }
} );
route.post('/Update',authenticator,async(req,res)=>{
    await profileService.update(req.body,res,req.user._id);
} );


module.exports = route;