import jwt from 'jsonwebtoken';
import data from '../config/jwt.js';

import { comparePassword, grantToken, decodeToken } from '../services/users.serv.js';


import { loadUserinfo } from '../models/users.model.js';

let jwtSecret = data.secret;


export async function login (req, res) {
    let user_id = Buffer.from(req.body.user_id, "base64").toString('utf8');
    let user_pw = Buffer.from(req.body.user_pw, "base64").toString('utf8');

    let data = await loadUserinfo(user_id)
    let result = await comparePassword(user_pw, data.user_pw)
    
    if (result.status == 1 && data.user_auth == 1) {
        let createdToken = await grantToken(user_id);
        res.status(200).json({status:1, token:createdToken})
    } else if (data.user_auth == 0) {
        res.status(401).json({status:-1})
    } else {
        res.status(401).json({status:0})
    }

}

export async function me (req, res) {
    let token = req.headers['x-access-token'];
    let data = await decodeToken(token)
    
    res.status(200).json({status:1, user_id:data})

}