import React, { useState } from "react";


function Login() {
  const [inputs, setInputs] = useState({
    userId: '',
    userPw: ''
  });

  const { userId, userPw } = inputs;



  async function login() {
    let user_id = btoa(userId);
    let user_pw = btoa(userPw);
        
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


  const handleClickLogin = () => {
    login()
  }

  const onChange = (e) => {
    const { value, name } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setInputs({
      ...inputs, // 기존의 input 객체를 복사한 뒤
      [name]: value // name 키를 가진 값을 value 로 설정
    });
  };

    return (
        <div className="container h-100 ">
          <div className="row h-100 ">
            <div className="col-lg-6 col-xl-6 mx-auto h-100">
              <div className="h-100 flex-row d-flex justify-content-center align-items-center overflow-hidden">
                <div className="card-body p-4 p-sm-5">
                  <h5 className="card-title text-center mb-5 fw-light fs-5">프레임 로그인</h5>
      
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" placeholder="myusername" name="userId" onChange={onChange} value={userId} required autoFocus></input>
                      <label htmlFor="Username">아이디</label>
                    </div>
      
      
                    <div className="form-floating mb-5">
                      <input type="password" className="form-control" placeholder="Password" name="userPw" onChange={onChange} value={userPw}></input>
                      <label htmlFor="floatingPasPasswordsword">비밀번호</label>
                    </div>
      

      
                    <div className="d-grid mb-2">
                      <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" onClick={handleClickLogin}>로그인</button>
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