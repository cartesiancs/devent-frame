import { comparePassword, grantToken, transformTokentoUserid } from '../services/users.serv.js';
import * as userModel from '../models/users.model.js';


export async function login (req, res) {
    try {
        let userId = Buffer.from(req.body.user_id, "base64").toString('utf8');
        let userPassword = Buffer.from(req.body.user_pw, "base64").toString('utf8');
    
        let userInfo = await userModel.loadUserinfo(userId)
        let result: any = await comparePassword(userPassword, userInfo.user_pw)
        
        if (result.status == 1 && userInfo.user_auth == 1) {
            let created_token = await grantToken(userId);
            res.status(200).json({status:1, token:created_token})
        } else if (userInfo.user_auth == 0) {
            res.status(401).json({status: -1})
        } else {
            res.status(401).json({status: 0})
        }  
    } catch (error) {
        res.status(401).json({status:0})
    }
}

export async function me (req, res) {
    let token = req.headers['x-access-token'];
    let data = await transformTokentoUserid(token)
    
    res.status(200).json({status:1, user_id:data})

}