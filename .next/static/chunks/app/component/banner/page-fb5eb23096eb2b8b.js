(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[8765],{93468:(e,s,a)=>{Promise.resolve().then(a.bind(a,67157))},5565:(e,s,a)=>{"use strict";a.d(s,{default:()=>i.a});var r=a(4146),i=a.n(r)},4146:(e,s,a)=>{"use strict";Object.defineProperty(s,"__esModule",{value:!0}),function(e,s){for(var a in s)Object.defineProperty(e,a,{enumerable:!0,get:s[a]})}(s,{default:function(){return c},getImageProps:function(){return n}});let r=a(73749),i=a(40666),l=a(87970),t=r._(a(65514));function n(e){let{props:s}=(0,i.getImgProps)(e,{defaultLoader:t.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!0}});for(let[e,a]of Object.entries(s))void 0===a&&delete s[e];return{props:s}}let c=l.Image},67157:(e,s,a)=>{"use strict";a.r(s),a.d(s,{default:()=>n});var r=a(95155),i=a(12115);let l=async()=>{try{let e=await fetch("http://huuphuoc.id.vn/api/showBanner");if(!e.ok)throw Error("Failed to fetch banners");return e.json()}catch(e){throw console.error("Error fetching courses:",e),e}};var t=a(5565);let n=()=>{let[e,s]=(0,i.useState)([]),[a,n]=(0,i.useState)(!0),[c,d]=(0,i.useState)(null);(0,i.useEffect)(()=>{(async()=>{try{let e=await l();s(e.data)}catch(e){d(e.message)}finally{n(!1)}})()},[]);let h=e.filter(e=>1!==e.trangthai);return a?(0,r.jsx)("div",{children:"Loading..."}):c?(0,r.jsxs)("div",{children:["Error: ",c]}):(console.log(e,"banner"),(0,r.jsxs)("div",{className:"banner-area-one shape-move",children:[(0,r.jsx)("div",{className:"container",children:(0,r.jsxs)("div",{className:"row",children:[h.map(e=>(0,r.jsx)("div",{className:"order-2 col-lg-6 order-xl-1 order-lg-1 order-sm-2",children:(0,r.jsx)("div",{className:"banner-content-one",children:(0,r.jsxs)("div",{className:"inner",children:[(0,r.jsxs)("div",{className:"pre-title-banner",children:[(0,r.jsx)("i",{className:"mr-4 bi bi-lightbulb",style:{color:"#32ADE6"}}),(0,r.jsx)("span",{children:"Cổng v\xe0o Học tập suốt đời"})]}),(0,r.jsxs)("h1",{className:"title-banner",children:[e.tieude," ",(0,r.jsx)("br",{}),(0,r.jsx)("span",{children:"việc học trực tuyến"})]}),(0,r.jsx)("p",{className:"disc",children:e.mota}),(0,r.jsxs)("div",{className:"banner-btn-author-wrapper",children:[(0,r.jsxs)("a",{href:"course-five.html",className:"rts-btn btn-primary with-arrow",children:["Xem tất cả kh\xf3a học ",(0,r.jsx)("i",{className:"fa-regular fa-arrow-right"})]}),(0,r.jsxs)("div",{className:"sm-image-wrapper",children:[(0,r.jsx)("div",{className:"images-wrap",children:[,,,].fill().map((s,a)=>(0,r.jsx)(t.default,{src:e.hinh,alt:"banner",className:"w-20 h-20 p-1 bg-white rounded-full",width:100,height:100},a))}),(0,r.jsxs)("div",{className:"info",children:[(0,r.jsx)("h6",{className:"title",children:"2000+ sinh vi\xean"}),(0,r.jsx)("span",{children:"Tham gia lớp học trực tuyến của ch\xfang t\xf4i"})]})]})]})]})})},e.id)),(0,r.jsx)("div",{className:"order-1 col-lg-6 order--xl-2 order-lg-2 order-sm-1",children:h.length>0&&(0,r.jsx)("div",{className:"banner-right-img",children:(0,r.jsx)(t.default,{width:1e3,height:1e3,src:h[0].hinh,alt:"banner"})})})]})}),(0,r.jsxs)("div",{className:"review-thumb",children:[(0,r.jsxs)("div",{className:"review-single",children:[(0,r.jsx)("i",{className:"flex items-center justify-center w-32 h-16 text-3xl text-black rounded-lg bi bi-backpack4",style:{backgroundColor:"#32ADE6"}}),(0,r.jsxs)("div",{className:"info-right",children:[(0,r.jsx)("h6",{className:"title",children:"4.5"}),(0,r.jsx)("span",{children:"(2.4k Review)"})]})]}),(0,r.jsxs)("div",{className:"review-single two",children:[(0,r.jsx)("i",{className:"flex items-center justify-center w-32 h-16 text-3xl text-black rounded-lg bi bi-buildings-fill",style:{backgroundColor:"#32ADE6"}}),(0,r.jsxs)("div",{className:"info-right",children:[(0,r.jsx)("h6",{className:"title",children:"100+"}),(0,r.jsx)("span",{children:"Online Course"})]})]})]}),(0,r.jsxs)("div",{className:"shape-image",children:[(0,r.jsx)("div",{className:"shape one","data-speed":"0.04","data-revert":"true"}),(0,r.jsx)("div",{className:"shape two","data-speed":"0.04"}),(0,r.jsx)("div",{className:"shape three","data-speed":"0.04"})]})]}))}}},e=>{var s=s=>e(e.s=s);e.O(0,[7970,8441,1517,7358],()=>s(93468)),_N_E=e.O()}]);