(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9095],{13676:(e,t,n)=>{Promise.resolve().then(n.bind(n,112))},112:(e,t,n)=>{"use strict";n.r(t),n.d(t,{default:()=>l});var r=n(95155),i=n(12115),a=n(91068);n(85716);var o=n(69419);let s=e=>{let{onClose:t,csrfToken:n,giangVien:o,nguoiDung:s,refreshData:l}=e,[d,c]=(0,i.useState)("giangvien"),[h,u]=(0,i.useState)({noidung:"",id_nguoidung:""}),g=e=>{let{name:t,value:n}=e.target;u(e=>({...e,[t]:n}))},p=()=>!!h.noidung&&!!h.id_nguoidung||(a.oR.error("Vui l\xf2ng điền đầy đủ th\xf4ng tin."),!1),m=async e=>{var r;if(e.preventDefault(),!p())return;let i=(null===(r=o[0])||void 0===r?void 0:r.id)||"",s=parseInt(h.id_nguoidung,10),d={noidung:[{sender_id:i,receiver_id:s,content:h.noidung,timestamp:new Date().toISOString(),sender_type:"giangvien"}],id_nguoidung:s,id_giangvien:i};try{(await fetch("http://huuphuoc.id.vn/api/addNhanTin",{method:"POST",headers:{"Content-Type":"application/json","X-CSRF-TOKEN":n},body:JSON.stringify(d)})).ok?(a.oR.success("Th\xeam tin nhắn th\xe0nh c\xf4ng từ Giảng vi\xean!"),t(),l()):a.oR.error("Th\xeam tin nhắn thất bại!")}catch(e){console.error("Lỗi khi th\xeam dữ liệu:",e),a.oR.error("Th\xeam tin nhắn thất bại!")}};return(0,r.jsx)("div",{className:"fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50",children:(0,r.jsx)("div",{className:"relative p-4 w-full max-w-2xl max-h-full overflow-y-auto",children:(0,r.jsxs)("div",{className:"relative bg-gray-900 rounded-lg shadow",children:[(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)("h2",{className:"text-white text-xl mb-4",children:"Th\xeam Tin Nhắn"}),(0,r.jsx)("div",{className:"flex space-x-4 mb-4",children:(0,r.jsx)("button",{className:"px-4 py-2 rounded-lg ".concat("giangvien"===d?"bg-green-700":"bg-green-500"," text-white"),onClick:()=>c("giangvien"),children:"Giảng vi\xean"})})]}),"giangvien"===d&&(0,r.jsxs)("form",{onSubmit:m,children:[(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)("label",{className:"block text-white",children:"Người d\xf9ng:"}),(0,r.jsxs)("select",{name:"id_nguoidung",value:h.id_nguoidung,onChange:g,className:"mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700",required:!0,children:[(0,r.jsx)("option",{value:"",children:"Chọn người d\xf9ng"}),s.map(e=>(0,r.jsx)("option",{value:e.id,children:e.ten},e.id))]})]}),(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)("label",{className:"block text-white",children:"Nội dung:"}),(0,r.jsx)("textarea",{name:"noidung",value:h.noidung,onChange:g,className:"mt-1 block w-full border border-gray-300 rounded-md p-2 text-white bg-gray-700",required:!0})]}),(0,r.jsxs)("div",{className:"p-4 flex justify-end space-x-2",children:[(0,r.jsx)("button",{type:"button",onClick:t,className:"bg-gray-700 text-white px-4 py-2 rounded-lg",children:"Hủy"}),(0,r.jsx)("button",{type:"submit",className:"bg-green-700 text-white px-4 py-2 rounded-lg",children:"Th\xeam từ Giảng vi\xean"})]})]})]})})})},l=()=>{let[e,t]=(0,i.useState)(""),[n,l]=(0,i.useState)([]),[d,c]=(0,i.useState)([]),[h,u]=(0,i.useState)([]),[g,p]=(0,i.useState)(!1),m=()=>{(0,o.Zr)().then(e=>{u(e)}).catch(e=>{console.error("Error:",e),a.oR.error("Lỗi khi lấy dữ liệu!")})};return(0,i.useEffect)(()=>{var e;let n=null===(e=document.querySelector('meta[name="csrf-token"]'))||void 0===e?void 0:e.getAttribute("content");n&&t(n)},[]),(0,i.useEffect)(()=>{m()},[]),(0,i.useEffect)(()=>{(0,o.dc)().then(e=>{l(e)}).catch(e=>{console.error("Error:",e),a.oR.error("Lỗi khi lấy dữ liệu!")})},[]),(0,i.useEffect)(()=>{(0,o.zS)().then(e=>{c(e||[])}).catch(e=>{console.error("Error:",e),a.oR.error("Lỗi khi lấy dữ liệu!")})},[]),(0,r.jsx)(r.Fragment,{children:(0,r.jsx)("div",{className:"overflow-y-scroll col-lg-9 h-lvh",children:(0,r.jsxs)("div",{className:"right-sidebar-dashboard",children:[(0,r.jsxs)("section",{className:"p-4 max-w-6xl mx-auto flex justify-between items-center",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("h1",{className:"text-2xl font-semibold text-white",children:"Quản l\xfd Tin Nhắn"}),(0,r.jsx)("p",{className:"text-gray-400",children:"Danh s\xe1ch tin nhắn"})]}),(0,r.jsx)("button",{className:"bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600",onClick:()=>p(!0),children:"Th\xeam Tin Nhắn"})]}),(0,r.jsx)("section",{className:"p-4 max-w-6xl mx-auto space-y-4",children:h.map(e=>{var t,i,a,o;let s=[];try{s=JSON.parse(e.noidung)}catch(e){console.error("Error parsing messages:",e)}return(null===(t=d.find(t=>t.id===e.id_nguoidung))||void 0===t?void 0:t.ten)||null===(i=n.find(t=>t.id===e.id_giangvien))||void 0===i||i.ten,(null===(a=n.find(t=>t.id===e.id_giangvien))||void 0===a?void 0:a.ten)||null===(o=d.find(t=>t.id===e.id_nguoidung))||void 0===o||o.ten,(0,r.jsxs)("div",{className:"bg-gray-800 p-6 rounded-lg flex flex-col",children:[(0,r.jsxs)("p",{className:"text-lg font-semibold text-white",children:["M\xe3 Tin Nhắn: ",e.id]}),(0,r.jsx)("div",{className:"flex flex-col space-y-2 mt-2",children:s.map((e,t)=>{var i,a;let o="nguoidung"===e.sender_type,s="giangvien"===e.sender_type,l="Kh\xf4ng x\xe1c định";return o?l=(null===(i=d.find(t=>t.id===e.sender_id))||void 0===i?void 0:i.ten)||"Người d\xf9ng kh\xf4ng x\xe1c định":s&&(l=(null===(a=n.find(t=>t.id===e.sender_id))||void 0===a?void 0:a.ten)||"Giảng vi\xean kh\xf4ng x\xe1c định"),(0,r.jsxs)("div",{className:"p-2 rounded max-w-md ".concat(o?"bg-blue-600 self-start":s?"bg-green-600 self-end":"bg-gray-600"),children:[(0,r.jsx)("p",{className:"text-gray-200 font-bold",children:l}),(0,r.jsx)("p",{className:"text-gray-300",children:e.content}),(0,r.jsx)("p",{className:"text-gray-400 text-sm",children:e.timestamp})]},t)})})]},e.id)})}),g&&(0,r.jsx)(s,{onClose:()=>p(!1),csrfToken:e,giangVien:n,nguoiDung:d,refreshData:m}),(0,r.jsx)(a.N9,{})]})})})}},69419:(e,t,n)=>{"use strict";n.d(t,{LZ:()=>a,P6:()=>i,Zr:()=>s,dc:()=>d,sS:()=>o,zS:()=>l});var r=n(2818);let i=async()=>{let e;let t=localStorage.getItem("data");if(!t)throw Error("No user data found");try{e=JSON.parse(t)}catch(e){throw Error("Invalid user data")}let n=await fetch("http://huuphuoc.id.vn/api/showAllNhanTin",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!n.ok)throw Error("Failed to fetch messages");return n.json()},a=async()=>{let e;let t=localStorage.getItem("data");if(!t)throw Error("No user data found");try{e=JSON.parse(t)}catch(e){throw Error("Invalid user data")}let n=await fetch("http://huuphuoc.id.vn/api/laynguoidung",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!n.ok)throw Error("Failed to fetch messages");return n.json()},o=async()=>{let e=await fetch("http://huuphuoc.id.vn/api/giangvien",{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw Error("Failed to fetch lecturers");return e.json()},s=async()=>{let e=JSON.parse(localStorage.getItem("lecturerId")),t=r.env.REACT_APP_API_URL||"http://huuphuoc.id.vn/api/showAllNhanTinGiangVien";try{let n=await fetch(t,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:e.giangvien})});if(!n.ok)throw Error("Failed to fetch messages");return n.json()}catch(e){throw Error("Network error")}},l=async()=>{try{let e=await fetch("http://huuphuoc.id.vn/api/showAllNguoiDung",{method:"GET",headers:{"Content-Type":"application/json"}});if(!e.ok)throw Error("Failed to fetch users");return e.json()}catch(e){throw Error("Network error")}},d=async()=>{let e;let t=localStorage.getItem("lecturerId");if(!t)throw Error("No lecturer ID found in localStorage");try{e=JSON.parse(t)}catch(e){throw Error("Failed to parse lecturer data")}let n=await fetch("http://huuphuoc.id.vn/api/giangVienHientai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_giangvien:e.giangvien})});if(!n.ok)throw Error("Failed to fetch current lecturer data");return n.json()}},85716:()=>{},43463:(e,t,n)=>{"use strict";n.d(t,{A:()=>r});let r=function(){for(var e,t,n=0,r="",i=arguments.length;n<i;n++)(e=arguments[n])&&(t=function e(t){var n,r,i="";if("string"==typeof t||"number"==typeof t)i+=t;else if("object"==typeof t){if(Array.isArray(t)){var a=t.length;for(n=0;n<a;n++)t[n]&&(r=e(t[n]))&&(i&&(i+=" "),i+=r)}else for(r in t)t[r]&&(i&&(i+=" "),i+=r)}return i}(e))&&(r&&(r+=" "),r+=t);return r}}},e=>{var t=t=>e(e.s=t);e.O(0,[4797,1068,8441,1517,7358],()=>t(13676)),_N_E=e.O()}]);