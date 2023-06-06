const db = require("../models");
const StorageCollectionModel = db.optparams;

// Store document
exports.postOptParams = (req,res)=>{
    const model = new StorageCollectionModel({
        "Name":req.body.Name,
        "Settings":req.body.Settings,    
        "Timestamp":req.body.Timestamp,    
    });
    model.save((err, response) => {
        if (err) {res.status(500).send(err);return;}
        res.status(200).send({
            id: response._id,
            Name: response.Name,
            Settings: response.Settings,
            Timestamp: response.Timestamp
        });
    });
}