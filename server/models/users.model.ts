import conn from '../databases/db.js'

export async function createUser(user) {
    try {
        let { userId, userPasswordHash, userEmail } = user;
        let insertUser = "INSERT INTO users(user_id, user_pw, user_email) VALUES (?, ?, ?)";

        let data = conn.query(insertUser, [userId, userPasswordHash, userEmail])
        return data[0]
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function loadUserinfo(userId) {
    try {
        let getUser = "SELECT * FROM users WHERE user_id = ?";
        const data = await new Promise((resolve, reject) => {
            conn.query(getUser, [userId], function(err, result) {
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
        let { userId, userEmail} = user;

        let getUserCount = "SELECT COUNT(*) as cnt FROM users WHERE user_id = ? OR user_email = ?";
        const data = await new Promise((resolve, reject) => {
            conn.query(getUserCount, [userId, userEmail], function(err, result) {
                resolve(result)
            });
        })

        return data[0]
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}


export async function grantAuthorization(userId, auth) {
    try {

        let updateUser = "UPDATE users SET user_auth = ? WHERE user_id = ?";
        const data = await new Promise((resolve, reject) => {
            conn.query(updateUser, [auth, userId], function(err, result) {
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
