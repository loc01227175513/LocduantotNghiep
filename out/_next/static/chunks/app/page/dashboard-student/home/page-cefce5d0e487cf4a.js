(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4081],{68195:(a,s,e)=>{Promise.resolve().then(e.bind(e,21584))},21584:(a,s,e)=>{"use strict";e.r(s),e.d(s,{default:()=>r});var c=e(95155),l=e(12115),i=e(98849);function r(){let[a,s]=(0,l.useState)([]),[e,r]=(0,l.useState)([]);return(0,l.useEffect)(()=>{(0,i.xh)().then(a=>{s(a.data)}).catch(a=>{console.error("Error fetching dashboard data:",a)}),(0,i.Xm)().then(a=>{r(a.data)}).catch(a=>{console.error("Error fetching dashboard data:",a)})},[]),console.log(a.length),console.log(e.length),(0,c.jsx)("div",{className:"overflow-y-scroll col-lg-9 h-lvh",children:(0,c.jsxs)("div",{className:"right-sidebar-dashboard",children:[(0,c.jsxs)("div",{className:"row g-5",children:[(0,c.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-6 col-12",children:(0,c.jsxs)("div",{className:"single-dashboard-card",children:[(0,c.jsx)("div",{className:"icon",children:(0,c.jsx)("i",{className:"fa-light fa-book-open-cover"})}),(0,c.jsx)("h5",{className:"title",children:(0,c.jsx)("span",{className:"counter",children:a.length})}),(0,c.jsx)("p",{children:"C\xe1c kh\xf3a học ghi danh"})]})}),(0,c.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-6 col-12",children:(0,c.jsxs)("div",{className:"single-dashboard-card",children:[(0,c.jsx)("div",{className:"icon",children:(0,c.jsx)("i",{className:"fa-regular fa-graduation-cap"})}),(0,c.jsx)("h5",{className:"title",children:(0,c.jsx)("span",{className:"counter",children:a.reduce((a,s)=>a+s.khoahocs.filter(a=>"active"===a.trangthai).length,0)})}),(0,c.jsx)("p",{children:"C\xe1c kh\xf3a học t\xedch cực"})]})}),(0,c.jsx)("div",{className:"col-lg-4 col-md-6 col-sm-6 col-12",children:(0,c.jsxs)("div",{className:"single-dashboard-card",children:[(0,c.jsx)("div",{className:"icon",children:(0,c.jsx)("i",{className:"fa-light fa-trophy"})}),(0,c.jsx)("h5",{className:"title",children:(0,c.jsx)("span",{className:"counter",children:e.length})}),(0,c.jsx)("p",{children:"Ho\xe0n th\xe0nh c\xe1c kh\xf3a học"})]})})]}),(0,c.jsx)("div",{className:"row mt--40",children:(0,c.jsxs)("div",{className:"col-lg-12",children:[(0,c.jsxs)("div",{className:"in-progress-course-wrapper title-between-dashboard mb--10",children:[(0,c.jsx)("h5",{className:"title",children:"C\xe1c kh\xf3a học của t\xf4i"}),(0,c.jsx)("a",{href:"#",className:"more",children:"Xem tất cả"})]}),(0,c.jsxs)("div",{className:"my-course-enroll-wrapper-board",children:[(0,c.jsxs)("div",{className:"single-course-inroll-board head",children:[(0,c.jsx)("div",{className:"name",children:(0,c.jsx)("p",{children:" Kh\xf3a học của t\xf4i"})}),(0,c.jsx)("div",{className:"enroll",children:(0,c.jsx)("p",{children:" Đăng k\xfd "})}),(0,c.jsx)("div",{className:"rating",children:(0,c.jsx)("p",{children:" Xếp hạng "})})]}),a.map((a,s)=>a.khoahocs.map((a,e)=>(0,c.jsxs)("div",{className:"single-course-inroll-board",children:[(0,c.jsx)("div",{className:"name",children:(0,c.jsx)("p",{children:a.ten})}),(0,c.jsx)("div",{className:"enroll",children:(0,c.jsx)("p",{children:"2"})}),(0,c.jsxs)("div",{className:"rating",children:[(0,c.jsx)("i",{className:"fa-light fa-star"}),(0,c.jsx)("i",{className:"fa-light fa-star"}),(0,c.jsx)("i",{className:"fa-light fa-star"}),(0,c.jsx)("i",{className:"fa-light fa-star"}),(0,c.jsx)("i",{className:"fa-light fa-star"})]})]},"".concat(s,"-").concat(e))))]})]})})]})})}},98849:(a,s,e)=>{"use strict";e.d(s,{Xm:()=>l,Yi:()=>r,xh:()=>c,yz:()=>i});let c=async()=>{let a=JSON.parse(localStorage.getItem("data")),s=await fetch("http://huuphuoc.id.vn/api/khoahocdadangky",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:a.id})});if(!s.ok)throw Error("Failed to fetch courses");return s.json()},l=async()=>{let a=JSON.parse(localStorage.getItem("data")),s=await fetch("http://huuphuoc.id.vn/api/KhoaHocDaHoc",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:a.id})});if(!s.ok)throw Error("Failed to fetch courses");return s.json()},i=async()=>{let a=JSON.parse(localStorage.getItem("data")),s=await fetch("http://huuphuoc.id.vn/api/khoahocdanghoc",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:a.id})});if(!s.ok)throw Error("Failed to fetch courses");return s.json()},r=async()=>{let a=JSON.parse(localStorage.getItem("data")),s=await fetch("http://huuphuoc.id.vn/api/KhoaHocDaHoc ",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:a.id})});if(!s.ok)throw Error("Failed to fetch courses");return s.json()}}},a=>{var s=s=>a(a.s=s);a.O(0,[8441,1517,7358],()=>s(68195)),_N_E=a.O()}]);