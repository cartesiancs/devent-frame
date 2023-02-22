import jwt from 'jsonwebtoken';
import data from '../config/jwt.js';

let jwtSecret = data.secret;

const tokenMiddleware = {
  check: (req, res, next) => {
    try {  
      let token = req.headers['x-access-token'];
      if (!token) {
        return res.status(401).json({status:0,msg:"토큰 실종"})
      }
    
  
      let decoded = jwt.verify(token, jwtSecret);
      let userId = decoded.user_id;
      next()
    } catch (error) {
      res.status(401).json({status:0,msg:"증명 에러"})
    }
  }
}


export { tokenMiddleware };
