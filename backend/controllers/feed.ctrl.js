import { getFeedsRange, getFeedsIdx, insertFeedData, deleteFeedData, updateFeedData } from '../models/feeds.model.js';
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
    let multiple_range = 10;
    let get_start = Number(req.query.start);

    let start = Number.isInteger(get_start) == true ? get_start : 0
    let end = start+multiple_range;

    let data = await getFeedsRange({ start, end })

    if (data.status == 1) {
        res.status(200).json({data:data.result})
    } else {
        res.status(404).json({data:'', msg:'Not Found'})
    }
}

export async function insertFeed (req, res) {
    let token = req.headers['x-access-token'];
    let now = dayjs();

    let content = sanitizeHtml(req.body.content);
    let owner = await transformTokentoUserid(token);
    let date = now.format("YYYY.MM.DD.HH.mm.ss"); 
    let type = 1;

    let insert_data = { content, owner, date, type };

    let data = await insertFeedData(insert_data)

    if (data.status == 1) {
        res.status(200).json({status:1})
    } else {
        res.status(401).json({status:0})
    }
}


export async function deleteFeed (req, res) {
    let token = req.headers['x-access-token'];

    let feed_idx = req.params.idx;
    let owner = await transformTokentoUserid(token);

    let check = { feed_idx, owner };
    let data = await deleteFeedData(check)

    if (data.status == 1) {
        res.status(200).json({status:1})
    } else {
        res.status(401).json({status:0})
    }
}

export async function updateFeed (req, res) {
    let token = req.headers['x-access-token'];

    let feed_update_idx = Number(req.params.idx);
    let feed_update_content = req.body.content;
    let owner = await transformTokentoUserid(token);

    let update_data = { feed_update_idx, feed_update_content, owner };

    let data = await updateFeedData(update_data)

    if (data.status == 1) {
        res.status(200).json({status:1})
    } else {
        res.status(401).json({status:0})
    }
}
