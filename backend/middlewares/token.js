import jwt from 'jsonwebtoken';
import data from '../config/jwt.js';

let jwtSecret = data.secret;

const check = (req, res, next) => {
  try {
    let token = req.cookies.user;
    let decoded = jwt.verify(token, jwtSecret);
    let user_id = decoded.user_id;
    next()
  } catch (error) {
    res.status(401).redirect('/auth/login')
  }
}

export { check };
