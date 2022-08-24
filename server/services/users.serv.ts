import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

import data from '../config/jwt.js';
import { checkDuplicateUser } from '../models/users.model.js';

const SALT_ROUNDS = 10;
const TOKEN_SECRET = data.secret;

interface ReturnValue {
    status: number;
    userId?: string;
    userPasswordHash?: string;
    userJwtToken?: string;
}

export async function encryptPassword(userPassword) {
    try {
      
        const hashedPassword: ReturnValue = await new Promise((resolve, reject) => {
          bcrypt.hash(userPassword, SALT_ROUNDS, function(err: string, hash: string) {
            if (err) reject(err)
            resolve({
                status: 1,
                userPasswordHash: hash
            })
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
        const isCorrect: ReturnValue = await new Promise((resolve, reject) => {
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
        const userJwtToken: ReturnValue = await new Promise((resolve, reject) => {
            let token = jwt.sign({
                user_id: userId
            }, TOKEN_SECRET, {
                expiresIn: '7d'
            });
            resolve({
                status: 1,
                userJwtToken: token
            })
        })
      
        return userJwtToken
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
        const userId: ReturnValue = await new Promise((resolve, reject) => {
            let decoded = jwt.verify(token, TOKEN_SECRET);
            resolve({
                status: 1,
                userId: decoded.user_id
            })
        })
      
        return userId
        
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}