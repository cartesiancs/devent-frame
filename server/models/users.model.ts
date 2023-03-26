import { MySQLConnect, AppDataSource } from '../databases/db.js'

import { User } from "../databases/entity/User.js";

export async function createUser({ userId, userPasswordHash, userEmail }) {
    try {
        const userValues = new User()
        userValues.userId = userId
        userValues.userPassword = userPasswordHash
        userValues.userEmail = userEmail
        userValues.userAuthLevel = 1

        const userRepository = AppDataSource.getRepository(User);
        await userRepository.save(userValues)
        return { status: 1 }

    } catch (err) {
        console.log(err)
        return { status: 0 }
    }
}

export async function loadUserinfo(userId) {
    try {
        const userRepository = AppDataSource.getRepository(User);
        const getUser = await userRepository.findOneBy({
            userId: userId
        })

        return { status: 1, user: getUser }
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function checkDuplicateUser(user) {
    try {
        let { userId, userEmail} = user;

        let getUserCount = "SELECT COUNT(*) as cnt FROM users WHERE userId = ? OR userEmail = ?";
        const data = await new Promise((resolve, reject) => {
            MySQLConnect.query(getUserCount, [userId, userEmail], function(err, result) {
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

        let updateUser = "UPDATE users SET userAuthLevel = ? WHERE userId = ?";
        const data = await new Promise((resolve, reject) => {
            MySQLConnect.query(updateUser, [auth, userId], function(err, result) {
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
