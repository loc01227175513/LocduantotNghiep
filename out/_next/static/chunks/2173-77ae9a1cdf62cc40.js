(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2173],{34110:(e,a,s)=>{"use strict";s.r(a),s.d(a,{default:()=>n});var r=s(95155);let{useEffect:i,useState:l}=s(12115),{fetchBanner:t}=s(91041),c=s(5565),n=()=>{let[e,a]=l([]),[s,n]=l(!0),[d,o]=l(null);i(()=>{(async()=>{try{let e=await t();a(e.data)}catch(e){o(e.message)}finally{n(!1)}})()},[]);let h=e.filter(e=>1!==e.trangthai);return s?(0,r.jsx)("div",{children:"Loading..."}):d?(0,r.jsxs)("div",{children:["Error: ",d]}):(console.log(e,"banner"),(0,r.jsxs)("div",{className:"banner-area-one shape-move",children:[(0,r.jsx)("div",{className:"container",children:(0,r.jsxs)("div",{className:"row",children:[h.map(e=>(0,r.jsx)("div",{className:"order-2 col-lg-6 order-xl-1 order-lg-1 order-sm-2",children:(0,r.jsx)("div",{className:"banner-content-one",children:(0,r.jsxs)("div",{className:"inner",children:[(0,r.jsxs)("div",{className:"pre-title-banner",children:[(0,r.jsx)("i",{className:"mr-4 bi bi-lightbulb",style:{color:"#32ADE6"}}),(0,r.jsx)("span",{children:"Cổng v\xe0o Học tập suốt đời"})]}),(0,r.jsxs)("h1",{className:"title-banner",children:[e.tieude," ",(0,r.jsx)("br",{}),(0,r.jsx)("span",{children:"việc học trực tuyến"})]}),(0,r.jsx)("p",{className:"disc",children:e.mota}),(0,r.jsxs)("div",{className:"banner-btn-author-wrapper",children:[(0,r.jsxs)("a",{href:"course-five.html",className:"rts-btn btn-primary with-arrow",children:["Xem tất cả kh\xf3a học ",(0,r.jsx)("i",{className:"fa-regular fa-arrow-right"})]}),(0,r.jsxs)("div",{className:"sm-image-wrapper",children:[(0,r.jsx)("div",{className:"images-wrap",children:[,,,].fill().map((a,s)=>(0,r.jsx)(c,{src:e.hinh,alt:"banner",className:"w-20 h-20 p-1 bg-white rounded-full",width:100,height:100},s))}),(0,r.jsxs)("div",{className:"info",children:[(0,r.jsx)("h6",{className:"title",children:"2000+ sinh vi\xean"}),(0,r.jsx)("span",{children:"Tham gia lớp học trực tuyến của ch\xfang t\xf4i"})]})]})]})]})})},e.id)),(0,r.jsx)("div",{className:"order-1 col-lg-6 order--xl-2 order-lg-2 order-sm-1",children:h.length>0&&(0,r.jsx)("div",{className:"banner-right-img",children:(0,r.jsx)(c,{width:1e3,height:1e3,src:h[0].hinh,alt:"banner"})})})]})}),(0,r.jsxs)("div",{className:"review-thumb",children:[(0,r.jsxs)("div",{className:"review-single",children:[(0,r.jsx)("i",{className:"flex items-center justify-center w-32 h-16 text-3xl text-black rounded-lg bi bi-backpack4",style:{backgroundColor:"#32ADE6"}}),(0,r.jsxs)("div",{className:"info-right",children:[(0,r.jsx)("h6",{className:"title",children:"4.5"}),(0,r.jsx)("span",{children:"(2.4k Review)"})]})]}),(0,r.jsxs)("div",{className:"review-single two",children:[(0,r.jsx)("i",{className:"flex items-center justify-center w-32 h-16 text-3xl text-black rounded-lg bi bi-buildings-fill",style:{backgroundColor:"#32ADE6"}}),(0,r.jsxs)("div",{className:"info-right",children:[(0,r.jsx)("h6",{className:"title",children:"100+"}),(0,r.jsx)("span",{children:"Online Course"})]})]})]}),(0,r.jsxs)("div",{className:"shape-image",children:[(0,r.jsx)("div",{className:"shape one","data-speed":"0.04","data-revert":"true"}),(0,r.jsx)("div",{className:"shape two","data-speed":"0.04"}),(0,r.jsx)("div",{className:"shape three","data-speed":"0.04"})]})]}))}},19031:(e,a,s)=>{"use strict";s.d(a,{Commenthome:()=>t});var r=s(95155),i=s(12115);s(40094);var l=s(5565);let t=()=>{let[e,a]=(0,i.useState)([]),[s,t]=(0,i.useState)(1);(0,i.useEffect)(()=>{(async()=>{try{let e=await fetch("http://huuphuoc.id.vn/api/danhgia"),s=await e.json();a(s.data)}catch(e){console.error("Error fetching data:",e)}})()},[]);let c=e=>{t(e)},n=Math.ceil(e.length/3),d=e.slice((s-1)*3,3*s);return(0,r.jsxs)("div",{className:"mb-10",children:[(0,r.jsx)("div",{className:"grid gap-8 mx-6 small:grid-cols-1 md:grid-cols-3",children:d.map((e,a)=>(0,r.jsxs)("div",{className:"p-4 border",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("div",{children:(0,r.jsx)(l.default,{width:500,height:300,src:e.nguoi_danh_gia.hinh,alt:"",className:"rounded-full w-14 h-14"})}),(0,r.jsxs)("div",{className:"ml-3",children:[(0,r.jsx)("h6",{className:"p-0 m-0",children:e.nguoi_danh_gia.ten}),(0,r.jsx)("div",{className:"px-4 text-center bg-teal-100 rounded-md chucvu",children:(0,r.jsx)("p",{className:"p-0 m-0",children:"học vi\xean"})})]})]}),(0,r.jsx)("div",{children:(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsxs)("p",{className:"self-start",children:[e.noi_dung,". . . ."]}),(0,r.jsx)("a",{href:"",className:"self-end",children:"Xem Tiếp"})]})}),(0,r.jsxs)("div",{className:"flex items-center justify-between",children:[(0,r.jsxs)("div",{className:"flex items-center",children:[(0,r.jsx)("p",{children:e.so_sao}),e.so_sao>0&&e.so_sao<=5&&(0,r.jsx)("div",{className:"startcomment",children:(0,r.jsx)("ul",{className:"flex list-none",children:Array.from({length:e.so_sao}).map((e,a)=>(0,r.jsx)("li",{children:(0,r.jsx)("i",{className:"fa-sharp fa-solid fa-star"})},a))})})]}),(0,r.jsx)("div",{children:(0,r.jsx)("p",{children:"20/20/2020"})})]})]},a))}),(0,r.jsx)("div",{className:"d-flex justify-content-center mt-4",children:(0,r.jsx)("div",{className:"btn-group",children:[...Array(n).keys()].map(e=>(0,r.jsx)("button",{className:"btn ".concat(e+1===s?"btn-primary":"btn-secondary"," m-1"),onClick:()=>c(e+1),children:e+1},e))})}),(0,r.jsx)("div",{className:"xemtiep",children:(0,r.jsx)("a",{href:"",children:"xem tiếp"})})]})}},88631:(e,a,s)=>{"use strict";s.d(a,{default:()=>h});var r=s(64461),i=s(95155),l=s(2533),t=s(9949),c=s(39051);function n(){let e=(0,r._)(["\n  0% { transform: translateX(0); }\n  100% { transform: translateX(-50%); }\n"]);return n=function(){return e},e}let d=(0,s(71987).i7)(n()),o=["https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126647/13_jmgxo8.svg","https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126637/12_tm0xts.svg","https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126629/11_t1fwzm.svg","https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126621/10_tkgxsm.svg","https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126611/09_i4yvcq.svg","https://res.cloudinary.com/dnjakwi6l/image/upload/v1728126601/08_v0jlvy.svg"];function h(){return(0,i.jsx)(l.s,{justify:"center",align:"center",minH:"10vh",overflow:"hidden",w:"600px",mx:"auto",children:(0,i.jsx)(l.s,{animation:"".concat(d," 20s linear infinite"),minW:"200%",align:"center",children:[...o,...o].map((e,a)=>(0,i.jsx)(t.a,{mx:3,children:(0,i.jsx)(c._,{src:e,alt:"icon-".concat(a),boxSize:"9rem"})},a))})})}},2748:(e,a,s)=>{"use strict";s.d(a,{CourseNew:()=>g,Coursefree:()=>p,Courseseal:()=>j,OutstandingCourse:()=>x});var r=s(95155),i=s(12115),l=s(25856),t=s(80819),c=s(91068);s(85716),s(67396);var n=s(9949),d=s(97333),o=s(31027),h=s(11536),m=s(5565);let x=()=>{let[e,a]=(0,i.useState)([]),[s,x]=(0,i.useState)(""),[g,j]=(0,i.useState)(1);(0,i.useEffect)(()=>{fetch("http://huuphuoc.id.vn/api/allkhoahoc").then(e=>e.json()).then(e=>{a(e.data)}).catch(e=>{console.error("Error fetching data:",e),c.oR.error("Error fetching data!")})},[]);let p=e.length>0?e.map(e=>e.dangky).reduce((e,a)=>e+a,0)/e.length:0,u=s?e.filter(e=>e.theloai===s&&e.dangky>p):e.filter(e=>e.dangky>p),N=(g-1)*8,f=u.slice(N,N+8),v=Math.ceil(u.length/8),b=e=>{j(e)},y=async e=>{try{let a=await (0,t.fq)(e);console.log(a),c.oR.success("Added to favorites!")}catch(e){console.error("Error:",e),c.oR.error("Error adding to favorites!")}},w=e=>{let a=Math.floor(e),s=[];for(let e=1;e<=5;e++)s.push(e<=a?(0,r.jsx)(h.gt3,{className:"text-yellow-400 w-5 h-5","aria-label":"Filled Star"},e):(0,r.jsx)(h.wei,{className:"text-gray-300 w-5 h-5","aria-label":"Empty Star"},e));return s};return(0,r.jsxs)("div",{children:[(0,r.jsx)(c.N9,{}),(0,r.jsx)("div",{className:"course-area-start rts-section-gap",children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("div",{className:"row",children:(0,r.jsx)("div",{className:"col-lg-12",children:(0,r.jsxs)("div",{className:"title-between-area",children:[(0,r.jsxs)("div",{className:"title-area-left-style",children:[(0,r.jsxs)("div",{className:"pre-title",children:[(0,r.jsx)("i",{className:"mr-1 bi bi-lightbulb",style:{color:"#32ADE6"}}),(0,r.jsx)("span",{children:"Courses"})]}),(0,r.jsx)("h2",{className:"title",children:"Kh\xe1m ph\xe1 c\xe1c kh\xf3a học nổi bật"}),(0,r.jsx)("p",{className:"post-title",children:"Bạn sẽ t\xecm thấy thứ g\xec đ\xf3 khơi dậy sự t\xf2 m\xf2 của bạn v\xe0 n\xe2ng cao"})]}),(0,r.jsx)(l.b7,{onCategoryChange:e=>{x(e),j(1)}})]})})}),(0,r.jsxs)("div",{className:"border-t border-orange-100 ms-portfolio-filter-area main-isotop",children:[(0,r.jsx)("div",{className:"portfolio_wrap",children:(0,r.jsx)("div",{className:"filter row g-5 mt--20 portfolio-feed personal",children:f.map(e=>{let a=e.danhgia&&e.danhgia.length>0?e.danhgia.reduce((e,a)=>e+parseInt(a.danhgia,10),0)/e.danhgia.length:0;return(0,r.jsx)("div",{className:"transition flash grid-item-p element-item creative col-xl-3 col-lg-4 col-md-6 col-sm-6","data-category":"transition",children:(0,r.jsxs)("div",{className:"rts-single-course",children:[(0,r.jsx)("a",{href:"/page/course-detail?id=".concat(e.id),className:"thumbnail",children:(0,r.jsx)(m.default,{width:500,height:300,src:e.hinh,alt:"course"})}),(0,r.jsx)("div",{className:"save-icon","data-bs-toggle":"modal","data-bs-target":"#exampleModal-login",onClick:()=>y(e.id),children:(0,r.jsx)("i",{className:"fa-sharp fa-light fa-bookmark"})}),(0,r.jsx)("div",{className:"tags-area-wrapper",children:(0,r.jsx)("div",{className:"single-tag",children:(0,r.jsx)("span",{children:e.chude})})}),(0,r.jsxs)("div",{className:"lesson-studente",children:[(0,r.jsxs)("div",{className:"lesson",children:[(0,r.jsx)("i",{className:"fa-light fa-calendar-lines-pen"}),(0,r.jsxs)("span",{children:[e.baihocs," Lessons"]})]}),(0,r.jsxs)("div",{className:"lesson",children:[(0,r.jsx)("i",{className:"fa-light fa-user-group"}),(0,r.jsxs)("span",{children:[e.dangky," Students"]})]})]}),(0,r.jsx)("a",{href:"/page/course-detail?id=".concat(e.id),children:(0,r.jsx)("h5",{className:"title",children:e.ten})}),(0,r.jsx)("p",{className:"teacher",children:e.giangvien}),(0,r.jsxs)("div",{className:"rating-and-price",children:[(0,r.jsxs)("div",{className:"rating-area flex items-center",children:[(0,r.jsx)("span",{className:"mr-2",children:a.toFixed(1)}),(0,r.jsx)("div",{className:"stars flex",children:w(a)})]}),(0,r.jsx)("div",{className:"price-area",children:0===e.gia||0===e.giamgia?(0,r.jsx)("div",{className:"price text-white bg-cyan-500 p-1 rounded-md",children:"Miễn Ph\xed"}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("div",{className:"not price line-through text-gray-500 mr-2",children:["$",e.gia]}),(0,r.jsxs)("div",{className:"price text-red-500 font-semibold",children:["$",e.giamgia]})]})})]})]})},e.id)})})}),(0,r.jsx)(n.a,{display:"flex",justifyContent:"center",mt:"4",children:(0,r.jsx)(d.e,{spacing:"2",children:[...Array(v).keys()].map(e=>(0,r.jsx)(o.$,{className:"btn ".concat(e+1===g?"btn-primary":"btn-secondary"," mt-5 m-1"),borderColor:e+1===g?"teal.500":"gray.500",borderWidth:"1px",onClick:()=>b(e+1),children:e+1},e))})})]})]})})]})},g=()=>{let[e,a]=(0,i.useState)([]),[s,x]=(0,i.useState)(""),[g,j]=(0,i.useState)(1);(0,i.useEffect)(()=>{fetch("http://huuphuoc.id.vn/api/allkhoahoc").then(e=>e.json()).then(e=>{a(e.data)}).catch(e=>{console.error("Error fetching data:",e),c.oR.error("Error fetching data!")})},[]);let p=new Date;p.setDate(p.getDate()-10);let u=s?e.filter(e=>e.theloai===s&&new Date(e.created_at)>=p&&new Date(e.created_at)<new Date):e.filter(e=>new Date(e.created_at)>=p&&new Date(e.created_at)<new Date),N=(g-1)*8,f=u.slice(N,N+8),v=Math.ceil(u.length/8),b=e=>{j(e)},y=async e=>{try{let a=await (0,t.fq)(e);console.log(a),c.oR.success("Added to favorites!")}catch(e){console.error("Error:",e),c.oR.error("Error adding to favorites!")}},w=e=>{let a=Math.floor(e),s=[];for(let e=1;e<=5;e++)s.push(e<=a?(0,r.jsx)(h.gt3,{className:"text-yellow-400 w-5 h-5","aria-label":"Filled Star"},e):(0,r.jsx)(h.wei,{className:"text-gray-300 w-5 h-5","aria-label":"Empty Star"},e));return s};return(0,r.jsxs)("div",{children:[(0,r.jsx)(c.N9,{}),(0,r.jsx)("div",{className:"course-area-start rts-section-gap",children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("div",{className:"row",children:(0,r.jsx)("div",{className:"col-lg-12",children:(0,r.jsxs)("div",{className:"title-between-area",children:[(0,r.jsxs)("div",{className:"title-area-left-style",children:[(0,r.jsxs)("div",{className:"pre-title",children:[(0,r.jsx)("i",{className:"mr-1 bi bi-lightbulb",style:{color:"#32ADE6"}}),(0,r.jsx)("span",{children:"Courses"})]}),(0,r.jsx)("h2",{className:"title",children:"Kh\xe1m ph\xe1 c\xe1c kh\xf3a học mới nhất"}),(0,r.jsx)("p",{className:"post-title",children:"Bạn sẽ t\xecm thấy thứ g\xec đ\xf3 khơi dậy sự t\xf2 m\xf2 của bạn v\xe0 n\xe2ng cao"})]}),(0,r.jsx)(l.b7,{onCategoryChange:e=>{x(e),j(1)}})]})})}),(0,r.jsxs)("div",{className:"border-t border-orange-100 ms-portfolio-filter-area main-isotop",children:[(0,r.jsx)("div",{className:"portfolio_wrap",children:(0,r.jsx)("div",{className:"filter row g-5 mt--20 portfolio-feed personal",children:f.map(e=>{let a=e.danhgia&&e.danhgia.length>0?e.danhgia.reduce((e,a)=>e+parseInt(a.danhgia,10),0)/e.danhgia.length:0;return(0,r.jsx)("div",{className:"transition flash grid-item-p element-item creative col-xl-3 col-lg-4 col-md-6 col-sm-6","data-category":"transition",children:(0,r.jsxs)("div",{className:"rts-single-course",children:[(0,r.jsx)("a",{href:"/page/course-detail?id=".concat(e.id),className:"thumbnail",children:(0,r.jsx)(m.default,{width:500,height:300,src:e.hinh,alt:"course"})}),(0,r.jsx)("div",{className:"save-icon","data-bs-toggle":"modal","data-bs-target":"#exampleModal-login",onClick:()=>y(e.id),children:(0,r.jsx)("i",{className:"fa-sharp fa-light fa-bookmark"})}),(0,r.jsx)("div",{className:"tags-area-wrapper",children:(0,r.jsx)("div",{className:"single-tag",children:(0,r.jsx)("span",{children:e.chude})})}),(0,r.jsxs)("div",{className:"lesson-studente",children:[(0,r.jsxs)("div",{className:"lesson",children:[(0,r.jsx)("i",{className:"fa-light fa-calendar-lines-pen"}),(0,r.jsxs)("span",{children:[e.baihocs," Lessons"]})]}),(0,r.jsxs)("div",{className:"lesson",children:[(0,r.jsx)("i",{className:"fa-light fa-user-group"}),(0,r.jsxs)("span",{children:[e.dangky," Students"]})]})]}),(0,r.jsx)("a",{href:"/page/course-detail?id=".concat(e.id),children:(0,r.jsx)("h5",{className:"title",children:e.ten})}),(0,r.jsx)("p",{className:"teacher",children:e.giangvien}),(0,r.jsxs)("div",{className:"rating-and-price",children:[(0,r.jsxs)("div",{className:"rating-area flex items-center",children:[(0,r.jsx)("span",{className:"mr-2",children:a.toFixed(1)}),(0,r.jsx)("div",{className:"stars flex",children:w(a)})]}),(0,r.jsx)("div",{className:"price-area",children:0===e.gia||0===e.giamgia?(0,r.jsx)("span",{className:"text-green-500 font-bold",children:"Miễn Ph\xed"}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("span",{className:"line-through text-gray-500 mr-2",children:["$",e.gia]}),(0,r.jsxs)("span",{className:"text-red-500 font-semibold",children:["$",e.giamgia]})]})})]})]})},e.id)})})}),(0,r.jsx)(n.a,{display:"flex",justifyContent:"center",mt:"4",children:(0,r.jsx)(d.e,{spacing:"2",children:[...Array(v).keys()].map(e=>(0,r.jsx)(o.$,{className:"btn ".concat(e+1===g?"btn-primary":"btn-secondary"," mt-5 m-1"),borderColor:e+1===g?"teal.500":"gray.500",borderWidth:"1px",onClick:()=>b(e+1),children:e+1},e))})})]})]})})]})},j=()=>{let[e,a]=(0,i.useState)([]),[s,x]=(0,i.useState)(""),[g,j]=(0,i.useState)(1);(0,i.useEffect)(()=>{fetch("http://huuphuoc.id.vn/api/allkhoahoc").then(e=>e.json()).then(e=>{a(e.data)}).catch(e=>{console.error("Error fetching data:",e),c.oR.error("Error fetching data!")})},[]);let p=e=>{j(e)},u=s?e.filter(e=>e.theloai===s&&e.giamgia<e.gia):e.filter(e=>e.giamgia<e.gia),N=Math.ceil(u.length/4),f=u.slice((g-1)*4,4*g),v=async e=>{try{let a=await (0,t.fq)(e);console.log(a),c.oR.success("Added to favorites!")}catch(e){console.error("Error:",e),c.oR.error("Error adding to favorites!")}},b=e=>{let a=Math.floor(e),s=[];for(let e=1;e<=5;e++)s.push(e<=a?(0,r.jsx)(h.gt3,{className:"text-yellow-400 w-5 h-5","aria-label":"Filled Star"},e):(0,r.jsx)(h.wei,{className:"text-gray-300 w-5 h-5","aria-label":"Empty Star"},e));return s};return(0,r.jsxs)("div",{children:[(0,r.jsx)(c.N9,{}),(0,r.jsx)("div",{className:"p-0 course-area-start rts-section-gap",children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("div",{className:"row",children:(0,r.jsx)("div",{className:"col-lg-12",children:(0,r.jsxs)("div",{className:"title-between-area",children:[(0,r.jsxs)("div",{className:"title-area-left-style",children:[(0,r.jsxs)("div",{className:"pre-title",children:[(0,r.jsx)("i",{className:"mr-1 bi bi-lightbulb",style:{color:"#32ADE6"}}),(0,r.jsx)("span",{children:"Courses"})]}),(0,r.jsx)("h2",{className:"title",children:"Kh\xf3a học giảm gi\xe1"}),(0,r.jsx)("p",{className:"post-title",children:"Bạn sẽ t\xecm thấy thứ g\xec đ\xf3 khơi dậy sự t\xf2 m\xf2 của bạn v\xe0 n\xe2ng cao"})]}),(0,r.jsx)(l.b7,{onCategoryChange:e=>{x(e),j(1)}})]})})}),(0,r.jsx)("div",{className:"border-t border-orange-100 ms-portfolio-filter-area main-isotop",children:(0,r.jsx)("div",{className:"portfolio_wrap",children:(0,r.jsx)("div",{className:"filter row g-5 mt--20 portfolio-feed personal",children:f.map(e=>{let a=e.danhgia&&e.danhgia.length>0?e.danhgia.reduce((e,a)=>e+parseInt(a.danhgia,10),0)/e.danhgia.length:0;return(0,r.jsx)("div",{className:"transition flash grid-item-p element-item creative col-xl-3 col-lg-4 col-md-6 col-sm-6","data-category":"transition",children:(0,r.jsxs)("div",{className:"rts-single-course",children:[(0,r.jsx)("a",{href:"/page/course-detail?id=".concat(e.id),className:"thumbnail",children:(0,r.jsx)(m.default,{width:500,height:300,src:e.hinh,alt:"course"})}),(0,r.jsx)("div",{className:"save-icon","data-bs-toggle":"modal","data-bs-target":"#exampleModal-login",onClick:()=>v(e.id),children:(0,r.jsx)("i",{className:"fa-sharp fa-light fa-bookmark"})}),(0,r.jsx)("div",{className:"tags-area-wrapper",children:(0,r.jsx)("div",{className:"single-tag",children:(0,r.jsx)("span",{children:e.chude})})}),(0,r.jsxs)("div",{className:"lesson-studente",children:[(0,r.jsxs)("div",{className:"lesson",children:[(0,r.jsx)("i",{className:"fa-light fa-calendar-lines-pen"}),(0,r.jsxs)("span",{children:[e.baihocs," Lessons"]})]}),(0,r.jsxs)("div",{className:"lesson",children:[(0,r.jsx)("i",{className:"fa-light fa-user-group"}),(0,r.jsxs)("span",{children:[e.dangky," Students"]})]})]}),(0,r.jsx)("a",{href:"/page/course-detail?id=".concat(e.id),children:(0,r.jsx)("h5",{className:"title",children:e.ten})}),(0,r.jsx)("p",{className:"teacher",children:e.giangvien}),(0,r.jsxs)("div",{className:"rating-and-price",children:[(0,r.jsxs)("div",{className:"rating-area flex items-center",children:[(0,r.jsx)("span",{className:"mr-2",children:a.toFixed(1)}),(0,r.jsx)("div",{className:"stars flex",children:b(a)})]}),(0,r.jsx)("div",{className:"price-area",children:0===e.gia||0===e.giamgia?(0,r.jsx)("span",{className:"text-green-500 font-bold",children:"Miễn Ph\xed"}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("span",{className:"line-through text-gray-500 mr-2",children:["$",e.gia]}),(0,r.jsxs)("span",{className:"text-red-500 font-semibold",children:["$",e.giamgia]})]})})]})]})},e.id)})})})}),(0,r.jsx)(n.a,{display:"flex",justifyContent:"center",mt:"4",children:(0,r.jsx)(d.e,{spacing:"2",children:[...Array(N).keys()].map(e=>(0,r.jsx)(o.$,{className:"btn ".concat(e+1===g?"btn-primary":"btn-secondary"," mt-5 m-1"),borderColor:e+1===g?"teal.500":"gray.500",borderWidth:"1px",onClick:()=>p(e+1),children:e+1},e))})})]})})]})},p=()=>{let[e,a]=(0,i.useState)([]),[s,x]=(0,i.useState)(""),[g,j]=(0,i.useState)(1);(0,i.useEffect)(()=>{fetch("http://huuphuoc.id.vn/api/allkhoahoc").then(e=>e.json()).then(e=>{a(e.data)}).catch(e=>{console.error("Error fetching data:",e),c.oR.error("Error fetching data!")})},[]);let p=e=>{j(e)},u=s?e.filter(e=>e.theloai===s&&0===e.gia):e.filter(e=>0===e.gia),N=Math.ceil(u.length/4),f=u.slice((g-1)*4,4*g),v=async e=>{try{let a=await (0,t.fq)(e);console.log(a),c.oR.success("Added to favorites!")}catch(e){console.error("Error:",e),c.oR.error("Error adding to favorites!")}},b=e=>{let a=Math.floor(e),s=[];for(let e=1;e<=5;e++)s.push(e<=a?(0,r.jsx)(h.gt3,{className:"text-yellow-400 w-5 h-5","aria-label":"Filled Star"},e):(0,r.jsx)(h.wei,{className:"text-gray-300 w-5 h-5","aria-label":"Empty Star"},e));return s};return(0,r.jsxs)("div",{children:[(0,r.jsx)(c.N9,{}),(0,r.jsx)("div",{className:"p-0 course-area-start rts-section-gap",children:(0,r.jsxs)("div",{className:"container",children:[(0,r.jsx)("div",{className:"row",children:(0,r.jsx)("div",{className:"col-lg-12",children:(0,r.jsxs)("div",{className:"title-between-area",children:[(0,r.jsxs)("div",{className:"title-area-left-style",children:[(0,r.jsxs)("div",{className:"pre-title",children:[(0,r.jsx)("i",{className:"mr-1 bi bi-lightbulb",style:{color:"#32ADE6"}}),(0,r.jsx)("span",{children:"Courses"})]}),(0,r.jsx)("h2",{className:"title",children:"Kh\xf3a học miễn ph\xed"}),(0,r.jsx)("p",{className:"post-title",children:"Bạn sẽ t\xecm thấy thứ g\xec đ\xf3 khơi dậy sự t\xf2 m\xf2 của bạn v\xe0 n\xe2ng cao"})]}),(0,r.jsx)(l.b7,{onCategoryChange:e=>{x(e),j(1)}})]})})}),(0,r.jsx)("div",{className:"border-t border-orange-100 ms-portfolio-filter-area main-isotop",children:(0,r.jsx)("div",{className:"portfolio_wrap",children:(0,r.jsx)("div",{className:"filter row g-5 mt--20 portfolio-feed personal",children:f.map(e=>{let a=e.danhgia&&e.danhgia.length>0?e.danhgia.reduce((e,a)=>e+parseInt(a.danhgia,10),0)/e.danhgia.length:0;return(0,r.jsx)("div",{className:"transition flash grid-item-p element-item creative col-xl-3 col-lg-4 col-md-6 col-sm-6","data-category":"transition",children:(0,r.jsxs)("div",{className:"rts-single-course",children:[(0,r.jsx)("a",{href:"/page/course-detail?id=".concat(e.id),className:"thumbnail",children:(0,r.jsx)(m.default,{width:500,height:300,src:e.hinh,alt:"course"})}),(0,r.jsx)("div",{className:"save-icon","data-bs-toggle":"modal","data-bs-target":"#exampleModal-login",onClick:()=>v(e.id),children:(0,r.jsx)("i",{className:"fa-sharp fa-light fa-bookmark"})}),(0,r.jsx)("div",{className:"tags-area-wrapper",children:(0,r.jsx)("div",{className:"single-tag",children:(0,r.jsx)("span",{children:e.chude})})}),(0,r.jsxs)("div",{className:"lesson-studente",children:[(0,r.jsxs)("div",{className:"lesson",children:[(0,r.jsx)("i",{className:"fa-light fa-calendar-lines-pen"}),(0,r.jsxs)("span",{children:[e.baihocs," Lessons"]})]}),(0,r.jsxs)("div",{className:"lesson",children:[(0,r.jsx)("i",{className:"fa-light fa-user-group"}),(0,r.jsxs)("span",{children:[e.dangky," Students"]})]})]}),(0,r.jsx)("a",{href:"/page/course-detail?id=".concat(e.id),children:(0,r.jsx)("h5",{className:"title",children:e.ten})}),(0,r.jsx)("p",{className:"teacher",children:e.giangvien}),(0,r.jsxs)("div",{className:"rating-and-price",children:[(0,r.jsxs)("div",{className:"rating-area flex items-center",children:[(0,r.jsx)("span",{className:"mr-2",children:a.toFixed(1)}),(0,r.jsx)("div",{className:"stars flex",children:b(a)})]}),(0,r.jsx)("div",{className:"price-area",children:0===e.gia?(0,r.jsx)("span",{className:"text-green-500 font-bold",children:"Miễn Ph\xed"}):(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("span",{className:"line-through text-gray-500 mr-2",children:["$",e.gia]}),(0,r.jsxs)("span",{className:"text-red-500 font-semibold",children:["$",e.giamgia]})]})})]})]})},e.id)})})})}),(0,r.jsx)(n.a,{display:"flex",justifyContent:"center",mt:"4",children:(0,r.jsx)(d.e,{spacing:"2",children:[...Array(N).keys()].map(e=>(0,r.jsx)(o.$,{className:"btn ".concat(e+1===g?"btn-primary":"btn-secondary"," m-1"),borderColor:e+1===g?"teal.500":"gray.500",borderWidth:"1px",onClick:()=>p(e+1),children:e+1},e))})})]})})]})}},91041:(e,a,s)=>{"use strict";s.r(a),s.d(a,{fetchBanner:()=>r});let r=async()=>{try{let e=await fetch("http://huuphuoc.id.vn/api/showBanner");if(!e.ok)throw Error("Failed to fetch banners");return e.json()}catch(e){throw console.error("Error fetching courses:",e),e}}},80819:(e,a,s)=>{"use strict";s.d(a,{Hv:()=>l,Qv:()=>i,fq:()=>r});let r=async e=>{let a;let s=localStorage.getItem("data");if(!s)throw Error("No user data found");try{a=JSON.parse(s)}catch(e){throw Error("Invalid user data")}if(!e)throw Error("No course ID provided");let r=await fetch("http://huuphuoc.id.vn/api/addKhoaHocYeuThich",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_khoahoc:e,id_nguoidung:a.id})});if(!r.ok)throw Error("Failed to add favorite course");return r.json()},i=async()=>{let e=JSON.parse(localStorage.getItem("data")),a=await fetch("http://huuphuoc.id.vn/api/showKhoaHocYeuThich",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id_nguoidung:e.id})});if(!a.ok)throw Error("Failed to fetch courses");return a.json()},l=async e=>{try{let a=await fetch("http://huuphuoc.id.vn/api/deleteKhoaHocYeuThich/".concat(e),{method:"DELETE"});if(!a.ok)throw Error("Failed to unfollow lecturer");return await a.json()}catch(e){throw console.error("Error:",e),e}}},40094:()=>{}}]);