
async function getSendFeed(idx) {

    let response = await fetch("/api/feeds/"+idx, {
        method: "GET"
    });

    let data = response.json();
    return data;
}

async function getFeed(idx) {
    let data = await getSendFeed(idx)
    
    console.log(data)
}


async function getSendFeedRange(start) {

    let response = await fetch(`/api/feeds?start=${start}`, {
        method: "GET",
        headers: {
            "x-access-token": getToken('user')
        },
    });

    let data = response.json();
    return data;
}

async function getFeedRange(start) {
    let data = await getSendFeedRange(start)
    return data
}


async function insertSendFeed(content) {

    let response = await fetch("/api/feeds", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": getToken('user')

        },
        body: `content="${content}"`

    });

    let data = response.json();
    return data;
}

async function insertFeed(content) {
    let data = await insertSendFeed(content)
    
    console.log(data)
}