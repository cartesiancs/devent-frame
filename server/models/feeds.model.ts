import { MySQLConnect } from '../databases/db.js'

export async function getFeedsRange(range) {
    try {
        let { idxStart, idxEnd } = range;

        let selectFeeds = "SELECT * FROM feeds WHERE idx BETWEEN ? AND ?";
        const data = await new Promise((resolve, reject) => {
            MySQLConnect.query(selectFeeds, [idxStart, idxEnd], function(err, result) {
                if (err) {
                    resolve({status:0})
                }
                resolve({status:1, result:result})
            });
        })

        return data
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function getFeedsIdx(idx) {
    try {
        let selectFeed = "SELECT * FROM feeds WHERE idx = ?";
        const data = await new Promise((resolve, reject) => {
            MySQLConnect.query(selectFeed, [idx], function(err, result) {
                if (err) {
                    resolve({status:0})
                }
                resolve(result)
            });
        })

        return data

    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function insertFeedData(insertData) {
    try {
        let { content, owner, date, type } = insertData;
        let insertFeeds = "INSERT INTO feeds(content, owner, date, type) VALUES (?,?,?,?)";
        const data = await new Promise((resolve, reject) => {
            MySQLConnect.query(insertFeeds, [content, owner, date, type], function(err, result) {
                if (err) {
                    resolve({status:0})
                }
                resolve({status:1})
            });
        })

        return data
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function deleteFeedData(deleteFeed): Promise<{ }> {
    try {
        let { idxFeed, owner } = deleteFeed;
        let deleteFeeds = "DELETE FROM feeds WHERE idx = ? AND feed_owner = ?";
        const data = await new Promise((resolve, reject) => {
            MySQLConnect.query(deleteFeeds, [idxFeed, owner], function(err, result) {
                const returnResult: any = result;

                if (err) {
                    resolve({status:0})
                }
                if (returnResult.affectedRows >= 1) {
                    resolve({status:1})

                } else {
                    resolve({status:0})

                }
            });
        })

        return data
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}

export async function updateFeedData(updateData) {
    try {
        let { idxFeed, contentFeed, owner } = updateData;
        let updateFeeds = "UPDATE feeds SET feed_content = ? WHERE idx = ? AND feed_owner = ?";
        const data = await new Promise((resolve, reject) => {
            MySQLConnect.query(updateFeeds, [contentFeed, idxFeed, owner], function(err, result) {
                const returnResult: any = result;

                if (err) {
                    resolve({status:0})
                }
                if (returnResult.affectedRows >= 1) {
                    resolve({status:1})

                } else {
                    resolve({status:0})

                }
            });
        })

        return data
    } catch (err) {
        console.log(err)
        throw Error(err)
    }
}