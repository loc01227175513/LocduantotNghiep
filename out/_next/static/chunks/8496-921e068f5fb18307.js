"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8496],{88496:(a,s,e)=>{e.r(s),e.d(s,{default:()=>f});var l=e(57437),c=e(2265),i=e(61538),r=e(96101),n=e(83093),t=e(65786),d=e(38847),h=e(54142),o=e(2842),m=e(9542),g=e(85475),x=e(20153),j=e(13971),N=e(87138),u=e(66648),p=e(20510);function f(){let[a,s]=(0,c.useState)([]),[e,i]=(0,c.useState)([]),[r,n]=(0,c.useState)([]),[t,d]=(0,c.useState)([]),[h,o]=(0,c.useState)(!1);(0,c.useEffect)(()=>{(async()=>{try{let a=await (0,p.A)();localStorage.setItem("lecturerId",JSON.stringify(a.data)),s(a.data);let e=await (0,p.ge)();i(e.data);let l=await (0,p.xJ)();d(l.data),o(!0)}catch(a){console.error("Error fetching data:",a)}})()},[]),(0,c.useEffect)(()=>{fetch("http://huuphuoc.id.vn/api/DoanhThuGiangVien",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:JSON.parse(localStorage.getItem("lecturerId")).giangvien})}).then(a=>a.json()).then(a=>{console.log(a),n(a.data)}).catch(a=>{console.error("Error:",a)})},[]),(0,c.useEffect)(()=>{h&&(console.log(a.giangvien),console.log("khoahoc",e),console.log(t),console.log(r,"doanhthu"))},[h,a,e,t,r]),console.log(r,"doanhthu");let m=e.length,g=e.filter(a=>"Progress"===a.trangthai).length,x=e.filter(a=>"Notyet"===a.trangthai).length,j=t.length,f=r.tongdoanhthu,b=r.sodukhadung,y=e.filter(a=>"active"===a.trangthai).length,w=e.reduce((a,s)=>a+s.ThanhToan.length,0);return(0,l.jsx)("div",{className:"overflow-y-scroll col-lg-9 h-lvh",children:(0,l.jsxs)("div",{className:"right-sidebar-dashboard",children:[(0,l.jsxs)("div",{className:"row g-5",children:[(0,l.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-6 col-12",children:(0,l.jsxs)("div",{className:"single-dashboard-card",children:[(0,l.jsx)("div",{className:"icon",children:(0,l.jsx)("i",{className:"fa-light fa-book-open-cover"})}),(0,l.jsx)("h5",{className:"title",children:(0,l.jsx)("span",{className:"counter",children:m})}),(0,l.jsx)("p",{children:"Kh\xf3a học đ\xe3 đăng k\xfd"})]})}),(0,l.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-6 col-12",children:(0,l.jsxs)("div",{className:"single-dashboard-card",children:[(0,l.jsx)("div",{className:"icon",children:(0,l.jsx)("i",{className:"fa-regular fa-graduation-cap"})}),(0,l.jsx)("h5",{className:"title",children:(0,l.jsx)("span",{className:"counter",children:j})}),(0,l.jsx)("p",{children:"Kh\xf3a học đang học"})]})}),(0,l.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-6 col-12",children:(0,l.jsxs)("div",{className:"single-dashboard-card",children:[(0,l.jsx)("div",{className:"icon",children:(0,l.jsx)("i",{className:"fa-light fa-trophy"})}),(0,l.jsx)("h5",{className:"title",children:(0,l.jsx)("span",{className:"counter",children:g})}),(0,l.jsx)("p",{children:"Kh\xf3a học đ\xe3 ho\xe0n th\xe0nh"})]})}),(0,l.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-6 col-12",children:(0,l.jsxs)("div",{className:"single-dashboard-card",children:[(0,l.jsx)("div",{className:"icon",children:(0,l.jsx)("i",{className:"fa-light fa-book"})}),(0,l.jsx)("h5",{className:"title",children:(0,l.jsx)("span",{className:"counter",children:m})}),(0,l.jsx)("p",{children:"Tổng kh\xf3a học của t\xf4i"})]})}),(0,l.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-6 col-12",children:(0,l.jsxs)("div",{className:"single-dashboard-card",children:[(0,l.jsx)("div",{className:"icon",children:(0,l.jsx)("i",{className:"fa-light fa-user"})}),(0,l.jsx)("h5",{className:"title",children:(0,l.jsx)("span",{className:"counter",children:w})}),(0,l.jsx)("p",{children:"Tổng số học sinh"})]})}),(0,l.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-6 col-12",children:(0,l.jsxs)("div",{className:"single-dashboard-card",children:[(0,l.jsx)("div",{className:"icon",children:(0,l.jsx)("i",{className:"fa-sharp fa-solid fa-dollar-sign"})}),(0,l.jsx)("h5",{className:"title",children:(0,l.jsx)("span",{className:"counter",children:null!=b?b:0})}),(0,l.jsx)("p",{children:"Số dư khả dụng"})]})}),(0,l.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-6 col-12",children:(0,l.jsxs)("div",{className:"single-dashboard-card",children:[(0,l.jsx)("div",{className:"icon",children:(0,l.jsx)("i",{className:"fa-light fa-user"})}),(0,l.jsx)("h5",{className:"title",children:(0,l.jsx)("span",{className:"counter",children:y})}),(0,l.jsx)("p",{children:"Tổng kh\xf3a học đang ph\xe1t h\xe0nh"})]})}),(0,l.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-6 col-12",children:(0,l.jsxs)("div",{className:"single-dashboard-card",children:[(0,l.jsx)("div",{className:"icon",children:(0,l.jsx)("i",{className:"fa-light fa-book"})}),(0,l.jsx)("h5",{className:"title",children:(0,l.jsx)("span",{className:"counter",children:x})}),(0,l.jsx)("p",{children:"Tổng kh\xf3a học tạm dừng"})]})}),(0,l.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-6 col-12",children:(0,l.jsxs)("div",{className:"single-dashboard-card",children:[(0,l.jsx)("div",{className:"icon",children:(0,l.jsx)("i",{className:"fa-sharp fa-solid fa-dollar-sign"})}),(0,l.jsx)("h5",{className:"title",children:(0,l.jsx)("span",{className:"counter",children:null!=f?f:0})}),(0,l.jsx)("p",{children:"Tổng thu nhập"})]})}),(0,l.jsx)(v,{})]}),(0,l.jsx)("div",{className:"row mt--40",children:(0,l.jsxs)("div",{className:"col-lg-12",children:[(0,l.jsx)("div",{className:"in-progress-course-wrapper",children:(0,l.jsx)("h5",{className:"title",children:"Trong c\xe1c kh\xf3a học tiến bộ"})}),e.map(a=>{let s=Number(a.gia||0),e=Number(a.giamgia||0),c=Number(a.hinh||0),i=3;0===s&&(i-=1),0===e&&(i-=1),0===c&&(i-=1);let r=100/3*i,n=0;return i>0&&(n=r),(0,l.jsx)(N.default,{href:"/page/course-create?id=".concat(a.id),children:(0,l.jsxs)("div",{className:"single-progress-course",children:[(0,l.jsx)("a",{href:"single-course.html",children:(0,l.jsx)(u.default,{width:100,height:100,className:"rounded-lg hover:border-red-600 border-2 hover:opacity-75 transition-opacity duration-300",src:a.hinh,alt:"img"})}),(0,l.jsxs)("div",{className:"information-progress-course",children:[(0,l.jsxs)("div",{className:"rating-area",children:[(0,l.jsx)("i",{className:"fa-light fa-star"}),(0,l.jsx)("i",{className:"fa-light fa-star"}),(0,l.jsx)("i",{className:"fa-light fa-star"}),(0,l.jsx)("i",{className:"fa-light fa-star"}),(0,l.jsx)("i",{className:"fa-light fa-star"}),(0,l.jsx)("span",{children:"(0)"})]}),(0,l.jsx)("a",{href:"single-course.html",children:(0,l.jsx)("h5",{className:"title",children:a.ten})}),(0,l.jsxs)("div",{className:"progress-wrapper-lesson-compleate",children:[(0,l.jsx)("div",{className:"progress",children:(0,l.jsx)("div",{className:"progress-bar wow fadeInLeft bg--primary",role:"progressbar",style:{width:"".concat(n,"%")},"aria-valuenow":n,"aria-valuemin":0,"aria-valuemax":100})}),(0,l.jsx)("div",{className:"end",children:(0,l.jsxs)("span",{children:[n,"% Ho\xe0n th\xe0nh"]})})]})]})]})},a.id)})]})}),(0,l.jsx)("div",{className:"container mt-5",children:(0,l.jsx)("div",{className:"row",children:(0,l.jsxs)("div",{className:"col-12",children:[(0,l.jsxs)("div",{className:"d-flex justify-content-between align-items-center mb-4",children:[(0,l.jsx)("h5",{className:"mb-0",children:"C\xe1c kh\xf3a học của t\xf4i"}),(0,l.jsx)("a",{href:"#",className:"btn btn-primary btn-sm",children:"Xem tất cả"})]}),(0,l.jsx)("div",{className:"row",children:e.map(a=>(0,l.jsx)("div",{className:"col-md-6 col-lg-4 mb-4",children:(0,l.jsx)("div",{className:"card h-100",children:(0,l.jsxs)("div",{className:"card-body",children:[(0,l.jsx)("h6",{className:"card-title",children:a.ten}),(0,l.jsx)("p",{className:"card-text",children:a.trangthai}),(0,l.jsx)("div",{className:"rating",children:(0,l.jsx)("p",{})})]})})},a.id))})]})})})]})})}let v=()=>{let[a,s]=(0,c.useState)(!0),[e,N]=(0,c.useState)(!0),[u,f]=(0,c.useState)([]);(0,c.useEffect)(()=>{(async()=>{try{let a=await (0,p.ge)();f(a.data)}catch(a){console.error("Error fetching data:",a)}})()},[]);let v=u.map(a=>({id:a.id,ten:a.ten,gia:Number(a.gia||0),giamgia:Number(a.giamgia||0),date:new Date(a.created_at).toLocaleDateString()}));return console.log(v),(0,l.jsxs)(i.Z,{sx:{width:"100%"},children:[(0,l.jsxs)(r.Z,{direction:"row",spacing:1,sx:{mb:2},children:[(0,l.jsx)(n.Z,{checked:a,control:(0,l.jsx)(t.Z,{onChange:a=>s(a.target.checked)}),label:"fix chart margin",labelPlacement:"end"}),(0,l.jsx)(n.Z,{checked:e,control:(0,l.jsx)(t.Z,{onChange:a=>N(a.target.checked)}),label:"fix axis label position",labelPlacement:"end"})]}),(0,l.jsxs)(d.v,{width:600,height:300,data:v,margin:{top:5,right:30,left:20,bottom:5},children:[(0,l.jsx)(h.q,{strokeDasharray:"3 3"}),(0,l.jsx)(o.K,{dataKey:"ten",tick:{fill:"#FFFFFF"}}),(0,l.jsx)(m.B,{tick:{fill:"#FFFFFF"}}),(0,l.jsx)(g.u,{}),(0,l.jsx)(x.D,{}),(0,l.jsx)(j.$,{dataKey:"gia",fill:"#8884d8"})]})]})}},20510:(a,s,e)=>{e.d(s,{A:()=>l,ge:()=>c,xJ:()=>i});let l=async()=>{let a=JSON.parse(localStorage.getItem("data")),s=await fetch("http://huuphuoc.id.vn/api/kiemtragiangvien",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:a.id})});if(!s.ok)throw Error("Failed to fetch courses");return s.json()},c=async()=>{let a=JSON.parse(localStorage.getItem("lecturerId")),s=await fetch("http://huuphuoc.id.vn/api/laykhoahocdanglam",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:a.giangvien})});if(!s.ok)throw Error("Failed to fetch courses");return s.json()},i=async()=>{let a=JSON.parse(localStorage.getItem("lecturerId")),s=await fetch("http://huuphuoc.id.vn/api/TongSoDangKy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:a.giangvien})});if(!s.ok)throw Error("Failed to fetch courses");return s.json()}}}]);