import { comparePassword, grantToken, transformTokentoUserid } from '../services/users.serv.js';
import { loadUserinfo } from '../models/users.model.js';

export async function login (req, res) {
    try {
        let user_id = Buffer.from(req.body.user_id, "base64").toString('utf8');
        let user_pw = Buffer.from(req.body.user_pw, "base64").toString('utf8');
    
        let data = await loadUserinfo(user_id)
        let result = await comparePassword(user_pw, data.user_pw)
        
        if (result.status == 1 && data.user_auth == 1) {
            let created_token = await grantToken(user_id);
            res.status(200).json({status:1, token:created_token})
        } else if (data.user_auth == 0) {
            res.status(401).json({status:-1})
        } else {
            res.status(401).json({status:0})
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