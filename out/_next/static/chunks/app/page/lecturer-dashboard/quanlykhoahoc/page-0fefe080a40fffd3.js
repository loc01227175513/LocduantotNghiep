(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8370],{7817:(e,a,s)=>{Promise.resolve().then(s.bind(s,80250))},76046:(e,a,s)=>{"use strict";var t=s(66658);s.o(t,"useRouter")&&s.d(a,{useRouter:function(){return t.useRouter}})},80250:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>l});var t=s(95155),r=s(12115);s(33876);let i=async(e,a)=>{let s=JSON.parse(localStorage.getItem("lecturerId")),t=await fetch("http://huuphuoc.id.vn/api/taokhoahoc",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:s.giangvien,ten:e,id_chude:a})});if(!t.ok)throw Error("Failed to fetch courses");return t.json()};var n=s(25363);s(19938);var o=s(67396);s(76046);var c=s(5565);function l(){let[e,a]=(0,r.useState)(!1),[s,l]=(0,r.useState)([]),[h,d]=(0,r.useState)([]),[u,p]=(0,r.useState)(!1),[m,g]=(0,r.useState)(""),[v,j]=(0,r.useState)([]),[x,f]=(0,r.useState)([]),[N,y]=(0,r.useState)(""),[b,w]=(0,r.useState)(""),[S,k]=(0,r.useState)(""),[C,O]=(0,r.useState)("");(0,r.useEffect)(()=>{(async()=>{try{let e=await i("tieude","chude");d(e),p(!0)}catch(e){console.error("Error fetching data:",e)}})()},[]),(0,r.useEffect)(()=>{(async()=>{try{let e=await (0,n.OG)();j(e.data),p(!0)}catch(e){console.error("Error fetching data:",e)}})()},[]),console.log(v),(0,r.useEffect)(()=>{fetch("http://huuphuoc.id.vn/api/theloai").then(e=>e.json()).then(e=>{l(e.data)})},[]),(0,r.useEffect)(()=>{m?f(s.filter(e=>e.theloaicons.some(e=>e.id===parseInt(m)))):f(s)},[m,s]);let E=()=>{a(!0)},T=()=>{a(!1)},_=async e=>{e.preventDefault();try{let e=await i(N,b);d(e),window.location.reload()}catch(e){console.error("Error adding course:",e)}},I=v.filter(e=>(!S||e.trangthai===S)&&(!C||!!e.ten.toLowerCase().includes(C.toLowerCase())));return(0,t.jsx)("div",{className:"overflow-y-scroll col-lg-9 h-lvh",children:(0,t.jsx)("div",{className:"right-sidebar-dashboard",children:(0,t.jsx)("div",{className:"row ",children:(0,t.jsxs)("div",{className:"col-lg-12",children:[!e&&(0,t.jsx)("div",{className:"hover:cursor-pointer",children:(0,t.jsxs)("div",{className:"addkhoahoc",onClick:()=>E(),children:[(0,t.jsx)("i",{className:"bi bi-plus-square"}),"Th\xeam kh\xf3a học"]})}),e&&(0,t.jsx)("div",{className:"hover:cursor-pointer",children:(0,t.jsx)("div",{className:"addkhoahoc",onClick:()=>T(),children:"hủy"})}),e&&(0,t.jsx)("div",{className:"div-add-khoahoc",children:(0,t.jsxs)("div",{className:"",children:[(0,t.jsx)("div",{className:"p-4 border",children:(0,t.jsx)("p",{children:"Th\xeam kh\xf3a học"})}),(0,t.jsxs)("form",{onSubmit:_,children:[(0,t.jsxs)("div",{className:"p-4 border",children:[(0,t.jsx)("p",{children:"T\xean kh\xf3a học"}),(0,t.jsx)("input",{type:"text",value:N,onChange:e=>y(e.target.value),placeholder:"Nhập t\xean kh\xf3a học",className:"w-full p-2 border"})]}),(0,t.jsxs)("div",{className:"p-4 border",children:[(0,t.jsx)("p",{children:"Chọn thể loại"}),(0,t.jsxs)("div",{className:"flex justify-between",children:[(0,t.jsxs)("section",{children:[(0,t.jsx)("label",{children:"thể loại"}),(0,t.jsxs)("select",{id:"category-select",onChange:e=>g(e.target.value),children:[(0,t.jsx)("option",{value:"",children:"Chọn thể loại"}),s&&s.map(e=>e.theloaicons.map(e=>(0,t.jsx)("option",{value:e.id,children:e.ten},e.id)))]})]}),(0,t.jsxs)("section",{children:[(0,t.jsx)("label",{children:"chủ đề"}),(0,t.jsxs)("select",{id:"course-select",onChange:e=>w(e.target.value),children:[(0,t.jsx)("option",{value:"",children:"chọn chủ đề"}),x&&x.map(e=>e.theloaicons.map(e=>e.chudes.map(e=>(0,t.jsx)("option",{value:e.id,children:e.ten},e.id))))]})]})]})]}),(0,t.jsx)("div",{className:"flex m-2",children:(0,t.jsx)("button",{type:"submit",children:"X\xe1c Nhận"})})]})]})}),(0,t.jsxs)("div",{className:"flex justify-between mt-4",children:[(0,t.jsx)("section",{children:(0,t.jsxs)("select",{id:"course-select",onChange:e=>k(e.target.value),children:[(0,t.jsx)("option",{value:"",children:"Tất cả kh\xf3a học"}),(0,t.jsx)("option",{value:"active",children:"Đang ph\xe1t h\xe0nh"}),(0,t.jsx)("option",{value:"Notyet",children:"Bản Nh\xe1p"}),(0,t.jsx)("option",{value:"Pending",children:"Đ\xe3 ho\xe0n th\xe0nh"})]})}),(0,t.jsx)("form",{children:(0,t.jsx)("input",{type:"text",placeholder:"t\xecm kiếm kh\xf3a học",className:"mb-4 border w-96",value:C,onChange:e=>O(e.target.value)})})]}),I&&I.map(e=>{let a=Number(e.gia||0),s=Number(e.giamgia||0),r=Number(e.hinh||0),i=3;0===a&&(i-=1),0===s&&(i-=1),0===r&&(i-=1);let n=100/3*i,l=0;return i>0&&(l=n),(0,t.jsx)(o.default,{href:"/page/course-create?id=".concat(e.id),children:(0,t.jsxs)("div",{className:"single-progress-course",children:[(0,t.jsx)("a",{href:"single-course.html",children:(0,t.jsx)(c.default,{width:100,height:100,className:"rounded-lg hover:border-red-600 border-2 hover:opacity-75 transition-opacity duration-300",src:e.hinh,alt:"img"})}),(0,t.jsxs)("div",{className:"information-progress-course",children:[(0,t.jsx)("a",{href:"single-course.html",children:(0,t.jsx)("h5",{className:"title",children:e.ten})}),(0,t.jsxs)("div",{children:[(0,t.jsx)("i",{className:"bi bi-pencil-square"}),(0,t.jsx)("i",{className:"bi bi-trash3"})]}),(0,t.jsxs)("div",{className:"progress-wrapper-lesson-compleate",children:[(0,t.jsx)("div",{className:"progress",children:(0,t.jsx)("div",{className:"progress-bar wow fadeInLeft bg--primary",role:"progressbar",style:{width:"".concat(l,"%")},"aria-valuenow":l,"aria-valuemin":0,"aria-valuemax":100})}),(0,t.jsx)("div",{className:"end",children:(0,t.jsxs)("span",{children:[l,"% Complete"]})})]})]})]})},e.id)})]})})})})}},25363:(e,a,s)=>{"use strict";s.d(a,{OG:()=>r,eM:()=>i,xh:()=>t});let t=async()=>{let e=JSON.parse(localStorage.getItem("data")),a=await fetch("http://huuphuoc.id.vn/api/kiemtragiangvien",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!a.ok)throw Error("Failed to fetch courses");return a.json()},r=async()=>{let e=JSON.parse(localStorage.getItem("lecturerId")),a=await fetch("http://huuphuoc.id.vn/api/laykhoahocdanglam",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:e.giangvien})});if(!a.ok)throw Error("Failed to fetch courses");return a.json()},i=async()=>{let e=JSON.parse(localStorage.getItem("lecturerId")),a=await fetch("http://huuphuoc.id.vn/api/TongSoDangKy",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:e.giangvien})});if(!a.ok)throw Error("Failed to fetch courses");return a.json()}},33876:()=>{}},e=>{var a=a=>e(e.s=a);e.O(0,[2413,7970,3264,9938,8441,1517,7358],()=>a(7817)),_N_E=e.O()}]);