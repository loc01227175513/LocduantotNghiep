(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4172],{67122:(e,i,s)=>{Promise.resolve().then(s.bind(s,4621))},4621:(e,i,s)=>{"use strict";s.r(i),s.d(i,{default:()=>t});var a=s(95155),r=s(12115),l=s(95851);function t(){var e;let[i,s]=(0,r.useState)(null);return((0,r.useEffect)(()=>{(0,l.dY)().then(e=>{s(e.data)})},[]),i)?(0,a.jsx)("div",{className:"col-lg-9 rts-sticky-column-item overflow-y-scroll h-lvh",children:(0,a.jsxs)("div",{className:"right-sidebar-my-profile-dash theiaStickySidebar pt--30",children:[(0,a.jsx)("h5",{className:"title",children:"Hồ sơ của t\xf4i"}),(0,a.jsxs)("div",{className:"my-single-portfolio-dashed highlight-border",children:[(0,a.jsx)("div",{className:"name",children:"Ng\xe0y đăng k\xfd"}),(0,a.jsx)("div",{className:"value",children:i.created_at})]}),(0,a.jsxs)("div",{className:"my-single-portfolio-dashed highlight-border",children:[(0,a.jsx)("div",{className:"name",children:"T\xean người d\xf9ng:"}),(0,a.jsx)("div",{className:"value",children:i.ten})]}),(0,a.jsxs)("div",{className:"my-single-portfolio-dashed highlight-border",children:[(0,a.jsx)("div",{className:"name",children:"E-mail:"}),(0,a.jsx)("div",{className:"value",children:i.email})]}),(0,a.jsxs)("div",{className:"my-single-portfolio-dashed highlight-border",children:[(0,a.jsx)("div",{className:"name",children:"Số điện thoại:"}),(0,a.jsx)("div",{className:"value",children:i.dienthoai?i.dienthoai:"chưa c\xf3"})]}),(0,a.jsxs)("div",{className:"my-single-portfolio-dashed highlight-border",children:[(0,a.jsx)("div",{className:"name",children:"Kỹ năng/nghề nghiệp"}),(0,a.jsx)("div",{className:"value",children:null===(e=i.trinhdo)||void 0===e?void 0:e.ten})]}),(0,a.jsxs)("div",{className:"my-single-portfolio-dashed highlight-border",children:[(0,a.jsx)("div",{className:"name",children:"Tiểu sử"}),(0,a.jsx)("div",{className:"value",children:i.tieusu?i.tieusu:"chưa c\xf3"})]})]})}):(0,a.jsx)("div",{children:"Đang tải..."})}},95851:(e,i,s)=>{"use strict";s.d(i,{ET:()=>r,dY:()=>a});let a=async()=>{let e=JSON.parse(localStorage.getItem("lecturerId"));if(!e||!e.giangvien)throw Error("No valid data found in local storage");try{let i=await fetch("http://huuphuoc.id.vn/api/giangvienhientai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:e.giangvien})});if(!i.ok)throw Error("Failed to fetch user data");return i.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},r=async()=>{try{let e=await fetch("http://huuphuoc.id.vn/api/giangvien");if(!e.ok)throw Error("HTTP error! Status: ".concat(e.status));return await e.json()}catch(e){return console.error("Error fetching data:",e),null}}}},e=>{var i=i=>e(e.s=i);e.O(0,[8441,1517,7358],()=>i(67122)),_N_E=e.O()}]);