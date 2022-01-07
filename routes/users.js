var express = require("express");
var router = express.Router();

function userRoutes(options) {
  const oidc = options.oidc;

  router.get("/", oidc.ensureAuthenticated(), function (req, res, next) {
    res.send("respond with a resource");
  });

  return router;
}

module.exports.userRoutes = userRoutes;
