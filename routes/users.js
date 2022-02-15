var express = require("express");
var router = express.Router();

function userRoutes(options) {
  const oidc = options.oidc;

  router.get("/", oidc.ensureAuthenticated(), function (req, res, next) {
    res.render("users/index", {
      loggedIn: true,
      title: "Express",
      user: req.userContext.userinfo,
    });
  });

  return router;
}

module.exports.userRoutes = userRoutes;
