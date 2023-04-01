import React from "react";


function Login() {



    return (
        <div className="container h-100 ">
          <div className="row h-100 ">
            <div className="col-lg-6 col-xl-6 mx-auto h-100">
              <div className="h-100 flex-row d-flex justify-content-center align-items-center overflow-hidden">
                <div className="card-body p-4 p-sm-5">
                  <h5 className="card-title text-center mb-5 fw-light fs-5">프레임 로그인</h5>
      
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" id="Username" placeholder="myusername" required autoFocus></input>
                      <label htmlFor="Username">아이디</label>
                    </div>
      
      
                    <div className="form-floating mb-5">
                      <input type="password" className="form-control" id="Password" placeholder="Password"></input>
                      <label htmlFor="floatingPasPasswordsword">비밀번호</label>
                    </div>
      

      
                    <div className="d-grid mb-2">
                      <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" onClick="userLogin()">로그인</button>
                    </div>
      
                    <a className="d-block text-left mt-2 small" href="/auth/signup">빠른 회원가입 {">"} </a>
      
      
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
  
  export default Login;