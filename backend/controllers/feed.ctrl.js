import { getFeedsRange, getFeedsIdx } from '../models/feeds.model.js';


export async function getFeed (req, res) {
    let idx = req.params.idx;
    let data = await getFeedsIdx(idx)

    if (Array.isArray(data) && data.length === 0) {
        res.status(404).json({data:'', msg:'Not Found'})
    } else {
        res.status(200).json({data:data})
    }
}
