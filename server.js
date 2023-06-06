const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const db = require("./app/models");
const PORT = process.env.PORT || 8080;
var corsOptions = {origin: ["http://160.40.52.243:4200","http://localhost:4200","http://localhost","http://160.40.52.243:80","http://160.40.52.243","http://160.40.52.243:8080" ]};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Database connection
db.mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => {
    console.log("Successfully connect to MongoDB.");    
    initial(); // Broker connection
  })
  .catch(err => {
    console.error("Connection error", err);
    // process.exit();
  });

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/get_data.routes")(app);
require("./app/routes/store_data.routes")(app);

app.get("/", (req, res) => {res.json({ message: "Welcome to BOSK application." });});
app.listen(PORT, () => {console.log(`Server is running on port ${PORT}.`)});

// Broker connection
function initial(){
    var mqtt = require('mqtt');
    var options = {
        host: '160.40.52.243',
        port: 1883,
        protocol: 'mqtt',
        username: 'siroko_nodejs',
        password:"siroko_nodejs_psw",
        rejectUnauthorized: false, 
    }
    // initialize the MQTT client
    var client = mqtt.connect(options);
    client.on('connect', function () {
        console.log('Connected',client.options.username);
    });
    client.on('error', function (error) {console.log(error);});
    client.on('message', function (topic, message) {console.log('Received message:', topic, message.toString());});
    client.subscribe('my/test/topic');
    client.subscribe('my/test/topic/answer');
    client.end(false,[],()=>{console.log('disconnected')});
}