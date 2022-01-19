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
    let user_id = btoa(document.querySelector("#Username").value);
    let user_pw = btoa(document.querySelector("#Password").value);
    let user_email = btoa(document.querySelector("#Email").value);

    let user = {user_id, user_pw, user_email}
    
    let data = await userSendSignup(user);
    if (data.status == 1) {
        Swal.fire({
            icon: 'success',
            title: '가입 성공',
            showConfirmButton: false,
            timer: 1000
        })
        setTimeout(() => {
            location.href = '/'
        }, 1200);
    } else if (data.status == 2) { // 비번 8자리
        Swal.fire({
            icon: 'error',
            title: '바밀번호는 8자리 이상이여야 합니다',
            showConfirmButton: false,
            timer: 1000
        })
    } else if (data.status == 5) { // 특수문자
        Swal.fire({
            icon: 'error',
            title: '아이디에 특수문자는 기입하실 수 없습니다',
            showConfirmButton: false,
            timer: 1000
        })
    } else if (data.status == 0) {
        Swal.fire({
            icon: 'error',
            title: '중복된 사용자가 있거나 사용 불가한 아이디 입니다.',
            showConfirmButton: false,
            timer: 1000
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
        Swal.fire({
            icon: 'success',
            title: '로그인 성공',
            showConfirmButton: false,
            timer: 1000
        })
        setTimeout(() => {
            location.href = '/'
        }, 1200);
    } else if (data.status == -1) {
        Swal.fire({
            icon: 'error',
            title: '탈퇴한 회원이거나 권한이 없습니다',
            showConfirmButton: false,
            timer: 1000
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: '로그인 실패',
            showConfirmButton: false,
            timer: 1000
        })
    } 
}

async function userSendDelete(user_id) {

    let response = await fetch("/api/users/"+user_id, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/x-www-form-urlencoded"
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
            title: '권한이 없습니다',
            showConfirmButton: false,
            timer: 1000
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