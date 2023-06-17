import React from "react";


function NotFound() {
  function handleClickHome() {
    location.href = '/'
  }
    return (
        <div className="container h-100 ">
        <div className="row h-100 ">
          <div className="col-lg-6 col-xl-6 mx-auto h-100">
            <div className="h-100 flex-row d-flex justify-content-center align-items-center overflow-hidden text-center">
              <div className="card-body p-4 p-sm-5">
                <h2 className="text-center mb-3 text-title">오 이게 무슨일이죠..?</h2>
                <h6 className="text-center mb-4 text-secondary">페이지를 표시하지 못했어요ㅠㅠ </h6>
                <button className="btn btn-blue-tint" onClick={handleClickHome}>홈으로</button>

    
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotFound;