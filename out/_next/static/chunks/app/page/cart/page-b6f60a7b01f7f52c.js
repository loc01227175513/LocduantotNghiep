(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8211],{52996:(e,a,t)=>{Promise.resolve().then(t.bind(t,41190))},41190:(e,a,t)=>{"use strict";t.r(a),t.d(a,{default:()=>h});var r=t(57437),i=t(2265),s=t(38472),o=t(45497),n=t(83798),d=t(95956);t(53982);var c=t(66648);let l=e=>{let{handleApplyCoupon:a}=e,[t,s]=(0,i.useState)([]),[o,d]=(0,i.useState)(""),[c,l]=(0,i.useState)(null);(0,i.useEffect)(()=>{(async()=>{try{let e=await (0,n.bx)();s(e)}catch(e){console.error("Fetch error:",e),alert("Failed to fetch vouchers.")}})()},[]);let h=e=>{d(e.magiamgia.maso),l(e.id)};return console.log(t),(0,r.jsxs)("div",{className:"container my-4",children:[(0,r.jsxs)("form",{className:"mb-4",onSubmit:a,children:[(0,r.jsxs)("div",{className:"row g-2 align-items-center",children:[(0,r.jsx)("div",{className:"col-md-8",children:(0,r.jsx)("input",{type:"text",name:"coupon_code",className:"form-control",placeholder:"Nhập m\xe3 giảm gi\xe1",required:!0,value:o,onChange:e=>d(e.target.value)})}),(0,r.jsx)("div",{className:"col-md-4",children:(0,r.jsx)("button",{type:"submit",className:"btn btn-warning w-100",children:"\xc1p dụng"})})]}),(0,r.jsx)("small",{className:"form-text text-muted",children:"Mỗi kh\xf3a học chỉ \xe1p dụng được một m\xe3 giảm gi\xe1."})]}),(0,r.jsx)("div",{className:"voucher-list overflow-auto",style:{maxHeight:"400px"},children:t.map(e=>{let a=c===e.id,t="Đ\xe3 sử dụng"===e.trangthai,i=a?"btn-warning disabled":t?"btn-secondary":"btn-outline-warning";return(0,r.jsx)("div",{className:"card mb-3 ".concat(a?"border-warning":"border-secondary"," shadow-sm p-3 mb-5 bg-body-tertiary rounded"),children:(0,r.jsxs)("div",{className:"card-body",children:[(0,r.jsxs)("div",{className:"d-flex justify-content-between align-items-center mb-2",children:[(0,r.jsx)("h5",{className:"card-title",children:e.magiamgia.maso}),(0,r.jsx)("span",{className:"badge ".concat("Đ\xe3 Duyệt"===e.magiamgia.trangthai?"bg-success":"bg-secondary"),children:e.magiamgia.trangthai})]}),(0,r.jsxs)("p",{className:"card-text",children:[(0,r.jsx)("strong",{children:"Giảm gi\xe1:"})," ",e.magiamgia.giamgia,"%"]}),(0,r.jsxs)("p",{className:"card-text",children:[(0,r.jsx)("strong",{children:"Giới hạn sử dụng:"})," ",e.dasudunghientai]}),(0,r.jsxs)("p",{className:"card-text",children:[(0,r.jsx)("strong",{children:"Sử dụng hiện tại:"})," ",e.magiamgia.sudunghientai]}),(0,r.jsxs)("p",{className:"card-text",children:[(0,r.jsx)("strong",{children:"Ng\xe0y bắt đầu:"})," ",new Date(e.magiamgia.ngaybatdau).toLocaleDateString()]}),(0,r.jsxs)("p",{className:"card-text",children:[(0,r.jsx)("strong",{children:"Ng\xe0y hết hạn:"})," ",new Date(e.magiamgia.ngayketthuc).toLocaleDateString()]}),(0,r.jsx)("button",{className:"btn ".concat(i),onClick:()=>h(e),disabled:a||t,children:a?"Đ\xe3 chọn":"Chọn"})]})},e.id)})})]})},h=()=>{let[e,a]=(0,i.useState)([]),[t,h]=(0,i.useState)(0),[m,g]=(0,i.useState)(0),[u,x]=(0,i.useState)([]),[p,j]=(0,i.useState)([]),[b,N]=(0,i.useState)(!1);(0,i.useEffect)(()=>{(0,n.ro)().then(e=>{x(e)}).catch(e=>{console.error("Failed to fetch MaGiamGia data:",e)})},[]),(0,i.useEffect)(()=>{let e=localStorage.getItem("data");if(e)try{let t=JSON.parse(e);s.Z.post("http://huuphuoc.id.vn/api/showgiohang",{id_nguoidung:t.id}).then(e=>{a(e.data.data)}).catch(()=>{})}catch(e){}},[]),(0,i.useEffect)(()=>{let a=0,t=0;e.forEach(e=>{e.khoahocs.forEach(e=>{a+=e.giamgia;let r=p.find(a=>a.id_khoahoc===e.id);r&&(t+=e.giamgia*r.giamgia/100)})}),h(a),g(t)},[e,p]);let w=async e=>{try{let a=localStorage.getItem("data"),t=JSON.parse(a);if(!t)return null;let r={id_khoahoc:e,id_nguoidung:t.id};await s.Z.post("http://huuphuoc.id.vn/api/xoasanphamadd",r),d.Am.success("Sản phẩm đ\xe3 được x\xf3a!"),window.location.href="/page/cart"}catch(e){d.Am.error("Failed to remove course from cart.")}},f=localStorage.getItem("data"),y=f?JSON.parse(f):null;return(0,r.jsxs)("div",{className:"p-4",children:[(0,r.jsx)(d.Ix,{position:"top-right",autoClose:3e3}),(0,r.jsx)(o.default,{}),(0,r.jsx)("main",{className:"mt-60",children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("h1",{className:"display-4 text-center mb-4",children:"Giỏ H\xe0ng Của T\xf4i"}),(0,r.jsx)("div",{className:"table-responsive shadow-sm p-3 mb-5 bg-body-tertiary rounded",children:(0,r.jsxs)("table",{className:"table table-hover align-middle",children:[(0,r.jsx)("thead",{className:"table-light",children:(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{}),(0,r.jsx)("th",{children:"H\xecnh ảnh"}),(0,r.jsx)("th",{children:"Sản phẩm"}),(0,r.jsx)("th",{children:"Gi\xe1"}),(0,r.jsx)("th",{children:"Giảm Gi\xe1"}),(0,r.jsx)("th",{children:"Tổng phụ"})]})}),(0,r.jsx)("tbody",{children:e.map((e,a)=>e.khoahocs.map((e,t)=>(0,r.jsxs)("tr",{style:{fontSize:"1.2em",height:"60px",marginBottom:"10px"},children:[(0,r.jsx)("td",{className:"text-center",children:(0,r.jsx)("button",{className:"btn btn-danger btn-sm",onClick:()=>w(e.id),children:(0,r.jsx)("i",{className:"bi bi-trash"})})}),(0,r.jsx)("td",{children:(0,r.jsx)(c.default,{width:500,height:300,src:e.hinh,className:"img-fluid rounded",alt:e.ten,style:{maxWidth:"100px"}})}),(0,r.jsx)("td",{children:e.ten}),(0,r.jsx)("td",{children:(0,r.jsxs)("span",{children:["đ",e.gia]})}),(0,r.jsx)("td",{children:(0,r.jsxs)("span",{children:["đ",e.giamgia]})}),(0,r.jsx)("td",{children:(0,r.jsxs)("span",{className:"fw-bold",children:["đ",e.giamgia]})})]},"".concat(a,"-").concat(t))))}),(0,r.jsx)("tfoot",{children:(0,r.jsx)("tr",{children:(0,r.jsx)("td",{colSpan:"6",className:"text-center",children:(0,r.jsx)("button",{className:"bg-indigo-500 text-white font-bold p-2 rounded-lg",onClick:()=>N(!0),children:"Chọn Hoặc Nhập M\xe3 Voucher"})})})})]})}),(0,r.jsx)("div",{className:"row justify-content-end mt-4",children:(0,r.jsx)("div",{className:"col-md-6",children:(0,r.jsxs)("div",{className:"card shadow-sm p-3 mb-5 bg-body-tertiary rounded",children:[(0,r.jsx)("div",{className:"card-header text-dark",children:(0,r.jsx)("h3",{className:"mb-0",children:"Tổng Giỏ H\xe0ng"})}),(0,r.jsxs)("div",{className:"card-body",children:[(0,r.jsx)("table",{className:"table mb-3",children:(0,r.jsxs)("tbody",{children:[(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Tổng phụ"}),(0,r.jsxs)("td",{children:["đ",t]})]}),(0,r.jsxs)("tr",{children:[(0,r.jsx)("th",{children:"Giảm gi\xe1"}),(0,r.jsxs)("td",{children:["đ",m]})]}),(0,r.jsxs)("tr",{className:"table-active",children:[(0,r.jsx)("th",{children:"Tổng cộng"}),(0,r.jsx)("td",{children:(0,r.jsxs)("strong",{children:["đ",t-m]})})]})]})}),y?(0,r.jsx)("div",{className:"flex",children:(0,r.jsx)("a",{href:"/page/checkout",className:"text-indigo-700 font-bold bg-white shadow p-3 bg-body-tertiary rounded text-center w-full",children:"Tiến h\xe0nh thanh to\xe1n"})}):(0,r.jsx)("p",{className:"text-center text-danger mt-3",children:"Vui L\xf2ng Đăng Nhập"})]})]})})})]})}),b&&(0,r.jsx)("div",{className:"modal fade show d-block",tabIndex:"-1",style:{backgroundColor:"rgba(0,0,0,0.5)"},children:(0,r.jsx)("div",{className:"modal-dialog",children:(0,r.jsxs)("div",{className:"modal-content shadow-sm p-3 mb-5 bg-body-tertiary rounded",children:[(0,r.jsxs)("div",{className:"modal-header bg-warning text-dark",children:[(0,r.jsx)("h5",{className:"modal-title",children:"Voucher"}),(0,r.jsx)("button",{type:"button",className:"btn-close",onClick:()=>N(!1)})]}),(0,r.jsx)("div",{className:"modal-body",children:(0,r.jsx)(l,{handleApplyCoupon:a=>{a.preventDefault();let t=a.target.coupon_code.value.trim(),r=u.find(e=>e.magiamgia.maso===t&&"Đ\xe3 Duyệt"===e.magiamgia.trangthai);if(r){let a=r.id_khoahoc;if(e.some(e=>e.khoahocs.some(e=>e.id===a))){if(p.find(e=>e.id_khoahoc===a)){d.Am.error("Một m\xe3 giảm gi\xe1 đ\xe3 được \xe1p dụng cho kh\xf3a học n\xe0y.");return}let e=[...p,{id_magiamgia:r.magiamgia.id,id_khoahoc:a,giamgia:r.magiamgia.giamgia}];j(e),localStorage.setItem("appliedCoupons",JSON.stringify(e)),d.Am.success("M\xe3 giảm gi\xe1 \xe1p dụng th\xe0nh c\xf4ng!")}else d.Am.error("M\xe3 giảm gi\xe1 kh\xf4ng \xe1p dụng cho bất kỳ kh\xf3a học n\xe0o trong giỏ h\xe0ng.")}else d.Am.error("M\xe3 giảm gi\xe1 kh\xf4ng hợp lệ.")}})})]})})})]})}},83798:(e,a,t)=>{"use strict";t.d(a,{bx:()=>n,lk:()=>r,on:()=>s,ro:()=>i,vH:()=>d,vg:()=>o});let r=async e=>{let a=new URLSearchParams(window.location.search).get("id");try{let t=await fetch("http://huuphuoc.id.vn/api/addMaGiamGiaKhoaHoc",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_khoahoc:a,id_magiamgia:e})});if(!t.ok)throw Error("Failed to add MaGiamGia");return t.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},i=async()=>{try{let e=await fetch("http://huuphuoc.id.vn/api/showAllMaGiamGiaKhoaHoc");if(!e.ok)throw Error("Failed to fetch MaGiamGia data");return e.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},s=async()=>{try{let e=await fetch("http://huuphuoc.id.vn/api/showAllMaGiamGia");if(!e.ok)throw Error("Failed to fetch MaGiamGia data");return e.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},o=async e=>{let a=localStorage.getItem("data");if(!a)throw Error("User not authenticated");let t=JSON.parse(a);try{let a=await fetch("http://huuphuoc.id.vn/api/addNguoiDungMaGiamGia",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({trangthai:"Chưa sử dụng",dasudunghientai:"0",id_nguoidung:t.id,id_magiamgia:e.id_magiamgia})});if(!a.ok){let e=await a.json();throw Error(e.message||"Failed to add MaGiamGia")}return a.json()}catch(e){throw console.error("Fetch error:",e),Error(e.message||"Network error or server is down")}},n=async()=>{let e=JSON.parse(localStorage.getItem("data"));if(!e||!e.id)throw Error("User data is missing or invalid");try{let a=await fetch("http://huuphuoc.id.vn/api/showAllNguoiDungMaGiamGia",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!a.ok)throw Error("Server error: ".concat(a.statusText));return a.json()}catch(e){throw console.error("Fetch error:",e),Error("Network error or server is down")}},d=async()=>{let e=localStorage.getItem("data"),a=localStorage.getItem("appliedCoupons");if(!e)throw Error("User not authenticated");if(!a)throw Error("No applied coupons found");try{var t;let r=JSON.parse(e),i=a?JSON.parse(a):[];if(!r.id||!(null===(t=i[0])||void 0===t?void 0:t.id_magiamgia))throw Error("Invalid user or coupon data");let s=await fetch("http://huuphuoc.id.vn/api/TinhMaGiamGia",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:r.id,id_magiamgia:i[0].id_magiamgia})});if(!s.ok){let e=await s.json();throw Error(e.message||"Failed to add MaGiamGia")}return s.json()}catch(e){throw console.error("Fetch error:",e),Error(e.message||"Network error or server is down")}}},53982:()=>{}},e=>{var a=a=>e(e.s=a);e.O(0,[5950,7265,8173,4974,5919,5956,2130,8472,624,5497,7130,6215,1744],()=>a(52996)),_N_E=e.O()}]);