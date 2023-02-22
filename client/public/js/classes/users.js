import Token from "./token.js";

export default class Users {
    constructor () {
        this.token = new Token()
    }

    async signup() {
        try {
            let user_id = btoa(document.querySelector("#Username").value);
            let user_pw = btoa(document.querySelector("#Password").value);
            let user_email = btoa(document.querySelector("#Email").value);
        
            if (user_id == '' || user_pw == '' || user_email == '') {
                return dds.toast({
                    content: '입력칸을 확인해주세요'
                })
            }
        
            let response = await fetch("/api/users", {
                method: "POST",
                headers: {
                "Content-Type": "application/x-www-form-urlencoded"
                },
                body: `user_id=${user_id}&user_pw=${user_pw}&user_email=${user_email}`
            });
        
            let data = await response.json();
    
            if (data.status == 1) {
                Cookies.set('user', data.token)

                dds.toast({
                    content: '가입에 성공했어요'
                })

                setTimeout(() => {
                    location.href = '/'
                }, 1200);
            } else if (data.status == 2) { // 비번 8자리
                dds.toast({
                    content: '바밀번호는 8자리 이상이여야 해요'
                })
            } else if (data.status == 5) { // 특수문자
                dds.toast({
                    content: '아이디에 특수문자는 입력할 수 없어요'
                })

            } else if (data.status == 0) {
                dds.toast({
                    content: '사용 불가한 아이디 또는 이메일이에요'
                })
            }
        } catch (error) {
            dds.toast({
                content: '에러가 발생했어요'
            })

        }
    }

    async login() {
        let user_id = btoa(document.querySelector("#Username").value);
        let user_pw = btoa(document.querySelector("#Password").value);
            
        let response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
            "Content-Type": "application/x-www-form-urlencoded"
            },
            body: `user_id="${user_id}"&user_pw="${user_pw}"`
        });
    
        let data = await response.json();

        if (data.status == 1) {
            Cookies.set('user', data.token)
            dds.toast({
                content: '로그인에 성공했어요'
            })
    
            setTimeout(() => {
                location.href = '/'
            }, 1400);
        } else if (data.status == -1) {
            dds.toast({
                content: '탈퇴한 회원이거나 권한이 없어요'
            })
        } else {
            dds.toast({
                content: '로그인 정보가 맞지 않아요'
            })
        } 
    }

    async delete() {
        let user_id = token.check(token.get('user')).decoded.user_id
        
        let response = await fetch("/api/users/"+user_id, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": this.token.get('user')
    
            }
        });
    
        let data = await response.json();
        if (data.status == 1) {
            dds.toast({
                content: '정상적으로 탈퇴를 완료했어요'
            })

            setTimeout(() => {
                location.href = '/'
            }, 1200);
        } else if (data.status == -1) {
            dds.toast({
                content: '탈퇴 권한이 없어요'
            })

        } else {
            dds.toast({
                content: '탈퇴에 실패했어요'
            })

        } 
    }

    async update(user_id, user) {

        let response = await fetch("/api/users/"+user_id, {
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "x-access-token": this.token.get('user')

            },
            body: `user_name=${user.name}`
        });

        let data = await response.json();

        return data

    }

    async get(user_id) {

        let response = await fetch("/api/users/"+user_id, {
            method: "GET",
            headers: {
                "x-access-token": this.token.get('user')
            }
        });

        let data = await response.json();

        return data

    }

    async checkAuth() {
        let response = await fetch("/api/auth/me", {
            method: "GET",
            headers: {
                "x-access-token": this.token.get('user')
            }
        });
    
        let data = await response.json();
        return data

    }

    async logout() {
        try {
            document.cookie = 'user=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
            location.href = '/'
        } catch (error) {
            return 0
        }
    }
}
