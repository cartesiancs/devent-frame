
async function getFeed(idx) {
    let response = await fetch("/api/feeds/"+idx, {
        method: "GET"
    });

    let data = response.json();
    return data;
}


async function getFeedRange(start) {
    let response = await fetch(`/api/feeds?start=${start}`, {
        method: "GET",
        headers: {
            "x-access-token": getToken('user')
        },
    });

    let data = response.json();
    return data;
}

async function insertFeed(content) {
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

async function deleteFeed(idx) {
    let response = await fetch("/api/feeds/"+idx, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": getToken('user')
        }
    });

    let data = response.json();
    return data;
}

async function updateFeed(idx, content) {
    let response = await fetch("/api/feeds/"+idx, {
        method: "PUT",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": getToken('user')
        },
        body :`content=${content}`
    });

    let data = response.json();
    return data;
}