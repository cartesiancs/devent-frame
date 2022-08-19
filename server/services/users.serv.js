import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import data from '../config/jwt.js';
import { checkDuplicateUser } from '../models/users.model.js';

const SALT_ROUNDS = 10;
const TOKEN_SECRET = data.secret;

export async function encryptPassword(userPassword) {
    try {
      
        const hashedPassword = await new Promise((resolve, reject) => {
          bcrypt.hash(userPassword, SALT_ROUNDS, function(err, hash) {
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

export async function comparePassword(userPassword, userPasswordHash) {
    try {
        let hash = userPasswordHash.replace('$2y$', '$2a$');
        const isCorrect = await new Promise((resolve, reject) => {
            bcrypt.compare(userPassword, hash, function(err, correct) {
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

export async function grantToken(userId) {
    try {
        const jwt_token = await new Promise((resolve, reject) => {
            let token = jwt.sign({
                user_id: userId
            }, TOKEN_SECRET, {
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
        let { userId, userEmail } = user
        let isAvailable = 1
        let isDuplicate = await checkDuplicateUser(user)

        let patternSpc = /[^\w]/;
        let patternEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (patternSpc.test(String(userId)) == true || userId == '' ) {
            isAvailable = 0
        } 
        if (patternEmail.test(String(userEmail)) == false) {
            isAvailable = 0
        } 
        if (isDuplicate.cnt >= 1) {
            isAvailable = 0
        }
      
        return isAvailable
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function transformTokentoUserid(token) {
    try {
        const token_data = await new Promise((resolve, reject) => {
            let decoded = jwt.verify(token, TOKEN_SECRET);
            resolve(decoded.user_id)
        })
      
        return token_data
        
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}