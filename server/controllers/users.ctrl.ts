
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
    
        let isGrantAuthorization: any = await userModel.grantAuthorization(userId, 1);
        let getJwtToken = await userService.grantToken({ userId: userId });
        let createdToken = getJwtToken.userJwtToken

        if (isGrantAuthorization.status == 0) {
            return res.status(401).json({status:0})
        }

        res.status(200).json({status:1, token: createdToken})
    },
    
    
    delete: async function (req, res) {
        let userId = req.params.user_id;
        let isRevoke: any = await userModel.grantAuthorization(userId, 0);

        if (isRevoke.status == 0) {
            return res.status(200).json({status:0})
        }
    
        res.clearCookie('user')
        res.status(200).json({status:1})
    },
    
    
    get: async function (req, res) {
        try {
            let userId = req.params.user_id;
            let userInfo = await userModel.loadUserinfo(userId);
    
            let result = {
                idx: userInfo.user.idx, 
                user_auth: userInfo.user.userAuthLevel, 
                user_email: userInfo.user.userEmail, 
                user_id: userInfo.user.userId
            }

            if (userInfo.user.userAuthLevel <= 0) {
                return res.status(200).json({ status: 0 })
            }
        
            res.status(200).json({ status: 1, data: result })
        } catch (error) {
            res.status(500).json({ status: 0 })
        }
    }
}


export { userController }