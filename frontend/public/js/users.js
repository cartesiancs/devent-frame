async function userSendSignup(user) {
    let {user_id, user_pw, user_email} = user;

    let response = await fetch("/api/users", {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `user_id=${user_id}&user_pw=${user_pw}&user_email=${user_email}`
    });

    let data = response.json();
    return data;
}

async function userSignup() {
    try {
        let user_id = btoa(document.querySelector("#Username").value);
        let user_pw = btoa(document.querySelector("#Password").value);
        let user_email = btoa(document.querySelector("#Email").value);
    
        if (user_id == '' || user_pw == '' || user_email == '') {
            return Swal.fire({
                icon: 'error',
                title: '입력칸을 확인해주세요',
                showConfirmButton: false,
                heightAuto: false,

                timer: 1500
            })
        }
    
        let user = {user_id, user_pw, user_email}
        
        let data = await userSendSignup(user);
        if (data.status == 1) {
            Cookies.set('user', data.token)
    
            Swal.fire({
                icon: 'success',
                title: '가입 성공',
                showConfirmButton: false,
                heightAuto: false,

                timer: 1300
            })
            setTimeout(() => {
                location.href = '/'
            }, 1200);
        } else if (data.status == 2) { // 비번 8자리
            Swal.fire({
                icon: 'error',
                title: '바밀번호는 8자리 이상이여야 해요',
                showConfirmButton: false,
                heightAuto: false,

                timer: 1500
            })
        } else if (data.status == 5) { // 특수문자
            Swal.fire({
                icon: 'error',
                title: '아이디에 특수문자는 입력할 수 없어요',
                showConfirmButton: false,
                heightAuto: false,

                timer: 1500
            })
        } else if (data.status == 0) {
            Swal.fire({
                icon: 'error',
                title: '사용 불가한 아이디 또는 이메일이에요',
                showConfirmButton: false,
                heightAuto: false,
                timer: 1500
            })
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: '에러가 발생했어요',
            showConfirmButton: false,
            heightAuto: false,

            timer: 1500
        })
    }

}

async function userSendLogin(user) {
    let {user_id, user_pw} = user;

    let response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `user_id="${user_id}"&user_pw="${user_pw}"`
    });

    let data = response.json();
    return data;
}

async function userLogin() {
    let user_id = btoa(document.querySelector("#Username").value);
    let user_pw = btoa(document.querySelector("#Password").value);

    let user = {user_id, user_pw}
    
    let data = await userSendLogin(user);
    if (data.status == 1) {
        Cookies.set('user', data.token)

        Swal.fire({
            icon: 'success',
            title: '로그인 성공',
            showConfirmButton: false,
            heightAuto: false,

            timer: 1300
        })
        setTimeout(() => {
            location.href = '/'
        }, 1200);
    } else if (data.status == -1) {
        Swal.fire({
            icon: 'error',
            title: '탈퇴한 회원이거나 권한이 없어요',
            showConfirmButton: false,
            heightAuto: false,

            timer: 1500
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: '로그인 정보가 맞지 않아요',
            showConfirmButton: false,
            heightAuto: false,

            timer: 1500
        })
    } 
}

async function userSendDelete(user_id) {

    let response = await fetch("/api/users/"+user_id, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "x-access-token": getToken('user')

        }
    });

    let data = response.json();
    return data;
}

async function userDelete() {
    let user_id = getUserInfo(getToken('user')).user_id
    
    let data = await userSendDelete(user_id);
    if (data.status == 1) {
        Swal.fire({
            icon: 'success',
            title: '삭제 완료',
            showConfirmButton: false,
            timer: 1000
        })
        setTimeout(() => {
            location.href = '/'
        }, 1200);
    } else if (data.status == -1) {
        Swal.fire({
            icon: 'error',
            title: '권한이 없어요',
            showConfirmButton: false,
            heightAuto: false,

            timer: 1500
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: '삭제 실패',
            showConfirmButton: false,
            timer: 1000
        })
    } 
}


async function userSendGet(user_id) {

    let response = await fetch("/api/users/"+user_id, {
        method: "GET"
    });

    let data = response.json();
    return data;
}

async function userGet(user_id) {
    let user_data = await userSendGet(user_id)
    
    if (user_data.status == 1) {
        console.log(user_data)

    } else {
        console.log(user_data)
    } 
}

async function authSendMe() {

    let response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
            "x-access-token": getToken('user')
        }
    });

    let data = response.json();
    return data;
}

async function checkAuthMe() {
    let user_data = await authSendMe()
    
    if (user_data.status == 1) {
        console.log(user_data)

    } else {
        console.log(user_data)
    } 
}