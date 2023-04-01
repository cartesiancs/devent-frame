import React from "react";


function Main() {

    function handleClickSignup () {
        location.href = '/auth/signup'
    }

    function handleClickLogin () {
        location.href = '/auth/login'
    }
    

    return (
        <header class="bg-white py-5">
            <div class="container-fluid px-5 pt-4 pb-2">
                <div class="row gx-5 justify-content-center">
                    <div class="col-lg-7">
                        <div class="text-center mt-5">
                            <h1 class="display-5 fw-bolder text-dark font-weight-lg mb-2">더 모던하고 깔끔한 게시판의 세계로</h1>
                            <p class="font-weight-sm mb-4 mt-3">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit!</p>
                        </div>
                        <div class="d-grid gap-3 d-sm-flex justify-content-sm-center" id="login_box">
                            <button class="btn btn-blue font-weight-md btn-lg px-4 btn-rounded" onClick={handleClickSignup}><i class="fas fa-user-plus"></i> 가입</button>
                            <button class="btn btn-light font-weight-md btn-lg px-4 me-sm-3 btn-rounded" onClick={handleClickLogin}><i class="fas fa-sign-in-alt"></i> 로그인</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
  }
  
  export default Main;