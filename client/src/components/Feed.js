import React, { useEffect, useState } from "react";


async function getFeed(feed_idx, fetch_params) {
    let token = Cookies.get("user")

    let params = fetch_params || {}
    let params_string = new URLSearchParams(params).toString();

    let response = await fetch(`/api/feeds/${feed_idx}?${params_string}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": token
        }
    });

    let data = response.json();
    return data;
}

async function insertFeed(content) {
    let token = Cookies.get("user")

    let response = await fetch("/api/feeds", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": token
        },
        body: `content="${content}"`
    });

    let data = response.json();
    return data;
}

function Feed() {
    const [feeds, setFeeds] = useState([{idx: 0, content:'', owner: ''}])

    useEffect(() => {
        const loadData = async () => {
            let feeds = await getFeed(1, {
                isrange: 'true',
                range: 20
            })
            setFeeds(feeds.data.result)
            console.log(feeds)
        };

        loadData()
    }, [])

    return (
        <div>
            {feeds.map(feed => (
                <div>
                    {feed.idx} {feed.content} {feed.owner} {feed.date}
                </div>
            ))}
            
        </div>
    );
}
  
export default Feed;