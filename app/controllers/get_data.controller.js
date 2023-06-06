const db = require("../models");
var mqtt = require('mqtt');

// Models from mongo collections
const NewValues = db.newvalues;
const Variable = db.variable;
let client;

brokerConnection = ()=>{
    var options = {
        host: 'localhost',
        port: 1883,
        protocol: 'mqtt',
        username: 'username',   
        password:"password",
        rejectUnauthorized: false, 
    }
    client = mqtt.connect(options);
    client.on('connect', function () {
    console.log('Connected',this.client.options.username);
    client.publish('my/test/topic', JSON.stringify(values[i]))
    });

}
// initialize the MQTT client

// Get all stored documents
exports.allNewValsAccess = (req, res) => {
    NewValues.find({}).exec((err,docs)=>{
        if(err){res.status(500).send({message:err});return;}
        if(!docs.length){res.status(404).send({message:'Not Found'});return;}      
        res.status(200).json(docs)
    });
};

// Hardcoded daterange search which can be used for a fake realtime data generator 
exports.selectDatedAccessHard = (req,res)=>{
    NewValues.find().where('times').gte('2021-12-01').lte('2021-12-02').select({
      // Selects attributes out of the response
        _id:0, 'attr_name':1, 'times':1
    })
    .sort({'times':1}).exec(
        (err,docs)=>{
            if(err){res.status(500).send({message:err});return;}
            if(!docs.length){res.status(404).send({message:'Not Found'});return;}
            res.status(200).send(docs)
            return;
        }
    );
}

// Finds requested variables's name from VariablesCollection and then finds and returns ALL variable's values from ValuesCollection sorted by time.
// A better way can be found maybe with findOne
exports.selectAccess = (req, res) => {
    Variable.find({Variablename:req.body.Variablename}).exec((err,docs)=>{
        if(err){res.status(500).send({message:err});return;}
        if(!docs.length){res.status(404).send({message:'Not Found'});return;}
        NewValues.find().select([docs[0].Variablename,'times']).sort({'times':1}).then(
            (values)=>{
                const result=[];
                for(let i in values){result.push(values[i]);}          
                res.status(200).json(result);
            });
        })
}

// Finds requested variables's name from VariablesCollection and then finds and returns DATED variable's values for the requested dates from ValuesCollection sorted by time.
// A better way can be found maybe with findOne
exports.selectDatedAccess = (req, res) => {
    Variable.find({Variablename:req.body.Variablename}).exec((err,vars)=>{
        if(err){res.status(500).send({message:err});return;}
        if(!docs.length){res.status(404).send({message:'Not Found'});return;}
        NewValues
            .where('times').gte(req.body.Startdate).lte(req.body.Enddate)
            .select([docs[0].Variablename,'times'])
            .sort({'times':'asc'})
            .then((values)=>{
                res.status(200).json(values);
            });
    })
};