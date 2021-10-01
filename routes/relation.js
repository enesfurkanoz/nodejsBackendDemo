const relService = require("../services/relationService");
const router = require("express").Router();
const authenticator = require("../services/authService").Verify;
const profileService = require("../services/profileService");

router.post("/",authenticator,(req,res)=>{
    relService.Create(req.user._id, req.body.TuserId,res);
});
router.post("/GetRelations",authenticator,async(req,res)=>{
    var relations = [];
    relService.getRels(req.user._id,(data)=>{
        data.forEach(element => {
            relations.push(element.vertex2);
        });
        res.status(200).send(relations);
    });
});
async function getData(id,cb) {
    cb(await profileService.getUserData(id,'username'));
}
router.post("/Delete",authenticator,(req,res)=>{
    relService.Delete(req.user._id, req.body.TuserId,res);
});

module.exports = router;