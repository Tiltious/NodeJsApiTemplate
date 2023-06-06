const { authJwt } = require("../middlewares");
const { isAdmin } = require("../middlewares/authJwt");
const controller = require("../controllers/get_data.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });
    app.post("/api/documents/all", controller.allNewValsAccess);
    app.post("/api/documents/name/all", controller.selectAccess);
    app.post("/api/documents/name/dated", controller.selectDatedAccess);
    app.post("/api/documents/name/harddated", controller.selectDatedAccessHard);

};
