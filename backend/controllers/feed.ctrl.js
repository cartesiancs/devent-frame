import { getFeedsRange, getFeedsIdx, insertFeedData } from '../models/feeds.model.js';
import { transformTokentoUserid } from '../services/users.serv.js'
import sanitizeHtml from 'sanitize-html';
import dayjs from 'dayjs'




export async function getFeed (req, res) {
    let idx = req.params.idx;
    let data = await getFeedsIdx(idx)

    if (Array.isArray(data) && data.length === 0) {
        res.status(404).json({data:'', msg:'Not Found'})
    } else {
        res.status(200).json({data:data})
    }
}

export async function getFeedRange (req, res) {

    let getRange = 10;
    let queryStart = req.query.start;

    let start = Number.isInteger(queryStart) == true ? queryStart : 0
    let end = start+getRange;


    let data = await getFeedsRange({ start, end })

    if (data.status == 1) {
        res.status(200).json({data:data.result})
    } else {
        res.status(404).json({data:'', msg:'Not Found'})

    }
}

export async function insertFeed (req, res) {
    let token = req.headers['x-access-token'];
    var now = dayjs();

    let content = sanitizeHtml(req.body.content);
    let owner = await transformTokentoUserid(token);
    let date = now.format("YYYY.MM.DD.HH.mm.ss"); 
    let type = 1;

    let insertData = { content, owner, date, type };

    let data = await insertFeedData(insertData)

    if (data.status == 1) {
        res.status(200).json({status:1})
    } else {
        res.status(401).json({status:0})
    }
}



