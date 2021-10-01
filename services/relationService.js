const Relation = require("../models/relation");
const Vertex = require("../models/user");

async function createRelation(userId1,userId2,response) {
    //Check if the relation is existing in database for two of directions.
    const old1 = await Relation.findOne({vertex1: userId1, vertex2: userId2});
    const old2 = await Relation.findOne({vertex2: userId1, vertex1: userId2});
    if (old1 || old2) {
        response.status(400).send("This relation alredy exists!!");
    } else {
        try {
            const relation = new Relation({vertex1: userId1, vertex2: userId2});
            relation.save();
            response.status(200).send("Relation Created");
        } catch (error) {
            response.status(500);
        }
    }
}
async function deleteRelation(userId1,userId2,response) {
    try {
        const one = await Relation.findOneAndRemove({vertex1: userId1, vertex2: userId2});
        const two = await Relation.findOneAndRemove({vertex1: userId2, vertex2: userId1});
        if (one || two) {
            response.status(200).send("Relation has been deleted.");
        } else {
            response.status(404).send("Relation not found.");
        }
    } catch (error) {
        response.status(500);
    }
}

async function getRelatedVertices(start, cb){
    cb( await Relation.find({vertex1:start},'vertex2').exec());
}
module.exports.Create = createRelation;
module.exports.Delete =deleteRelation;
module.exports.getRels = getRelatedVertices;