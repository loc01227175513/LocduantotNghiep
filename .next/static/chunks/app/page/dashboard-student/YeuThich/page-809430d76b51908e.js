(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[5877],{13555:(e,a,s)=>{Promise.resolve().then(s.bind(s,81024))},81024:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>h});var r=s(95155),o=s(12115),c=s(67396),i=s(80819),t=s(91068);s(85716);var l=s(5565);function h(){let[e,a]=(0,o.useState)([]);(0,o.useEffect)(()=>{(async()=>{try{let e=await (0,i.Qv)();a(e.khoahoc)}catch(e){console.error("Fetch error:",e),t.oR.error("Failed to fetch vouchers.")}})()},[]);let s=async e=>{try{await (0,i.Hv)(e),a(a=>a.filter(a=>a.khoahoc.id!==e)),t.oR.success("Deleted successfully."),window.location.reload()}catch(e){console.error("Delete error:",e),t.oR.error("Failed to delete the course.")}};return console.log(e),(0,r.jsxs)("div",{className:"overflow-y-scroll col-lg-9 h-lvh",style:{backgroundColor:"#f5f5f5"},children:[(0,r.jsx)(t.N9,{}),(0,r.jsx)("div",{className:"exrolled-course-wrapper-dashed",children:(0,r.jsx)("div",{className:"row g-5",children:e.map((e,a)=>(0,r.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-12 col-12",children:(0,r.jsxs)("div",{className:"single-course-style-three enroll-course",children:[(0,r.jsx)(c.default,{href:"/page/course-detail?id=".concat(e.khoahoc.id),className:"thumbnail",children:(0,r.jsx)(l.default,{width:500,height:300,src:e.khoahoc.hinh,alt:"course"})}),(0,r.jsxs)("div",{className:"body-area",children:[(0,r.jsxs)("div",{className:"course-top",children:[(0,r.jsx)("div",{className:"tags",children:"B\xe1n tốt nhất"}),(0,r.jsx)("div",{className:"price",children:0===e.khoahoc.gia&&0===e.khoahoc.giamgia?"Miễn ph\xed":"$ ".concat(e.khoahoc.gia)}),0!==e.khoahoc.gia||0!==e.khoahoc.giamgia?(0,r.jsxs)("div",{className:"line-through price",children:["$ ",e.khoahoc.giamgia]}):null]}),(0,r.jsx)(c.default,{href:"/page/course-detail?id=".concat(e.khoahoc.id),children:(0,r.jsx)("h5",{className:"title",children:e.khoahoc.ten})}),(0,r.jsxs)("div",{className:"teacher-stars",children:[(0,r.jsx)("div",{className:"teacher",children:(0,r.jsx)("span",{children:e.khoahoc.tenGiangVien})}),(0,r.jsxs)("ul",{className:"stars",children:[(0,r.jsx)("li",{className:"span",children:"4.5"}),(0,r.jsx)("li",{children:(0,r.jsx)("i",{className:"fa-sharp fa-solid fa-star"})}),(0,r.jsx)("li",{children:(0,r.jsx)("i",{className:"fa-sharp fa-solid fa-star"})}),(0,r.jsx)("li",{children:(0,r.jsx)("i",{className:"fa-sharp fa-solid fa-star"})}),(0,r.jsx)("li",{children:(0,r.jsx)("i",{className:"fa-sharp fa-solid fa-star"})}),(0,r.jsx)("li",{children:(0,r.jsx)("i",{className:"fa-sharp fa-regular fa-star"})})]})]}),(0,r.jsxs)("div",{className:"leasson-students",children:[(0,r.jsxs)("div",{className:"lesson",children:[(0,r.jsx)("i",{className:"fa-light fa-calendar-lines-pen"}),(0,r.jsxs)("span",{children:[e.baihoc.length||0," B\xe0i học"]})]}),(0,r.jsxs)("div",{className:"students",children:[(0,r.jsx)("i",{className:"fa-light fa-users"}),(0,r.jsxs)("span",{children:[e.thanhtoan.length||0," Học sinh"]})]})]}),(0,r.jsx)("button",{className:"rts-btn btn-border",children:(0,r.jsx)(c.default,{href:"/page/course-detail?id=".concat(e.khoahoc.id),children:"Xem Chi Tiết"})}),(0,r.jsxs)("button",{className:"rts-btn btn-border",onClick:()=>s(e.id),children:[(0,r.jsx)("i",{className:"fa-sharp fa-solid fa-trash"})," X\xf3a"]})]})]})},a))})})]})}},80819:(e,a,s)=>{"use strict";s.d(a,{Hv:()=>c,Qv:()=>o,fq:()=>r});let r=async e=>{let a;let s=localStorage.getItem("data");if(!s)throw Error("No user data found");try{a=JSON.parse(s)}catch(e){throw Error("Invalid user data")}if(!e)throw Error("No course ID provided");let r=await fetch("http://huuphuoc.id.vn/api/addKhoaHocYeuThich",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_khoahoc:e,id_nguoidung:a.id})});if(!r.ok)throw Error("Failed to add favorite course");return r.json()},o=async()=>{let e=JSON.parse(localStorage.getItem("data")),a=await fetch("http://huuphuoc.id.vn/api/showKhoaHocYeuThich",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!a.ok)throw Error("Failed to fetch courses");return a.json()},c=async e=>{try{let a=await fetch("http://huuphuoc.id.vn/api/deleteKhoaHocYeuThich/".concat(e),{method:"DELETE"});if(!a.ok)throw Error("Failed to unfollow lecturer");return await a.json()}catch(e){throw console.error("Error:",e),e}}},85716:()=>{},43463:(e,a,s)=>{"use strict";s.d(a,{A:()=>r});let r=function(){for(var e,a,s=0,r="",o=arguments.length;s<o;s++)(e=arguments[s])&&(a=function e(a){var s,r,o="";if("string"==typeof a||"number"==typeof a)o+=a;else if("object"==typeof a){if(Array.isArray(a)){var c=a.length;for(s=0;s<c;s++)a[s]&&(r=e(a[s]))&&(o&&(o+=" "),o+=r)}else for(r in a)a[r]&&(o&&(o+=" "),o+=r)}return o}(e))&&(r&&(r+=" "),r+=a);return r}}},e=>{var a=a=>e(e.s=a);e.O(0,[4797,7970,3264,1068,8441,1517,7358],()=>a(13555)),_N_E=e.O()}]);