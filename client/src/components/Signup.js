import React, { useState, useRef } from "react";


function Signup() {

    const [inputs, setInputs] = useState({
        userId: '',
        userEmail: '',
        userPw: ''
    });
    
    const { userId, userEmail, userPw } = inputs;
    const userIdRef = useRef();
    const userEmailRef = useRef();
    const userPwRef = useRef();


    async function signup() {
        try {
            let user_id = btoa(userId);
            let user_pw = btoa(userPw);
            let user_email = btoa(userEmail);
        
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
            console.log(error)
            dds.toast({
                content: '에러가 발생했어요'
            })

        }
    }

    const userFormCheck = {
        switchValidMessage: function (form, boolean) {
            if (boolean) {
                form.classList.add("is-valid")
                form.classList.remove("is-invalid")
            } else {
                form.classList.add("is-invalid")
                form.classList.remove("is-valid")
            }
        },
        
        checkId: function (e) {
            const { value, name } = e.target; 
            let pattern_spc = /[^\w]/;
            
            if (pattern_spc.test(String(value)) == true || value == '' ) {
                userFormCheck.switchValidMessage(userIdRef.current, false)
            } else {
                userFormCheck.switchValidMessage(userIdRef.current, true)
            }
        },
        
        checkPassword: function (e) {
            const { value, name } = e.target; 

            let form_pw = value
            
            if (value.length < 8) {
                userFormCheck.switchValidMessage(userPwRef.current, false)
            } else {
                userFormCheck.switchValidMessage(userPwRef.current, true)
            }
        },
        
        checkEmail: function (e) {
            const { value, name } = e.target; 

            let patten_eml = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
            
            if (patten_eml.test(String(value)) == false) {
                userFormCheck.switchValidMessage(userEmailRef.current, false)
            } else {
                userFormCheck.switchValidMessage(userEmailRef.current, true)
            }
        }
    }


  const handleClickSignup = () => {
    signup()
  }

  const onChange = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

    return (
  
        <div className="container h-100 ">
          <div className="row h-100 ">
            <div className="col-lg-6 col-xl-6 mx-auto h-100">
              <div className="h-100 flex-row d-flex justify-content-center align-items-center overflow-hidden">
                <div className="card-body p-4 p-sm-5">
                  <h5 className="card-title text-center mb-5 fw-light fs-5">프레임 가입</h5>
      
                    <div className="form-floating mb-3">
                      <input type="text" className="form-control" placeholder="myusername" name="userId" ref={userIdRef} onInput={userFormCheck.checkId} onChange={onChange} value={userId} required autoFocus />
                      <label htmlFor="Username">아이디</label>

                      <div className="valid-feedback">
                        완벽해요.
                      </div>
                      <div className="invalid-feedback">
                        특수문자는 입력할 수 없어요.
                      </div>
                    </div>
      
                    <div className="form-floating mb-3">
                      <input type="email" className="form-control" name="userEmail" ref={userEmailRef} onInput={userFormCheck.checkEmail} onChange={onChange} value={userEmail} required />
                      <label htmlFor="Email">이메일</label>

                      <div className="valid-feedback">
                        멋진 이메일이네요.
                      </div>
                      <div className="invalid-feedback">
                        이메일 형식이 맞지 않아요.
                      </div>
                    </div>
      
                    <div className="form-floating mb-4">
                      <input type="password" className="form-control" ref={userPwRef} onInput={userFormCheck.checkPassword} onChange={onChange} value={userPw} name="userPw" />
                      <label htmlFor="Password">비밀번호</label>

                      <div className="valid-feedback">
                        안전해요.
                      </div>
                      <div className="invalid-feedback">
                        비밀번호는 최소 8글자 이상이어야 해요.
                      </div>
                    </div>
      

      
                    <div className="d-grid mb-2">
                      <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" onClick={handleClickSignup}>회원가입</button>
                    </div>
      
                    <a className="d-block text-left mt-2 small" href="/auth/login">로그인 {">"}</a>
      
      
                </div>
              </div>
            </div>
          </div>
        </div>
    );
  }
  
  export default Signup;