const { authJwt } = require("../middlewares");
const { isAdmin } = require("../middlewares/authJwt");
const controller = require("../controllers/store_data.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/optimization/params/set", controller.postOptParams);
    
};
