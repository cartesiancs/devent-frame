
import { userService } from '../services/users.serv.js';

import * as userModel from '../models/users.model.js';

const userController = {
    create: async function  (req, res) {
        let userId = Buffer.from(req.body.user_id, "base64").toString('utf8');
        let userPassword = Buffer.from(req.body.user_pw, "base64").toString('utf8');
        let userEmail = Buffer.from(req.body.user_email, "base64").toString('utf8');
    
        let isAvailable = await userService.checkAvailableUser({ userId: userId, userEmail: userEmail })
        let isDuplicate = await userModel.checkDuplicateUser({ userId, userEmail })

    
        if (String(userPassword).length <= 7) {
            return res.status(200).json({status: 2})
        }
        if (isAvailable == 0 || isDuplicate == 0) {
            return res.status(200).json({status:0})
        }
    
        let getUserPasswordHash = await userService.encryptPassword({ userPassword: userPassword })
        let userPasswordHash = getUserPasswordHash.userPasswordHash
    
        let user = { userId, userPasswordHash, userEmail }
        let data = await userModel.createUser(user)
    
        let is_grant: any = await userModel.grantAuthorization(userId, 1);
    
        if (is_grant.status == 1) {
            let getJwtToken = await userService.grantToken({ userId: userId });
            let createdToken = getJwtToken.userJwtToken
            res.status(200).json({status:1, token: createdToken})
        } else {
            res.status(401).json({status:0})
        }
    },
    
    
    delete: async function (req, res) {
        let userId = req.params.user_id;
        let isRevoke: any = await userModel.grantAuthorization(userId, 0);
    
        if (isRevoke.status == 1) {
            res.clearCookie('user')
            res.status(200).json({status:1})
        } else {
            res.status(200).json({status:0})
        }
    },
    
    
    get: async function (req, res) {
        try {
            let userId = req.params.user_id;
            let userInfo = await userModel.loadUserinfo(userId);
    
            let result = {
                idx: userInfo.idx, 
                user_auth: userInfo.user_auth, 
                user_email: userInfo.user_email, 
                user_id: userInfo.user_id
            }
        
            if (userInfo.user_auth >= 1) {
                res.status(200).json({status:1, data:result})
            } else {
                res.status(200).json({status:0})
            }
        } catch (error) {
            res.status(500).json({status:0})
        }
    }
}


export { userController }