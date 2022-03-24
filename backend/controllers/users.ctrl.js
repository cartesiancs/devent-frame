import { encryptPassword, checkAvailableUser, grantToken } from '../services/users.serv.js';
import { createUser, loadUserinfo, grantAuthorization } from '../models/users.model.js';


export async function create (req, res) {
    let user_id = Buffer.from(req.body.user_id, "base64").toString('utf8');
    let user_pw = Buffer.from(req.body.user_pw, "base64").toString('utf8');
    let user_email = Buffer.from(req.body.user_email, "base64").toString('utf8');

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

    let is_grant = await grantAuthorization(user_id, 1);

    if (is_grant.status == 1) {
        let createdToken = await grantToken(user_id);
        res.status(200).json({status:1, token:createdToken})
    } else {
        res.status(401).json({status:0})
    }

}

export async function deleteUserInfo (req, res) {
    let user_id = req.params.user_id;
    let is_revoke = await grantAuthorization(user_id, 0);

    if (is_revoke.status == 1) {
        res.clearCookie('user')
        res.status(200).json({status:1})
    } else {
        res.status(200).json({status:0})
    }
}

export async function getUserInfo (req, res) {
    try {
        let user_id = req.params.user_id;
        let user_data = await loadUserinfo(user_id);

        let result = {
            idx: user_data.idx, 
            user_auth: user_data.user_auth, 
            user_email: user_data.user_email, 
            user_id: user_data.user_id
        }
    
        if (user_data.user_auth >= 1) {
            res.status(200).json({status:1, data:result})
        } else {
            res.status(200).json({status:0})
        }
    } catch (error) {
        res.status(500).json({status:0})
    }

}


