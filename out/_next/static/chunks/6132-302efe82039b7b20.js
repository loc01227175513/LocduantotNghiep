"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[6132],{5565:(e,a,t)=>{t.d(a,{default:()=>s.a});var r=t(4146),s=t.n(r)},4146:(e,a,t)=>{Object.defineProperty(a,"__esModule",{value:!0}),function(e,a){for(var t in a)Object.defineProperty(e,t,{enumerable:!0,get:a[t]})}(a,{default:function(){return n},getImageProps:function(){return l}});let r=t(73749),s=t(40666),i=t(87970),o=r._(t(65514));function l(e){let{props:a}=(0,s.getImgProps)(e,{defaultLoader:o.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,t]of Object.entries(a))void 0===t&&delete a[e];return{props:a}}let n=i.Image},76132:(e,a,t)=>{t.r(a),t.d(a,{default:()=>h});var r=t(95155),s=t(12115),i=t(74411),o=t(4031),l=t(5565);let n=()=>{let[e,a]=(0,s.useState)({ten:"",email:"",dienthoai:"",hinh:null}),[t,o]=(0,s.useState)(null),n=async()=>{let e=new FormData;e.append("file",t),e.append("upload_preset","my_unsigned_preset");try{let t=await fetch("https://api.cloudinary.com/v1_1/".concat("dn7s1su66","/image/upload"),{method:"POST",body:e}),r=await t.json();a(e=>({...e,hinh:r.secure_url}))}catch(e){console.error(e)}},d=async()=>{try{let e=await (0,i.hX)();console.log(e),a({ten:e.data.ten||"",email:e.data.email||"",dienthoai:e.data.dienthoai||"",hinh:e.data.hinh||null})}catch(e){console.error("Failed to fetch user data:",e)}};(0,s.useEffect)(()=>{d()},[]);let c=async e=>{let{id:t,value:r,files:s}=e.target;s?(o(s[0]),await n()):a(e=>({...e,[t]:r}))},h=async a=>{a.preventDefault();try{await (0,i.TK)(e),alert("Th\xf4ng tin đ\xe3 được cập nhật th\xe0nh c\xf4ng")}catch(e){alert("Cập nhật th\xf4ng tin thất bại"),console.error(e)}};return(0,r.jsxs)("div",{className:"profile-form",children:[(0,r.jsx)("h3",{children:"Profile"}),(0,r.jsxs)("form",{onSubmit:h,children:[(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"ten",children:"T\xean"}),(0,r.jsx)("input",{type:"text",id:"ten",placeholder:"Nhập t\xean của bạn",value:e.ten,onChange:c})]}),(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"email",children:"Email"}),(0,r.jsx)("input",{type:"email",id:"email",placeholder:"Nhập email của bạn",value:e.email,onChange:c})]}),(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"dienthoai",children:"Điện thoại"}),(0,r.jsx)("input",{type:"text",id:"dienthoai",placeholder:"Nhập số điện thoại của bạn",value:e.dienthoai,onChange:c})]}),(0,r.jsxs)("div",{className:"form-group",children:[(0,r.jsx)("label",{htmlFor:"hinh",children:"H\xecnh"}),(0,r.jsx)("input",{type:"file",id:"hinh",onChange:c}),e.hinh&&(0,r.jsx)(l.default,{width:500,height:300,src:e.hinh,alt:"Profile",style:{width:"100px",height:"100px",marginTop:"10px"}})]}),(0,r.jsx)("button",{type:"submit",className:"rts-btn btn-primary",children:"Cập nhật th\xf4ng tin"})]})]})},d=()=>{let[e,a]=(0,s.useState)({facebook:"",skype:"",linkedin:"",pinterest:"",github:""});(0,s.useEffect)(()=>{(0,o.E)().then(e=>{a(e.data.reduce((e,a)=>(e[a.nentang]=a.url,e),{}))}).catch(e=>{console.error("Failed to fetch social profile data:",e)})},[]);let[t,i]=(0,s.useState)({facebook:"",skype:"",linkedin:"",pinterest:"",github:""});(0,s.useEffect)(()=>{e&&i({facebook:e.facebook||"",skype:e.skype||"",linkedin:e.linkedin||"",pinterest:e.pinterest||"",github:e.github||""})},[e]);let l=e=>{let{id:a,value:t}=e.target;i(e=>({...e,[a]:t}))},n=async e=>{e.preventDefault();try{let e=["facebook","skype","linkedin","pinterest","github"].filter(e=>t[e]).map(e=>(0,o.T)({nentang:e,url:t[e]}));await Promise.all(e),alert("Social profile links have been successfully updated")}catch(e){alert("Failed to update social profile links"),console.error(e)}};return(0,r.jsx)("div",{className:"tab-pane fade show active",id:"pills-home",role:"tabpanel","aria-labelledby":"pills-home-tab",children:(0,r.jsxs)("div",{className:"social-profile-link-wrapper",children:[(0,r.jsx)("h5",{className:"title",children:"Social Profile Link"}),(0,r.jsxs)("form",{onSubmit:n,children:[(0,r.jsxs)("div",{className:"single-profile-wrapper",children:[(0,r.jsx)("div",{className:"left",children:(0,r.jsxs)("div",{className:"icon",children:[(0,r.jsx)("i",{className:"fa-brands fa-facebook-f"}),(0,r.jsx)("span",{children:"Facebook"})]})}),(0,r.jsx)("div",{className:"right",children:(0,r.jsx)("input",{type:"text",id:"facebook",placeholder:"https://www.facebook.com/username",onChange:l,value:t.facebook})})]}),(0,r.jsxs)("div",{className:"single-profile-wrapper",children:[(0,r.jsx)("div",{className:"left",children:(0,r.jsxs)("div",{className:"icon",children:[(0,r.jsx)("i",{className:"fa-brands fa-skype"}),(0,r.jsx)("span",{children:"Skype"})]})}),(0,r.jsx)("div",{className:"right",children:(0,r.jsx)("input",{type:"text",id:"skype",placeholder:"https://www.skype.com/username",onChange:l,value:t.skype})})]}),(0,r.jsxs)("div",{className:"single-profile-wrapper",children:[(0,r.jsx)("div",{className:"left",children:(0,r.jsxs)("div",{className:"icon",children:[(0,r.jsx)("i",{className:"fa-brands fa-linkedin"}),(0,r.jsx)("span",{children:"LinkedIn"})]})}),(0,r.jsx)("div",{className:"right",children:(0,r.jsx)("input",{type:"text",id:"linkedin",placeholder:"https://www.linkedin.com/username",onChange:l,value:t.linkedin})})]}),(0,r.jsxs)("div",{className:"single-profile-wrapper",children:[(0,r.jsx)("div",{className:"left",children:(0,r.jsxs)("div",{className:"icon",children:[(0,r.jsx)("i",{className:"fa-brands fa-pinterest"}),(0,r.jsx)("span",{children:"Pinterest"})]})}),(0,r.jsx)("div",{className:"right",children:(0,r.jsx)("input",{type:"text",id:"pinterest",placeholder:"https://www.pinterest.com/username",onChange:l,value:t.pinterest})})]}),(0,r.jsxs)("div",{className:"single-profile-wrapper",children:[(0,r.jsx)("div",{className:"left",children:(0,r.jsxs)("div",{className:"icon",children:[(0,r.jsx)("i",{className:"fa-brands fa-github"}),(0,r.jsx)("span",{children:"Github"})]})}),(0,r.jsx)("div",{className:"right",children:(0,r.jsx)("input",{type:"text",id:"github",placeholder:"https://www.github.com/username",onChange:l,value:t.github})})]}),(0,r.jsx)("button",{type:"submit",className:"rts-btn btn-primary",children:"Update Profile"})]})]})})},c=()=>{let[e,a]=(0,s.useState)({old_password:"",password:"",password_confirmation:""}),t=e=>{let{id:t,value:r}=e.target;a(e=>({...e,[t]:r}))},o=async a=>{if(a.preventDefault(),e.password!==e.password_confirmation){alert("New password and confirmation do not match");return}try{await (0,i.BM)(e),alert("Password has been successfully reset")}catch(e){alert("Failed to reset password"),console.error(e)}};return(0,r.jsx)("div",{className:"setting-change-password-area",children:(0,r.jsxs)("form",{onSubmit:o,className:"form-password-area",children:[(0,r.jsxs)("div",{className:"single-input",children:[(0,r.jsx)("label",{htmlFor:"old_password",children:"Current Password"}),(0,r.jsx)("input",{id:"old_password",type:"password",placeholder:"Current Password",value:e.old_password,onChange:t,required:!0})]}),(0,r.jsxs)("div",{className:"single-input",children:[(0,r.jsx)("label",{htmlFor:"password",children:"New Password"}),(0,r.jsx)("input",{id:"password",type:"password",placeholder:"New Password",value:e.password,onChange:t,required:!0})]}),(0,r.jsxs)("div",{className:"single-input",children:[(0,r.jsx)("label",{htmlFor:"password_confirmation",children:"Re-type New Password"}),(0,r.jsx)("input",{id:"password_confirmation",type:"password",placeholder:"Re-type New Password",value:e.password_confirmation,onChange:t,required:!0})]}),(0,r.jsx)("button",{type:"submit",className:"rts-btn btn-primary",children:"Reset Password"})]})})},h=()=>{let[e,a]=(0,s.useState)("profile");return(0,r.jsx)("div",{className:"col-lg-9",children:(0,r.jsxs)("div",{className:"settings-wrapper-dashed",children:[(0,r.jsx)("h5",{className:"title",children:"Settings"}),(0,r.jsxs)("ul",{className:"nav nav-pills mb-3 tab-buttons",id:"pills-tab",role:"tablist",children:[(0,r.jsx)("li",{className:"nav-item",role:"presentation",children:(0,r.jsx)("button",{className:"nav-link ".concat("profile"===e?"active":""),id:"pills-home-tab","data-bs-toggle":"pill","data-bs-target":"#pills-home",type:"button",role:"tab","aria-controls":"pills-home","aria-selected":"profile"===e,onClick:()=>a("profile"),children:"Profile"})}),(0,r.jsx)("li",{className:"nav-item",role:"presentation",children:(0,r.jsx)("button",{className:"nav-link ".concat("password"===e?"active":""),id:"pills-profile-tab","data-bs-toggle":"pill","data-bs-target":"#pills-profile",type:"button",role:"tab","aria-controls":"pills-profile","aria-selected":"password"===e,onClick:()=>a("password"),children:"Password"})}),(0,r.jsx)("li",{className:"nav-item",role:"presentation",children:(0,r.jsx)("button",{className:"nav-link ".concat("social"===e?"active":""),id:"pills-profile-tab","data-bs-toggle":"pill","data-bs-target":"#pills-profile",type:"button",role:"tab","aria-controls":"pills-profile","aria-selected":"social"===e,onClick:()=>a("social"),children:"Social"})})]}),(0,r.jsx)("div",{className:"tab-content",id:"pills-tabContent",children:(()=>{switch(e){case"profile":default:return(0,r.jsx)(n,{});case"password":return(0,r.jsx)(c,{});case"social":return(0,r.jsx)(d,{})}})()})]})})}},4031:(e,a,t)=>{t.d(a,{E:()=>s,T:()=>r});let r=async e=>{let a=JSON.parse(localStorage.getItem("data"));if(!a||!a.id)throw Error("No valid data found in local storage");let t=Object.values(e.url).join(""),r={id_nguoidung:a.id,nentang:e.nentang,url:t};try{let e=await fetch("http://huuphuoc.id.vn/api/mangxahoi",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!e.ok){let a=await e.json();throw console.error("Error Response:",a),Error("Failed to update user data")}return await e.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},s=async()=>{let e=JSON.parse(localStorage.getItem("data"));if(!e||!e.id)throw Error("No valid data found in local storage");let a={id_nguoidung:e.id};try{let e=await fetch("http://huuphuoc.id.vn/api/showmangxahoi",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});if(!e.ok){let a=await e.json();throw console.error("Error Response:",a),Error("Failed to update user data")}return await e.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}}},74411:(e,a,t)=>{t.d(a,{BM:()=>o,TK:()=>s,hX:()=>i,kQ:()=>r});let r=async()=>{let e=JSON.parse(localStorage.getItem("data"));if(!e||!e.id)throw Error("No valid data found in local storage");try{let a=await fetch("http://huuphuoc.id.vn/api/laynguoidung",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!a.ok)throw Error("Failed to fetch user data");return a.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},s=async e=>{let a=JSON.parse(localStorage.getItem("data"));if(!a||!a.id)throw Error("No valid data found in local storage");try{let t=await fetch("http://huuphuoc.id.vn/api/CapNhatNguoiDung",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:a.id,...e})});if(!t.ok)throw Error("Failed to update user data");return t.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},i=async()=>{let e=JSON.parse(localStorage.getItem("data"));if(!e||!e.id)throw Error("No valid data found in local storage");try{let a=await fetch("http://huuphuoc.id.vn/api/ShowNguoiDung",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!a.ok)throw Error("Failed to update user data");return a.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},o=async e=>{let a=JSON.parse(localStorage.getItem("data"));if(!a||!a.id)throw Error("No valid data found in local storage");let t={id_nguoidung:a.id,...e};try{let e=await fetch("http://huuphuoc.id.vn/api/CapNhatMatKhau",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});if(!e.ok){let a=await e.json();throw console.error("Error Response:",a),Error("Failed to update user data")}return await e.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}}}}]);