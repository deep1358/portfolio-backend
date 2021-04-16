const jwt = require("express-jwt");
const jwksRsa = require("jwks-rsa");
const config = require("../config");
const request = require("request");

//Authentication middleware
//This will check access token in authorization headers of a request
//It will verify access token against Auth0 JSON web key set
exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: "https://deep-shah.us.auth0.com/.well-known/jwks.json",
  }),
  audience: "https://deep-shah.us.auth0.com/api/v2/",
  issuer: "https://deep-shah.us.auth0.com/",
  algorithms: ["RS256"],
});

exports.checkRole = (role) => (req, res, next) => {
  const user = req.user;
  // console.log(user);
  if (user && user[config.AUTH0_NAMESPACE + "/roles"].includes(role)) {
    next();
  } else {
    return res.status(401).send("Not Authorized to access resourse");
  }
};

exports.getAccessToken = () => {
  const options = {
    method: "POST",
    url: config.AUTH0_TOKEN_URL,
    headers: { "content-type": "application/json" },
    form: {
      grant_type: "client_credentials",
      client_id: config.AUTH0_CLIENT_ID,
      client_secret: config.AUTH0_CLIENT_SECRET,
      audience: config.AUTH0_AUDIENCE,
    },
  };

  return new Promise((resolve, reject) => {
    request(options, (err, res, body ) => {
      if (err) {
        return reject(new Error(err));
      }
      resolve(body ? JSON.parse(body) : "");
    });
  });
};

exports.getAuth0User = (accessToken, userId) => {
  const options={
    mothod:"GET",
    url:`${config.AUTH0_DOMAIN}/api/v2/users/${userId}?fields=name,picture,user_id`,
    headers:{'authorization':`Bearer ${accessToken}`}
  }
  return new Promise((resolve, reject) => {
    request(options, (err, res, body ) => {
      if (err) {
        return reject(new Error(err));
      }
      resolve(body ? JSON.parse(body) : "");
    });
  });
};
