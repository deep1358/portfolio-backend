const jwt = require("express-jwt")
const jwksRsa = require("jwks-rsa")
const config = require("../config/dev")

//Authentication middleware
//This will check access token in authorization headers of a request
//It will verify access token against Auth0 JSON web key set
exports.checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: 'https://deep-shah.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://deep-shah.us.auth0.com/api/v2/',
  issuer: 'https://deep-shah.us.auth0.com/',
  algorithms: ['RS256']
})

exports.checkRole = (role)=>(req,res,next) =>{
  const user = req.user
  // console.log(user);
  if(user && user[config.AUTH0_NAMESPACE+'/roles'].includes(role)){
    next()
  }else{
    return res.status(401).send("Not Authorized to access resourse")
  }
  
}