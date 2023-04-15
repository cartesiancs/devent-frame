import { Between } from "typeorm";
import { MySQLConnect, AppDataSource } from '../databases/db.js'
import { Feed } from "../databases/entity/Feed.js";

type SelectRangeType = {
    idxStart: number
    idxEnd: number
}

const feedModel = {
    getFeedsRange: async function ({ idxStart, idxEnd }: SelectRangeType) {
        try {
            const feedRepository = AppDataSource.getRepository(Feed);
            const getFeed = await feedRepository.find({
                where: {
                    idx: Between(
                        idxStart, 
                        idxEnd
                    ),
                }
            })
    
            return { status: 1, result: getFeed }

            // let selectFeeds = "SELECT * FROM feeds WHERE idx BETWEEN ? AND ?";
            // const data = await new Promise((resolve, reject) => {
            //     MySQLConnect.query(selectFeeds, [idxStart, idxEnd], function(err, result) {
            //         if (err) {
            //             resolve({status:0})
            //         }
            //         resolve({status:1, result:result})
            //     });
            // })
    
            // return data
        } catch (err) {
            console.log(err)
            throw Error(err)
        }
    },

    insertFeedData: async function ({ content, owner, date, type }) {
        try {
            const feedRepository = AppDataSource.getRepository(Feed);
            const insertFeed = await feedRepository.createQueryBuilder()
                .insert()
                .into(Feed)
                .values([
                    { 
                        content: content, 
                        owner: owner, 
                        date: date, 
                        type: type 
                    }
                ])
                .execute()
    
            return { status: 1 }

            // let insertFeeds = "INSERT INTO feeds(content, owner, date, type) VALUES (?,?,?,?)";
            // const data = await new Promise((resolve, reject) => {
            //     MySQLConnect.query(insertFeeds, [content, owner, date, type], function(err, result) {
            //         if (err) {
            //             resolve({status:0})
            //         }
            //         resolve({status:1})
            //     });
            // })
    
            // return data
        } catch (err) {
            console.log(err)
            throw Error(err)
        }
    },
    
    deleteFeedData: async function ({ idxFeed, owner }): Promise<{ }> {
        try {
            const feedRepository = AppDataSource.getRepository(Feed);
            const deleteFeed = await feedRepository.createQueryBuilder('feed')
                .delete()
                .from(Feed)
                .where("idx = :idx AND owner = :owner", { idx: idxFeed, owner: owner })
                .execute()

            return { status: 1 }

            // let deleteFeeds = "DELETE FROM feeds WHERE idx = ? AND owner = ?";
            // const data = await new Promise((resolve, reject) => {
            //     MySQLConnect.query(deleteFeeds, [idxFeed, owner], function(err, result) {
            //         const returnResult: any = result;
    
            //         if (err) {
            //             resolve({status:0})
            //         }
            //         if (returnResult.affectedRows >= 1) {
            //             resolve({status:1})
    
            //         } else {
            //             resolve({status:0})
    
            //         }
            //     });
            // })
    
            // return data
        } catch (err) {
            console.log(err)
            throw Error(err)
        }
    },
    
    updateFeedData: async function ({ idxFeed, contentFeed, owner }) {
        try {
            const feedRepository = AppDataSource.getRepository(Feed);
            const updateFeed = await feedRepository.createQueryBuilder()
            .update(Feed)
            .set({ content: contentFeed })
            .where("idx = :idx AND owner = :owner", { idx: idxFeed, owner: owner })
            .execute()

            return { status: 1 }

            // let updateFeeds = "UPDATE feeds SET content = ? WHERE idx = ? AND owner = ?";
            // const data = await new Promise((resolve, reject) => {
            //     MySQLConnect.query(updateFeeds, [contentFeed, idxFeed, owner], function(err, result) {
            //         const returnResult: any = result;
    
            //         if (err) {
            //             resolve({status:0})
            //         }
            //         if (returnResult.affectedRows >= 1) {
            //             resolve({status:1})
    
            //         } else {
            //             resolve({status:0})
    
            //         }
            //     });
            // })
    
            // return data
        } catch (err) {
            console.log(err)
            throw Error(err)
        }
    }
}

export { feedModel }