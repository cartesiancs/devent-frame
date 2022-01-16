import jwt from 'jsonwebtoken';
import data from '../config/jwt.js';

import { encryptPassword, checkAvailableUser, grantToken } from '../services/users.serv.js';


import { createUser } from '../models/users.model.js';

let jwtSecret = data.secret;

// create / load / edit / delete


export async function create (req, res) {
    let user_id = req.body.user_id;
    let user_pw = req.body.user_pw;
    let user_email = req.body.user_email;

    let is_available = await checkAvailableUser({user_id, user_email})

    if (String(user_pw).length <= 7) {
        return res.status(200).json({status: 2})
    }
    if (is_available == 0) {
        return res.status(200).json({status:0})
    }

    let user_hash_pw = await encryptPassword(user_pw)

    let user = { user_id, user_hash_pw, user_email }
    let data = await createUser(user)
    let createdToken = await grantToken(user_id);

    res.cookie('user', createdToken);
    res.status(200).json({status:1, data:data})
}