(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4086],{99585:(e,r,a)=>{Promise.resolve().then(a.t.bind(a,87970,23)),Promise.resolve().then(a.bind(a,44149)),Promise.resolve().then(a.bind(a,21707))},21707:(e,r,a)=>{"use strict";a.d(r,{AllGiangVien:()=>l});var i=a(95155),s=a(12115),n=a(95851),t=a(67396),c=a(5565);let l=()=>{let[e,r]=(0,s.useState)([]);return(0,s.useEffect)(()=>{(async()=>{let e=await (0,n.ET)();e&&r(e)})()},[]),(0,i.jsxs)("div",{children:[(0,i.jsx)("div",{className:"rts-bread-crumbarea-1 rts-section-gap bg_image",children:(0,i.jsx)("div",{className:"container",children:(0,i.jsx)("div",{className:"row",children:(0,i.jsx)("div",{className:"col-lg-12",children:(0,i.jsxs)("div",{className:"breadcrumb-main-wrapper",children:[(0,i.jsx)("h1",{className:"title",children:"Người hướng dẫn"}),(0,i.jsxs)("div",{className:"pagination-wrapper",children:[(0,i.jsx)("a",{href:"index.html",children:"Trang chủ"}),(0,i.jsx)("i",{className:"fa-regular fa-chevron-right"}),(0,i.jsx)("a",{className:"active",href:"Instructor-2.html",children:"Tất cả người hướng dẫn"})]})]})})})})}),(0,i.jsx)("div",{className:"instrustor-area rts-section-gap",children:(0,i.jsx)("div",{className:"container",children:(0,i.jsx)("div",{className:"row g-5",children:e.map(e=>(0,i.jsx)("div",{className:"col-lg-3 col-md-6 col-sm-6 col-12",children:(0,i.jsxs)("div",{className:"single-instructor",children:[(0,i.jsxs)("div",{className:"thumbnail-img",children:[(0,i.jsx)(t.default,{href:"/page/Profile-insructor?id=".concat(e.id),children:(0,i.jsx)(c.default,{width:500,height:300,src:e.hinh,alt:"instructor"})}),(0,i.jsx)("div",{className:"social-img-instructor",children:(0,i.jsx)("ul",{children:e.mangxahoi&&e.mangxahoi.length>0?e.mangxahoi.map(e=>(0,i.jsx)("li",{className:"m-2",children:(0,i.jsx)("a",{href:e.url,children:(0,i.jsx)("i",{className:"fa-brands fa-".concat(e.nentang)})})},e.id)):(0,i.jsx)("li",{children:"No social links available"})})})]}),(0,i.jsx)("a",{href:"#",children:(0,i.jsx)("h5",{className:"title",children:e.ten})}),(0,i.jsx)("p",{children:e.tieusu})]})},e.id))})})})]})}},95851:(e,r,a)=>{"use strict";a.d(r,{ET:()=>s,dY:()=>i});let i=async()=>{let e=JSON.parse(localStorage.getItem("lecturerId"));if(!e||!e.giangvien)throw Error("No valid data found in local storage");try{let r=await fetch("http://huuphuoc.id.vn/api/giangvienhientai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:e.giangvien})});if(!r.ok)throw Error("Failed to fetch user data");return r.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},s=async()=>{try{let e=await fetch("http://huuphuoc.id.vn/api/giangvien");if(!e.ok)throw Error("HTTP error! Status: ".concat(e.status));return await e.json()}catch(e){return console.error("Error fetching data:",e),null}}}},e=>{var r=r=>e(e.s=r);e.O(0,[4297,7970,3264,4592,1068,9228,2651,3726,4149,8441,1517,7358],()=>r(99585)),_N_E=e.O()}]);