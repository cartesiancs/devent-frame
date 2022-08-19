export default class Token {
    constructor() {

    }

    get(key) {
        let cookieKey = key + "="; 
        let result = "";
        const cookieArr = document.cookie.split(";");
        
        for(let i = 0; i < cookieArr.length; i++) {
            if(cookieArr[i][0] === " ") {
            cookieArr[i] = cookieArr[i].substring(1);
            }
            
            if(cookieArr[i].indexOf(cookieKey) === 0) {
            result = cookieArr[i].slice(cookieKey.length, cookieArr[i].length);
            return result;
            }
        }
        return result;
    }

    check(token) {
        try {
            let decoded = JSON.parse(atob(token.split('.')[1]));
            return {
                is_vaild: 1,
                decoded: decoded
            }
        } catch (error) {
            return {
                is_vaild: 0
            }
        }
    }
}