var main;(()=>{"use strict";var e={d:(t,o)=>{for(var s in o)e.o(o,s)&&!e.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:o[s]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r:e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})}},t={};e.r(t),e.d(t,{Feeds:()=>o,Token:()=>s,Users:()=>a,userFormCheck:()=>n});class o{constructor(e){this.token=e}async select(e,t){let o=new URLSearchParams(t||{}).toString();return(await fetch(`/api/feeds/${e}?${o}`,{method:"GET",headers:{"Content-Type":"application/x-www-form-urlencoded","x-access-token":this.token}})).json()}async insert(e){return(await fetch("/api/feeds",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded","x-access-token":this.token},body:`content="${e}"`})).json()}async delete(e){return(await fetch("/api/feeds/"+e,{method:"DELETE",headers:{"Content-Type":"application/x-www-form-urlencoded","x-access-token":this.token}})).json()}async update(e,t){return(await fetch("/api/feeds/"+e,{method:"PUT",headers:{"Content-Type":"application/x-www-form-urlencoded","x-access-token":this.token},body:`content=${t}`})).json()}}class s{constructor(){}get(e){let t=e+"=",o="";const s=document.cookie.split(";");for(let e=0;e<s.length;e++)if(" "===s[e][0]&&(s[e]=s[e].substring(1)),0===s[e].indexOf(t))return o=s[e].slice(t.length,s[e].length),o;return o}check(e){try{return{is_vaild:1,decoded:JSON.parse(atob(e.split(".")[1]))}}catch(e){return{is_vaild:0}}}}class a{constructor(){this.token=new s}async signup(){try{let e=btoa(document.querySelector("#Username").value),t=btoa(document.querySelector("#Password").value),o=btoa(document.querySelector("#Email").value);if(""==e||""==t||""==o)return dds.toast({content:"입력칸을 확인해주세요"});let s=await fetch("/api/users",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`user_id=${e}&user_pw=${t}&user_email=${o}`}),a=await s.json();1==a.status?(Cookies.set("user",a.token),Swal.fire({icon:"success",title:"가입에 성공했어요",showConfirmButton:!1,heightAuto:!1,timer:1300}),setTimeout((()=>{location.href="/"}),1200)):2==a.status?Swal.fire({icon:"error",title:"바밀번호는 8자리 이상이여야 해요",showConfirmButton:!1,heightAuto:!1,timer:1500}):5==a.status?Swal.fire({icon:"error",title:"아이디에 특수문자는 입력할 수 없어요",showConfirmButton:!1,heightAuto:!1,timer:1500}):0==a.status&&Swal.fire({icon:"error",title:"사용 불가한 아이디 또는 이메일이에요",showConfirmButton:!1,heightAuto:!1,timer:1500})}catch(e){Swal.fire({icon:"error",title:"에러가 발생했어요",showConfirmButton:!1,heightAuto:!1,timer:1500})}}async login(){let e=btoa(document.querySelector("#Username").value),t=btoa(document.querySelector("#Password").value),o=await fetch("/api/auth/login",{method:"POST",headers:{"Content-Type":"application/x-www-form-urlencoded"},body:`user_id="${e}"&user_pw="${t}"`}),s=await o.json();1==s.status?(Cookies.set("user",s.token),Swal.fire({icon:"success",title:"로그인에 성공했어요",showConfirmButton:!1,heightAuto:!1,timer:1100}),setTimeout((()=>{location.href="/"}),1400)):-1==s.status?dds.toast({content:"탈퇴한 회원이거나 권한이 없어요"}):dds.toast({content:"로그인 정보가 맞지 않아요"})}async delete(){let e=token.check(token.get("user")).decoded.user_id,t=await fetch("/api/users/"+e,{method:"DELETE",headers:{"Content-Type":"application/x-www-form-urlencoded","x-access-token":this.token.get("user")}}),o=await t.json();1==o.status?(Swal.fire({icon:"success",title:"정상적으로 탈퇴를 완료했어요",showConfirmButton:!1,timer:1e3}),setTimeout((()=>{location.href="/"}),1200)):-1==o.status?Swal.fire({icon:"error",title:"권한이 없어요",showConfirmButton:!1,heightAuto:!1,timer:1500}):Swal.fire({icon:"error",title:"탈퇴에 실패했어요",showConfirmButton:!1,timer:1e3})}async update(e,t){let o=await fetch("/api/users/"+e,{method:"PUT",headers:{"Content-Type":"application/x-www-form-urlencoded","x-access-token":this.token.get("user")},body:`user_name=${t.name}`});return await o.json()}async get(e){let t=await fetch("/api/users/"+e,{method:"GET",headers:{"x-access-token":this.token.get("user")}});return await t.json()}async checkAuth(){let e=await fetch("/api/auth/me",{method:"GET",headers:{"x-access-token":this.token.get("user")}});return await e.json()}async logout(){try{document.cookie="user=; expires=Thu, 01 Jan 1999 00:00:10 GMT;",location.href="/"}catch(e){return 0}}}const n={switchValidMessage:function(e,t){t?(e.classList.add("is-valid"),e.classList.remove("is-invalid")):(e.classList.add("is-invalid"),e.classList.remove("is-valid"))},checkId:function(){let e=document.querySelector("#Username");1==/[^\w]/.test(String(e.value))||""==e.value?switchValidMessage(e,!1):switchValidMessage(e,!0)},checkPassword:function(){let e=document.querySelector("#Password");e.value.length<8?switchValidMessage(e,!1):switchValidMessage(e,!0)},checkEmail:function(){let e=document.querySelector("#Email");0==/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(String(e.value))?switchValidMessage(e,!1):switchValidMessage(e,!0)}};main=t})();