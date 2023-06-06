const mongoose = require('mongoose')
const optparams = mongoose.model(
    'optimizationmodel', 
    new mongoose.Schema({
        "Name":String,
        "Settings":{},
        "Timestamp":Date,
    }));
module.exports = optparams;