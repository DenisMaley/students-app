module.exports = function (app) {
    require("./home")(app);
    require("./signin")(app);
    require("./projects")(app);
};