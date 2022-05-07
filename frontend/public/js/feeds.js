
class Feeds {
    constructor(token) {
        this.token = token
    }

    async select(idx) {
        let response = await fetch("/api/feeds/"+idx, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": this.token
            }
        });
    
        let data = response.json();
        return data;
    }
    
    async insert(content) {
        let response = await fetch("/api/feeds", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": this.token
            },
            body: `content="${content}"`
        });
    
        let data = response.json();
        return data;
    }
    

    async  delete(idx) {
        let response = await fetch("/api/feeds/"+idx, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": this.token
            }
        });

        let data = response.json();
        return data;
    }

    async update(idx, content) {
        let response = await fetch("/api/feeds/"+idx, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": this.token
            },
            body :`content=${content}`
        });
    
        let data = response.json();
        return data;
    }
}

