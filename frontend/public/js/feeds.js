
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