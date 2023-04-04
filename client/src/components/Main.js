import React, { useState, useEffect } from "react";


function Main() {
    const [isLogin, setLoginStatus] = useState(0);

    const checkLogin = () => {
        let token = Cookies.get("user")
        try {
            let decoded = JSON.parse(atob(token.split('.')[1]));
            return {
                isVaild: 1,
                decoded: decoded
            }
        } catch (error) {
            return {
                isVaild: 0
            }
        }
    }

    useEffect(() => {
        let loginStatus = checkLogin()
        setLoginStatus(loginStatus.isVaild)
    }, []);


    return (
        <header className="bg-white py-5">
            <div className="container-fluid px-5 pt-4 pb-2">
                <div className="row gx-5 justify-content-center">
                    <div className="col-lg-7">
                        <div className="text-center mt-5">
                            <h1 className="display-5 fw-bolder text-dark font-weight-lg mb-2">더 모던하고 깔끔한 게시판의 세계로</h1>
                            <p className="font-weight-sm mb-4 mt-3">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit!</p>
                        </div>
                        <ButtonBox isLogin={isLogin}></ButtonBox>

                    </div>
                </div>
            </div>
        </header>
    );
}


function ButtonBox({ isLogin }) {
    const handleClickSignup = () => {
        location.href = '/auth/signup'
    }

    const handleClickLogin = () => {
        location.href = '/auth/login'
    }

    const handleClickLogout = () => {
        document.cookie = 'user=; expires=Thu, 01 Jan 1999 00:00:10 GMT;';
        location.href = '/'
    }

    if (isLogin) {
        return (
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center" id="login_box">
                <button className="btn btn-red font-weight-md btn-lg px-4 " onClick={handleClickLogout}><i className="fas fa-user-minus"></i> 로그아웃</button>
            </div>
        );
    }

    return (
        <div className="d-grid gap-3 d-sm-flex justify-content-sm-center" id="login_box">
            <button className="btn btn-blue font-weight-md btn-lg px-4 btn-rounded" onClick={handleClickSignup}><i className="fas fa-user-plus"></i> 가입</button>
            <button className="btn btn-light font-weight-md btn-lg px-4 me-sm-3 btn-rounded" onClick={handleClickLogin}><i className="fas fa-sign-in-alt"></i> 로그인</button>
        </div>
    );
}
  
export default Main;