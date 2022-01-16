import jwt from 'jsonwebtoken';
import data from '../config/jwt.js';

import { comparePassword, grantToken } from '../services/users.serv.js';


import { loadUserinfo } from '../models/users.model.js';

let jwtSecret = data.secret;


export async function login (req, res) {
    let user_id = req.body.user_id;
    let user_pw = req.body.user_pw;

    let data = await loadUserinfo(user_id)
    let result = await comparePassword(user_pw, data.user_pw)
    
    if (result.status) {
        let createdToken = await grantToken(user_id);
        res.cookie('user', createdToken);
        res.status(200).json({status:1})
    } else {
        res.status(200).json({status:0})
    }

}
