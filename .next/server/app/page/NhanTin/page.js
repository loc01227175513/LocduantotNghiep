(()=>{var e={};e.id=7583,e.ids=[7583],e.modules={10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},12412:e=>{"use strict";e.exports=require("assert")},94735:e=>{"use strict";e.exports=require("events")},29021:e=>{"use strict";e.exports=require("fs")},81630:e=>{"use strict";e.exports=require("http")},55591:e=>{"use strict";e.exports=require("https")},21820:e=>{"use strict";e.exports=require("os")},33873:e=>{"use strict";e.exports=require("path")},27910:e=>{"use strict";e.exports=require("stream")},83997:e=>{"use strict";e.exports=require("tty")},79551:e=>{"use strict";e.exports=require("url")},28354:e=>{"use strict";e.exports=require("util")},74075:e=>{"use strict";e.exports=require("zlib")},55195:(e,t,n)=>{"use strict";n.r(t),n.d(t,{GlobalError:()=>o.a,__next_app__:()=>u,pages:()=>c,routeModule:()=>h,tree:()=>l});var r=n(70260),a=n(28203),i=n(25155),o=n.n(i),s=n(67292),d={};for(let e in s)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(d[e]=()=>s[e]);n.d(t,d);let l=["",{children:["page",{children:["NhanTin",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(n.bind(n,58354)),"C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\page\\NhanTin\\page.jsx"]}]},{}]},{}]},{layout:[()=>Promise.resolve().then(n.bind(n,62804)),"C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\layout.js"],"not-found":[()=>Promise.resolve().then(n.t.bind(n,19937,23)),"next/dist/client/components/not-found-error"]}],c=["C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\page\\NhanTin\\page.jsx"],u={require:n,loadChunk:()=>Promise.resolve()},h=new r.AppPageRouteModule({definition:{kind:a.RouteKind.APP_PAGE,page:"/page/NhanTin/page",pathname:"/page/NhanTin",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:l}})},10678:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,71066,23)),Promise.resolve().then(n.bind(n,36559)),Promise.resolve().then(n.bind(n,82847))},34238:(e,t,n)=>{Promise.resolve().then(n.t.bind(n,41902,23)),Promise.resolve().then(n.bind(n,81492)),Promise.resolve().then(n.bind(n,71851))},71851:(e,t,n)=>{"use strict";n.d(t,{default:()=>d});var r=n(45512),a=n(58009),i=n(44750);n(25806);var o=n(51289);let s=({onClose:e,csrfToken:t,giangVien:n,nguoiDung:o,refreshData:s})=>{let[d,l]=(0,a.useState)("nguoidung"),[c,u]=(0,a.useState)({noidung:"",id_giangvien:""}),[h,p]=(0,a.useState)({noidung:"",id_nguoidung:""}),g=e=>{let{name:t,value:n}=e.target;u(e=>({...e,[t]:n}))},x=()=>!!c.noidung&&!!c.id_giangvien||(i.oR.error("Vui l\xf2ng điền đầy đủ th\xf4ng tin."),!1),m=async n=>{if(n.preventDefault(),!x())return;let r=parseInt(c.id_giangvien,10),a=o?.id,d={noidung:[{sender_id:a,receiver_id:r,content:c.noidung,timestamp:new Date().toISOString(),sender_type:"nguoidung"}],id_nguoidung:a,id_giangvien:r};try{(await fetch("http://huuphuoc.id.vn/api/addNhanTin",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":t},body:JSON.stringify(d)})).ok?(i.oR.success("Th\xeam tin nhắn th\xe0nh c\xf4ng từ Người d\xf9ng!"),e(),s()):i.oR.error("Th\xeam tin nhắn thất bại!")}catch(e){console.error("Lỗi khi th\xeam dữ liệu:",e),i.oR.error("Th\xeam tin nhắn thất bại!")}};return(0,r.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",children:(0,r.jsx)("div",{className:"relative p-4 w-full max-w-2xl max-h-full overflow-y-auto",children:(0,r.jsxs)("div",{className:"relative bg-gray-900 rounded-lg shadow",children:[(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)("h2",{className:"text-white text-xl mb-4",children:"Th\xeam Tin Nhắn"}),(0,r.jsx)("div",{className:"flex space-x-4 mb-4",children:(0,r.jsx)("button",{className:`px-4 py-2 rounded-lg ${"nguoidung"===d?"bg-blue-700":"bg-blue-500"} text-white`,onClick:()=>l("nguoidung"),children:"Người d\xf9ng"})})]}),"nguoidung"===d&&(0,r.jsxs)("form",{onSubmit:m,children:[(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)("label",{className:"block text-white",children:"Giảng vi\xean:"}),(0,r.jsxs)("select",{name:"id_giangvien",value:c.id_giangvien,onChange:g,className:"mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700",required:!0,children:[(0,r.jsx)("option",{value:"",children:"Chọn giảng vi\xean"}),n.map(e=>(0,r.jsx)("option",{value:e.id,children:e.ten},e.id))]})]}),(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)("label",{className:"block text-white",children:"Nội dung:"}),(0,r.jsx)("textarea",{name:"noidung",value:c.noidung,onChange:g,className:"mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700",required:!0})]}),(0,r.jsxs)("div",{className:"p-4 flex justify-end space-x-2",children:[(0,r.jsx)("button",{type:"button",onClick:e,className:"bg-gray-700 text-white px-4 py-2 rounded-lg",children:"Hủy"}),(0,r.jsx)("button",{type:"submit",className:"bg-green-700 text-white px-4 py-2 rounded-lg",children:"Th\xeam từ Người d\xf9ng"})]})]})]})})})},d=()=>{let[e,t]=(0,a.useState)(""),[n,d]=(0,a.useState)([]),[l,c]=(0,a.useState)(null),[u,h]=(0,a.useState)([]),[p,g]=(0,a.useState)(!1),x=()=>{(0,o.P6)().then(e=>{h(e)}).catch(e=>{console.error("Error:",e),i.oR.error("Lỗi khi lấy dữ liệu!")})};return(0,a.useEffect)(()=>{let e=document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");e&&t(e)},[]),(0,a.useEffect)(()=>{x()},[]),(0,a.useEffect)(()=>{(0,o.sS)().then(e=>{d(e)}).catch(e=>{console.error("Error:",e),i.oR.error("Lỗi khi lấy dữ liệu!")})},[]),(0,a.useEffect)(()=>{(0,o.LZ)().then(e=>{c(e.data)}).catch(e=>{console.error("Error:",e),i.oR.error("Lỗi khi lấy dữ liệu!")})},[]),(0,r.jsxs)(r.Fragment,{children:[" ",(0,r.jsxs)("div",{className:"container",children:[(0,r.jsxs)("section",{className:"p-4 max-w-6xl mx-auto flex justify-between items-center",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{className:"text-2xl font-semibold text-white",children:"Quản l\xfd Tin Nhắn"}),(0,r.jsx)("p",{className:"text-gray-400",children:"Danh s\xe1ch tin nhắn"})]}),(0,r.jsx)("button",{className:"bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600",onClick:()=>g(!0),children:"Th\xeam Tin Nhắn"})]}),(0,r.jsx)("section",{className:"p-4 max-w-6xl mx-auto space-y-4",children:u.map(e=>{let t=JSON.parse(e.noidung);return l?.ten||n.find(t=>t.id===e.giangvienId)?.ten,n.find(t=>t.id===e.giangvienId)?.ten||l?.ten,(0,r.jsxs)("div",{className:"bg-gray-800 p-6 rounded-lg flex flex-col",children:[(0,r.jsxs)("p",{className:"text-lg font-semibold text-white",children:["M\xe3 Tin Nhắn: ",e.id]}),(0,r.jsx)("div",{className:"flex flex-col space-y-2 mt-2",children:t.map((e,t)=>{let a="nguoidung"===e.sender_type,i="giangvien"===e.sender_type,o="Kh\xf4ng x\xe1c định";if("nguoidung"===e.sender_type)o=l?.ten||"Người d\xf9ng kh\xf4ng x\xe1c định";else if("giangvien"===e.sender_type){let t=n.find(t=>t.id===e.sender_id);o=t?.ten||"Giảng vi\xean kh\xf4ng x\xe1c định"}return(0,r.jsxs)("div",{className:`p-2 rounded max-w-md ${a?"bg-blue-600 self-start":i?"bg-green-600 self-end":"bg-gray-600"}`,children:[(0,r.jsx)("p",{className:"text-gray-200 font-bold",children:o}),(0,r.jsx)("p",{className:"text-gray-300",children:e.content}),(0,r.jsx)("p",{className:"text-gray-400 text-sm",children:e.timestamp})]},t)})})]},e.id)})}),p&&(0,r.jsx)(s,{onClose:()=>g(!1),csrfToken:e,giangVien:n,nguoiDung:l,refreshData:x}),(0,r.jsx)(i.N9,{})]})]})}},51289:(e,t,n)=>{"use strict";n.d(t,{LZ:()=>a,P6:()=>r,Zr:()=>o,dc:()=>d,sS:()=>i,zS:()=>s});let r=async()=>{let e;let t=localStorage.getItem("data");if(!t)throw Error("No user data found");try{e=JSON.parse(t)}catch(e){throw Error("Invalid user data")}let n=await fetch("http://huuphuoc.id.vn/api/showAllNhanTin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!n.ok)throw Error("Failed to fetch messages");return n.json()},a=async()=>{let e;let t=localStorage.getItem("data");if(!t)throw Error("No user data found");try{e=JSON.parse(t)}catch(e){throw Error("Invalid user data")}let n=await fetch("http://huuphuoc.id.vn/api/laynguoidung",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!n.ok)throw Error("Failed to fetch messages");return n.json()},i=async()=>{let e=await fetch("http://huuphuoc.id.vn/api/giangvien",{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw Error("Failed to fetch lecturers");return e.json()},o=async()=>{let e=JSON.parse(localStorage.getItem("lecturerId")),t=process.env.REACT_APP_API_URL||"http://huuphuoc.id.vn/api/showAllNhanTinGiangVien";try{let n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:e.giangvien})});if(!n.ok)throw Error("Failed to fetch messages");return n.json()}catch(e){throw Error("Network error")}},s=async()=>{try{let e=await fetch("http://huuphuoc.id.vn/api/showAllNguoiDung",{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw Error("Failed to fetch users");return e.json()}catch(e){throw Error("Network error")}},d=async()=>{let e;let t=localStorage.getItem("lecturerId");if(!t)throw Error("No lecturer ID found in localStorage");try{e=JSON.parse(t)}catch(e){throw Error("Failed to parse lecturer data")}let n=await fetch("http://huuphuoc.id.vn/api/giangVienHientai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:e.giangvien})});if(!n.ok)throw Error("Failed to fetch current lecturer data");return n.json()}},36559:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>r});let r=(0,n(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\xampp\\\\htdocs\\\\DuAnTotNghiep\\\\Hosting\\\\techstudent-datn - Copy\\\\aaaaaaaaaa\\\\LocduantotNghiep\\\\LocduantotNghiep\\\\src\\\\app\\\\component\\\\header\\\\page.jsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\component\\header\\page.jsx","default")},82847:(e,t,n)=>{"use strict";n.d(t,{default:()=>r});let r=(0,n(46760).registerClientReference)(function(){throw Error("Attempted to call the default export of \"C:\\\\xampp\\\\htdocs\\\\DuAnTotNghiep\\\\Hosting\\\\techstudent-datn - Copy\\\\aaaaaaaaaa\\\\LocduantotNghiep\\\\LocduantotNghiep\\\\src\\\\app\\\\page\\\\NhanTin\\\\NhanTin.jsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"C:\\xampp\\htdocs\\DuAnTotNghiep\\Hosting\\techstudent-datn - Copy\\aaaaaaaaaa\\LocduantotNghiep\\LocduantotNghiep\\src\\app\\page\\NhanTin\\NhanTin.jsx","default")},58354:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>s});var r=n(62740);n(76301);var a=n(36559),i=n(61961),o=n(82847);function s(){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a.default,{}),(0,r.jsx)("div",{className:" p-4 rounded-lg shadow m-60 border border-gray-300",children:(0,r.jsx)(o.default,{})}),(0,r.jsx)(i.default,{})]})}},25806:()=>{}};var t=require("../../../webpack-runtime.js");t.C(e);var n=e=>t(t.s=e),r=t.X(0,[1491,1902,9562,5668,2701,3260,5635,1782,1492,1961],()=>n(55195));module.exports=r})();