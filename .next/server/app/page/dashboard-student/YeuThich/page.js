(()=>{var e={};e.id=5877,e.ids=[5877],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},21820:e=>{"use strict";e.exports=require("os")},33873:e=>{"use strict";e.exports=require("path")},27910:e=>{"use strict";e.exports=require("stream")},83997:e=>{"use strict";e.exports=require("tty")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},42955:(e,a,t)=>{"use strict";t.r(a),t.d(a,{GlobalError:()=>i.a,__next_app__:()=>l,pages:()=>h,routeModule:()=>u,tree:()=>c});var s=t(70260),r=t(28203),o=t(25155),i=t.n(o),n=t(67292),d={};for(let e in n)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>n[e]);t.d(a,d);let c=["",{children:["page",{children:["dashboard-student",{children:["YeuThich",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(t.bind(t,46176)),"C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\page\\dashboard-student\\YeuThich\\page.jsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,3731)),"C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\page\\dashboard-student\\layout.jsx"]}]},{}]},{layout:[()=>Promise.resolve().then(t.bind(t,62804)),"C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(t.t.bind(t,19937,23)),"next/dist/client/components/not-found-error"]}],h=["C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\page\\dashboard-student\\YeuThich\\page.jsx"],l={require:t,loadChunk:()=>Promise.resolve()},u=new s.AppPageRouteModule({definition:{kind:r.RouteKind.APP_PAGE,page:"/page/dashboard-student/YeuThich/page",pathname:"/page/dashboard-student/YeuThich",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:c}})},16453:(e,a,t)=>{Promise.resolve().then(t.bind(t,46176))},52901:(e,a,t)=>{Promise.resolve().then(t.bind(t,580))},580:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>c});var s=t(45512),r=t(58009),o=t(26008),i=t(38649),n=t(44750);t(25806);var d=t(45103);function c(){let[e,a]=(0,r.useState)([]),t=async e=>{try{await (0,i.Hv)(e),a(a=>a.filter(a=>a.khoahoc.id!==e)),n.oR.success("Deleted successfully."),window.location.reload()}catch(e){console.error("Delete error:",e),n.oR.error("Failed to delete the course.")}};return console.log(e),(0,s.jsxs)("div",{className:"overflow-y-scroll col-lg-9 h-lvh",style:{backgroundColor:"#f5f5f5"},children:[(0,s.jsx)(n.N9,{}),(0,s.jsx)("div",{className:"exrolled-course-wrapper-dashed",children:(0,s.jsx)("div",{className:"row g-5",children:e.map((e,a)=>(0,s.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-12 col-12",children:(0,s.jsxs)("div",{className:"single-course-style-three enroll-course",children:[(0,s.jsx)(o.default,{href:`/page/course-detail?id=${e.khoahoc.id}`,className:"thumbnail",children:(0,s.jsx)(d.default,{width:500,height:300,src:e.khoahoc.hinh,alt:"course"})}),(0,s.jsxs)("div",{className:"body-area",children:[(0,s.jsxs)("div",{className:"course-top",children:[(0,s.jsx)("div",{className:"tags",children:"B\xe1n tốt nhất"}),(0,s.jsx)("div",{className:"price",children:0===e.khoahoc.gia&&0===e.khoahoc.giamgia?"Miễn ph\xed":`$ ${e.khoahoc.gia}`}),0!==e.khoahoc.gia||0!==e.khoahoc.giamgia?(0,s.jsxs)("div",{className:"line-through price",children:["$ ",e.khoahoc.giamgia]}):null]}),(0,s.jsx)(o.default,{href:`/page/course-detail?id=${e.khoahoc.id}`,children:(0,s.jsx)("h5",{className:"title",children:e.khoahoc.ten})}),(0,s.jsxs)("div",{className:"teacher-stars",children:[(0,s.jsx)("div",{className:"teacher",children:(0,s.jsx)("span",{children:e.khoahoc.tenGiangVien})}),(0,s.jsxs)("ul",{className:"stars",children:[(0,s.jsx)("li",{className:"span",children:"4.5"}),(0,s.jsx)("li",{children:(0,s.jsx)("i",{className:"fa-sharp fa-solid fa-star"})}),(0,s.jsx)("li",{children:(0,s.jsx)("i",{className:"fa-sharp fa-solid fa-star"})}),(0,s.jsx)("li",{children:(0,s.jsx)("i",{className:"fa-sharp fa-solid fa-star"})}),(0,s.jsx)("li",{children:(0,s.jsx)("i",{className:"fa-sharp fa-solid fa-star"})}),(0,s.jsx)("li",{children:(0,s.jsx)("i",{className:"fa-sharp fa-regular fa-star"})})]})]}),(0,s.jsxs)("div",{className:"leasson-students",children:[(0,s.jsxs)("div",{className:"lesson",children:[(0,s.jsx)("i",{className:"fa-light fa-calendar-lines-pen"}),(0,s.jsxs)("span",{children:[e.baihoc.length||0," B\xe0i học"]})]}),(0,s.jsxs)("div",{className:"students",children:[(0,s.jsx)("i",{className:"fa-light fa-users"}),(0,s.jsxs)("span",{children:[e.thanhtoan.length||0," Học sinh"]})]})]}),(0,s.jsx)("button",{className:"rts-btn btn-border",children:(0,s.jsx)(o.default,{href:`/page/course-detail?id=${e.khoahoc.id}`,children:"Xem Chi Tiết"})}),(0,s.jsxs)("button",{className:"rts-btn btn-border",onClick:()=>t(e.id),children:[(0,s.jsx)("i",{className:"fa-sharp fa-solid fa-trash"})," X\xf3a"]})]})]})},a))})})]})}},38649:(e,a,t)=>{"use strict";t.d(a,{Hv:()=>o,Qv:()=>r,fq:()=>s});let s=async e=>{let a;let t=localStorage.getItem("data");if(!t)throw Error("No user data found");try{a=JSON.parse(t)}catch(e){throw Error("Invalid user data")}if(!e)throw Error("No course ID provided");let s=await fetch("http://huuphuoc.id.vn/api/addKhoaHocYeuThich",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_khoahoc:e,id_nguoidung:a.id})});if(!s.ok)throw Error("Failed to add favorite course");return s.json()},r=async()=>{let e=JSON.parse(localStorage.getItem("data")),a=await fetch("http://huuphuoc.id.vn/api/showKhoaHocYeuThich",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!a.ok)throw Error("Failed to fetch courses");return a.json()},o=async e=>{let a=`http://huuphuoc.id.vn/api/deleteKhoaHocYeuThich/${e}`;try{let e=await fetch(a,{method:"DELETE"});if(!e.ok)throw Error("Failed to unfollow lecturer");return await e.json()}catch(e){throw console.error("Error:",e),e}}},46176:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>s});let s=(0,t(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\xampp\\\\htdocs\\\\DuAnTotNghiep\\\\Hosting\\\\techstudent-datn - Copy\\\\aaaaaaaaaa\\\\LocduantotNghiep\\\\LocduantotNghiep\\\\src\\\\app\\\\page\\\\dashboard-student\\\\YeuThich\\\\page.jsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\page\\dashboard-student\\YeuThich\\page.jsx","default")},25806:()=>{}};var a=require("../../../../webpack-runtime.js");a.C(e);var t=e=>a(a.s=e),s=a.X(0,[1491,1902,9562,5668,2701,3260,1782,1492,7283],()=>t(42955));module.exports=s})();