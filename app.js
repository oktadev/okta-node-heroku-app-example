require('dotenv').config({ path: '.okta.env' })

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

const session = require("express-session");
const { ExpressOIDC } = require("@okta/oidc-middleware");

var app = express();

// session support is required to use ExpressOIDC
app.use(
  session({
    secret: "this should be secure",
    resave: true,
    saveUninitialized: false,
  })
);

const { OKTA_OAUTH2_ISSUER, OKTA_OAUTH2_CLIENT_ID, OKTA_OAUTH2_CLIENT_SECRET, APP_BASEURL } = process.env;

const oidc = new ExpressOIDC({
  issuer: OKTA_OAUTH2_ISSUER,
  client_id: OKTA_OAUTH2_CLIENT_ID,
  client_secret: OKTA_OAUTH2_CLIENT_SECRET,
  appBaseUrl: APP_BASEURL,
  redirect_uri: `${APP_BASEURL}/authorization-code/callback`,
  scope: "openid profile",
});

// ExpressOIDC attaches handlers for the /login and /authorization-code/callback routes
app.use(oidc.router);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.static(__dirname + "/node_modules/bootstrap/dist"));

app.use("/", indexRouter);
app.use("/users", usersRouter.userRoutes({ oidc: oidc }));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
