(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[7809],{79830:(e,a,r)=>{Promise.resolve().then(r.bind(r,56650))},56650:(e,a,r)=>{"use strict";r.r(a),r.d(a,{default:()=>t});var i=r(95155),s=r(12115),o=r(74411);function t(){let[e,a]=(0,s.useState)(null);return((0,s.useEffect)(()=>{(0,o.kQ)().then(e=>{a(e.data)})},[]),e)?(console.log(e),(0,i.jsx)("div",{className:"overflow-y-scroll col-lg-9 rts-sticky-column-item h-lvh",children:(0,i.jsxs)("div",{className:"right-sidebar-my-profile-dash theiaStickySidebar pt--30",children:[(0,i.jsx)("h5",{className:"title",children:"Hồ sơ của t\xf4i"}),(0,i.jsxs)("div",{className:"my-single-portfolio-dashed",children:[(0,i.jsx)("div",{className:"name",children:"NHẬN DẠNG"}),(0,i.jsx)("div",{className:"value",children:e.id})]}),(0,i.jsxs)("div",{className:"my-single-portfolio-dashed",children:[(0,i.jsx)("div",{className:"name",children:"T\xean"}),(0,i.jsx)("div",{className:"value",children:e.ten})]}),(0,i.jsxs)("div",{className:"my-single-portfolio-dashed",children:[(0,i.jsx)("div",{className:"name",children:"E-mail"}),(0,i.jsx)("div",{className:"value",children:e.email})]}),(0,i.jsxs)("div",{className:"my-single-portfolio-dashed",children:[(0,i.jsx)("div",{className:"name",children:"Số điện thoại"}),(0,i.jsx)("div",{className:"value",children:e.dienthoai})]}),(0,i.jsxs)("div",{className:"my-single-portfolio-dashed",children:[(0,i.jsx)("div",{className:"name",children:"Profile Picture"}),(0,i.jsx)("div",{className:"value",children:e.hinh})]}),(0,i.jsxs)("div",{className:"my-single-portfolio-dashed",children:[(0,i.jsx)("div",{className:"name",children:"Vai tr\xf2"}),(0,i.jsx)("div",{className:"value",children:e.vaitro})]}),(0,i.jsxs)("div",{className:"my-single-portfolio-dashed",children:[(0,i.jsx)("div",{className:"name",children:"Được tạo ra tại"}),(0,i.jsx)("div",{className:"value",children:e.created_at})]}),(0,i.jsxs)("div",{className:"my-single-portfolio-dashed",children:[(0,i.jsx)("div",{className:"name",children:"Cập nhật tại"}),(0,i.jsx)("div",{className:"value",children:e.updated_at})]})]})})):(0,i.jsx)("div",{children:"Loading..."})}},74411:(e,a,r)=>{"use strict";r.d(a,{BM:()=>t,TK:()=>s,hX:()=>o,kQ:()=>i});let i=async()=>{let e=JSON.parse(localStorage.getItem("data"));if(!e||!e.id)throw Error("No valid data found in local storage");try{let a=await fetch("http://huuphuoc.id.vn/api/laynguoidung",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!a.ok)throw Error("Failed to fetch user data");return a.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},s=async e=>{let a=JSON.parse(localStorage.getItem("data"));if(!a||!a.id)throw Error("No valid data found in local storage");try{let r=await fetch("http://huuphuoc.id.vn/api/CapNhatNguoiDung",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:a.id,...e})});if(!r.ok)throw Error("Failed to update user data");return r.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},o=async()=>{let e=JSON.parse(localStorage.getItem("data"));if(!e||!e.id)throw Error("No valid data found in local storage");try{let a=await fetch("http://huuphuoc.id.vn/api/ShowNguoiDung",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!a.ok)throw Error("Failed to update user data");return a.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},t=async e=>{let a=JSON.parse(localStorage.getItem("data"));if(!a||!a.id)throw Error("No valid data found in local storage");let r={id_nguoidung:a.id,...e};try{let e=await fetch("http://huuphuoc.id.vn/api/CapNhatMatKhau",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!e.ok){let a=await e.json();throw console.error("Error Response:",a),Error("Failed to update user data")}return await e.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}}}},e=>{var a=a=>e(e.s=a);e.O(0,[8441,1517,7358],()=>a(79830)),_N_E=e.O()}]);