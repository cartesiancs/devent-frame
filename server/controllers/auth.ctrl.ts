import { userService } from '../services/users.serv.js';
import * as userModel from '../models/users.model.js';


const authController = {
    login: async function (req, res) {
        try {
            let userId = Buffer.from(req.body.user_id, "base64").toString('utf8');
            let userPassword = Buffer.from(req.body.user_pw, "base64").toString('utf8');
        
            let userInfo = await userModel.loadUserinfo(userId)
            let result = await userService.comparePassword({ 
                userPassword: userPassword,
                userPasswordHash: userInfo.user.userPassword
            })

            if (userInfo.user.userAuthLevel == 0) {
                return res.status(401).json({status: -1})
            }

            if (result.status == 0) {
                return res.status(401).json({status: -1})
            }

            let getJwtToken = await userService.grantToken({ userId: userId });
            let createdToken = getJwtToken.userJwtToken

            if (getJwtToken.status == 0) {
                return res.status(401).json({status: -1})
            }

            res.status(200).json({status:1, token: createdToken})

        } catch (error) {
            res.status(401).json({status:0})
        }
    },


    me: async function (req, res) {
        let token = req.headers['x-access-token'];
        let data = await userService.transformTokentoUserid({ token: token })
        res.status(200).json({status:1, user_id:data})
    }
}

export { authController }