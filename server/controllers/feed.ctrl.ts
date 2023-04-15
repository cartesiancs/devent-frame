

import { feedModel } from '../models/feeds.model.js';

import { userService } from '../services/users.serv.js'
import sanitizeHtml from 'sanitize-html';
import dayjs from 'dayjs';


const feedController = {
    get: async function  (req, res) {
        let idx = Number(req.params.idx) || -1;
        let isRange = String(req.query.isrange) || 'false'
    
        let idxRange = Number(req.query.range) || 0;
        let idxStart = idx || -1;
        let idxEnd = idxStart + idxRange || idx;
        let resultFeed;
    
        if (isRange == 'true') {
            resultFeed = await feedModel.getFeedsRange({ idxStart, idxEnd })
        } else {
            resultFeed = await feedModel.getFeedsRange({ idxStart: idx, idxEnd: idx })
        }
    
        if (Array.isArray(resultFeed) && resultFeed.length === 0) {
            res.status(404).json({data:'', msg:'Not Found'})
        } else {
            res.status(200).json({data: resultFeed})
        }
    },
    

    insert: async function  (req, res) {
        let token = req.headers['x-access-token'];
        let now = dayjs();
    
        let getUserId = await userService.transformTokentoUserid({ token: token });
    
        let content = sanitizeHtml(req.body.content);
        let owner = getUserId.userId
        let date = now.format("YYYY.MM.DD.HH.mm.ss"); 
        let type = 1;
    
        let data: any = await feedModel.insertFeedData({ content: content, owner: owner, date: date, type: type })
    
        if (data.status == 1) {
            res.status(200).json({status:1})
        } else {
            res.status(401).json({status:0})
        }
    },
    
    
    delete: async function (req, res) {
        let token = req.headers['x-access-token'];
    
        let idxFeed = req.params.idx;
        let getUserId = await userService.transformTokentoUserid({ token: token });
    
        let owner =  getUserId.userId
    
        let data: any = await feedModel.deleteFeedData({ idxFeed, owner })
    
        if (data.status == 1) {
            res.status(200).json({status:1})
        } else {
            res.status(401).json({status:0})
        }
    },
    
    
    update: async function (req, res) {
        let token = req.headers['x-access-token'];
    
        let idxFeed = Number(req.params.idx);
        let contentFeed = req.body.content;
        let getUserId = await userService.transformTokentoUserid({ token: token });
        let owner = getUserId.userId
    
        let updateFeed = { idxFeed, contentFeed, owner };
    
        let data: any = await feedModel.updateFeedData(updateFeed)
    
        if (data.status == 1) {
            res.status(200).json({status:1})
        } else {
            res.status(401).json({status:0})
        }
    }
}

export { feedController }