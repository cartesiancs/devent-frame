import conn from '../databases/db.js'

export async function createUser(user) {
    try {
        let { user_id, user_hash_pw, user_email } = user;
        let insertUser = "INSERT INTO users(user_id, user_pw, user_email) VALUES (?, ?, ?)";

        let data = conn.query(insertUser, [user_id, user_hash_pw, user_email])
        return data[0]
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function loadUserinfo(user_id) {
    try {
        let getUser = "SELECT * FROM users WHERE user_id = ?";
        const data = await new Promise((resolve, reject) => {
            conn.query(getUser, [user_id], function(err, result) {
                resolve(result)
            });
        })

        return data[0]
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function checkDuplicateUser(user) {
    try {
        let { user_id, user_email} = user;

        let getUserCount = "SELECT COUNT(*) as cnt FROM users WHERE user_id = ? OR user_email = ?";
        const data = await new Promise((resolve, reject) => {
            conn.query(getUserCount, [user_id, user_email], function(err, result) {
                resolve(result)
            });
        })

        return data[0]
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}


export async function grantAuthorization(user_id, auth) {
    try {

        let updateUser = "UPDATE users SET user_auth = ? WHERE user_id = ?";
        const data = await new Promise((resolve, reject) => {
            conn.query(updateUser, [auth, user_id], function(err, result) {
                if (err) {
                    resolve({status:0})
                } else {
                    resolve({status:1})
                }
            });
        })

        return data
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}
