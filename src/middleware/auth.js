const jwt = require('jsonwebtoken');
const dotENV = require('dotenv');
dotENV.config();

exports.authenticate = (req, res, next) => {
  try {
    
    let token = req.headers["x-api-key"];
    
    if (!token) return res.status(400).send({ status: false, msg: "token must be present" });

    let decodedToken = jwt.verify(token, 'dsfhkdshfksd164161dsfsdf46ds4f6ds4f');

    if (!decodedToken) return res.status(401).send({ status: false, msg: "token is invalid" });
    req.decodedToken = decodedToken;
    next();
  }
  catch (error) {
    res.status(500).send({ staus: false, msg: error });
  }
}


exports.authorize = function (req, res, next) {
  try {
    let token = req.headers["x-api-key"];
   
    
    if (!token) return res.status(400).send({ status: false, msg: "token must be present" });
    
    let decodedToken = jwt.verify(token, 'dsfhkdshfksd164161dsfsdf46ds4f6ds4f');
    
    if (!decodedToken)
      return res.status(401).send({ status: false, msg: "token is invalid" });
    
    if (req.params.userId == decodedToken.UserId) 
      return next();
    else return res.status(403).send({ status: false, msg: "you are not authorised !" });

  } catch (error) {
    return res.status(500).send({ msg: error.message })
  }
}