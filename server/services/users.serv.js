import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import data from '../config/jwt.js';
import { checkDuplicateUser } from '../models/users.model.js';


let saltRounds = 10;
let jwtSecret = data.secret;

export async function encryptPassword(user_pw) {
    try {
      
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(user_pw, saltRounds, function(err, hash) {
            if (err) reject(err)
            resolve(hash)
          });
        })
      
        return hashedPassword
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function comparePassword(user_pw, user_hash_pw) {
    try {
        let hash = user_hash_pw.replace('$2y$', '$2a$');
        const isCorrect = await new Promise((resolve, reject) => {
            bcrypt.compare(user_pw, hash, function(err, correct) {
                if (correct == true) {
                    resolve({
                        status: 1
                    })
                } else {
                    resolve({status: 0})
                }
            });
        })
      
        return isCorrect
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function grantToken(user_id) {
    try {
        const jwt_token = await new Promise((resolve, reject) => {
            let token = jwt.sign({
                user_id: user_id
            }, jwtSecret, {
                expiresIn: '7d'
            });
            resolve(token)
        })
      
        return jwt_token
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function checkAvailableUser(user) {
    try {
        let { user_id, user_email } = user
        let is_available = 1
        let is_duplicate = await checkDuplicateUser(user)

        let pattern_spc = /[^\w]/;
        let pattern_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (pattern_spc.test(String(user_id)) == true || user_id == '' ) {
            is_available = 0
        } 
        if (pattern_email.test(String(user_email)) == false) {
            is_available = 0
        } 
        if (is_duplicate.cnt >= 1) {
            is_available = 0
        }
      
        return is_available
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function transformTokentoUserid(token) {
    try {
        const token_data = await new Promise((resolve, reject) => {
            let decoded = jwt.verify(token, jwtSecret);
            resolve(decoded.user_id)
        })
      
        return token_data
        
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}