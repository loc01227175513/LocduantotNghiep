exports.id=6164,exports.ids=[6164],exports.modules={24852:(e,a,s)=>{Promise.resolve().then(s.bind(s,36559)),Promise.resolve().then(s.bind(s,90675))},84532:(e,a,s)=>{Promise.resolve().then(s.bind(s,81492)),Promise.resolve().then(s.bind(s,12967))},12967:(e,a,s)=>{"use strict";s.d(a,{Headerdashboardstudent2:()=>i});var t=s(45512),r=s(58009),n=s(26008);s(45103),s(79334);let i=({page:e})=>{let[a,s]=(0,r.useState)(e),i=e=>{s(e)};return(0,t.jsx)("div",{className:"col-lg-3 rts-sticky-column-item h-lvh overflow-y-scroll",children:(0,t.jsxs)("div",{className:"left-sindebar-dashboard theiaStickySidebar",children:[(0,t.jsxs)("div",{className:"dashboard-left-single-wrapper",children:[(0,t.jsxs)(n.default,{href:"/page/lecturer-dashboard",className:`single-item ${"home"===a?"active":""}`,onClick:()=>i("home"),children:[(0,t.jsx)("i",{className:"fa-light fa-house"}),(0,t.jsx)("p",{children:"Bảng điều khiển"})]}),(0,t.jsxs)(n.default,{href:"/page/lecturer-dashboard/myprofile",className:`single-item ${"hoso"===a?"active":""}`,onClick:()=>i("hoso"),children:[(0,t.jsx)("i",{className:"fa-regular fa-user"}),(0,t.jsx)("p",{children:"Hồ sơ của t\xf4i"})]}),(0,t.jsxs)(n.default,{href:"/page/lecturer-dashboard/khoahocdanghoc",className:`single-item ${"khoahoc"===a?"active":""}`,onClick:()=>i("khoahoc"),children:[(0,t.jsx)("i",{className:"fa-light fa-graduation-cap"}),(0,t.jsx)("p",{children:"Kh\xf3a học đang học"})]}),(0,t.jsxs)(n.default,{href:"/page/lecturer-dashboard/lichsudonhang",className:`single-item ${"lichsudonhang"===a?"active":""}`,onClick:()=>i("lichsudonhang"),children:[(0,t.jsx)("i",{className:"fa-sharp fa-light fa-bag-shopping"}),(0,t.jsx)("p",{children:"Lịch sử đơn h\xe0ng"})]})]}),(0,t.jsxs)("div",{className:"dashboard-left-single-wrapper mt--40",children:[(0,t.jsx)("h4",{className:"title mb--5",children:"Người hướng dẫn"}),(0,t.jsxs)(n.default,{href:"/page/lecturer-dashboard/quanlykhoahoc",className:"single-item",children:[(0,t.jsx)("i",{className:"fa-light fa-book"}),(0,t.jsx)("p",{children:"Quản l\xfd kh\xf3a học"})]}),(0,t.jsxs)(n.default,{href:"my-bundles.html",className:"single-item",children:[(0,t.jsx)("i",{className:"fa-sharp fa-regular fa-layer-group"}),(0,t.jsx)("p",{children:"G\xf3i của t\xf4i"})]}),(0,t.jsxs)(n.default,{href:"announcement.html",className:"single-item",children:[(0,t.jsx)("i",{className:"fa-solid fa-megaphone"}),(0,t.jsx)("p",{children:"Th\xf4ng b\xe1o"})]}),(0,t.jsxs)(n.default,{href:"withdrowals.html",className:"single-item",children:[(0,t.jsx)("i",{className:"fa-regular fa-box"}),(0,t.jsx)("p",{children:"R\xfat tiền"})]}),(0,t.jsxs)(n.default,{href:"/page/lecturer-dashboard/NhanTinGiangVien",className:"single-item",children:[(0,t.jsx)("i",{className:"fa-regular fa-box"}),(0,t.jsx)("p",{children:"Nhắn Tin Giảng Vi\xean"})]})]}),(0,t.jsxs)("div",{className:"dashboard-left-single-wrapper bbnone mt--40",children:[(0,t.jsx)("h4",{className:"title mb--5",children:"User"}),(0,t.jsxs)(n.default,{href:"/page/lecturer-dashboard/setting",className:"single-item",children:[(0,t.jsx)("i",{className:"fa-sharp fa-regular fa-gear"}),(0,t.jsx)("p",{children:"C\xe0i đặt"})]}),(0,t.jsxs)(n.default,{href:"index.html",className:"single-item",children:[(0,t.jsx)("i",{className:"fa-light fa-right-from-bracket"}),(0,t.jsx)("p",{children:"Đăng xuất"})]})]})]})})}},97185:(e,a,s)=>{"use strict";s.d(a,{OG:()=>r,eM:()=>n,xh:()=>t});let t=async()=>{let e=JSON.parse(localStorage.getItem("data")),a=await fetch("http://huuphuoc.id.vn/api/kiemtragiangvien",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!a.ok)throw Error("Failed to fetch courses");return a.json()},r=async()=>{let e=JSON.parse(localStorage.getItem("lecturerId")),a=await fetch("http://huuphuoc.id.vn/api/laykhoahocdanglam",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:e.giangvien})});if(!a.ok)throw Error("Failed to fetch courses");return a.json()},n=async()=>{let e=JSON.parse(localStorage.getItem("lecturerId")),a=await fetch("http://huuphuoc.id.vn/api/TongSoDangKy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:e.giangvien})});if(!a.ok)throw Error("Failed to fetch courses");return a.json()}},36559:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>t});let t=(0,s(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\xampp\\\\htdocs\\\\DuAnTotNghiep\\\\Hosting\\\\techstudent-datn - Copy\\\\aaaaaaaaaa\\\\LocduantotNghiep\\\\LocduantotNghiep\\\\src\\\\app\\\\component\\\\header\\\\page.jsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\component\\header\\page.jsx","default")},90675:(e,a,s)=>{"use strict";s.d(a,{Headerdashboardstudent2:()=>r});var t=s(46760);(0,t.registerClientReference)(function(){throw Error("Attempted to call Headerdashboardstudent1() from the server but Headerdashboardstudent1 is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\page\\lecturer-dashboard\\headerdashboardlecturer.jsx","Headerdashboardstudent1");let r=(0,t.registerClientReference)(function(){throw Error("Attempted to call Headerdashboardstudent2() from the server but Headerdashboardstudent2 is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\page\\lecturer-dashboard\\headerdashboardlecturer.jsx","Headerdashboardstudent2")},44462:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>i});var t=s(62740);s(76301);var r=s(36559),n=s(90675);function i({children:e}){return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(r.default,{}),(0,t.jsx)("div",{className:"mt-32 dashboard-banner-area-wrapper",children:(0,t.jsx)("div",{className:"container",children:(0,t.jsx)("div",{className:"row"})})}),(0,t.jsx)("div",{className:"dashboard--area-main pt--100",children:(0,t.jsx)("div",{className:"container",children:(0,t.jsxs)("div",{className:"row g-5",children:[(0,t.jsx)(n.Headerdashboardstudent2,{page:"home"}),e]})})})]})}}};