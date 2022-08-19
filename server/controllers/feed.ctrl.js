

import * as feedModel from '../models/feeds.model.js';

import { transformTokentoUserid } from '../services/users.serv.js'
import sanitizeHtml from 'sanitize-html';
import dayjs from 'dayjs'


export async function getFeed (req, res) {
    let idx = Number(req.params.idx) || -1;
    let isRange = String(req.query.isrange) || 'false'

    let idxRange = Number(req.query.range) || 0;
    let idxStart = idx || -1;
    let idxEnd = idxStart + idxRange || idx;
    let resultFeed;

    if (isRange == 'true') {
        resultFeed = await feedModel.getFeedsRange({ idxStart, idxEnd })
    } else {
        resultFeed = await feedModel.getFeedsIdx(idx)
    }

    if (Array.isArray(resultFeed) && resultFeed.length === 0) {
        res.status(404).json({data:'', msg:'Not Found'})
    } else {
        res.status(200).json({data :resultFeed})
    }
}


export async function insertFeed (req, res) {
    let token = req.headers['x-access-token'];
    let now = dayjs();

    let content = sanitizeHtml(req.body.content);
    let owner = await transformTokentoUserid(token);
    let date = now.format("YYYY.MM.DD.HH.mm.ss"); 
    let type = 1;

    let insertFeed = { content, owner, date, type };
    let data = await feedModel.insertFeedData(insertFeed)

    if (data.status == 1) {
        res.status(200).json({status:1})
    } else {
        res.status(401).json({status:0})
    }
}


export async function deleteFeed (req, res) {
    let token = req.headers['x-access-token'];

    let idxFeed = req.params.idx;
    let owner = await transformTokentoUserid(token);

    let deleteFeed = { idxFeed, owner };
    let data = await feedModel.deleteFeedData(deleteFeed)

    if (data.status == 1) {
        res.status(200).json({status:1})
    } else {
        res.status(401).json({status:0})
    }
}


export async function updateFeed (req, res) {
    let token = req.headers['x-access-token'];

    let idxFeed = Number(req.params.idx);
    let contentFeed = req.body.content;
    let owner = await transformTokentoUserid(token);

    let updateFeed = { idxFeed, contentFeed, owner };

    let data = await feedModel.updateFeedData(updateFeed)

    if (data.status == 1) {
        res.status(200).json({status:1})
    } else {
        res.status(401).json({status:0})
    }
}
