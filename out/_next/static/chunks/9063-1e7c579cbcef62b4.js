(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9063],{85716:()=>{},64740:(e,t,n)=>{"use strict";n.d(t,{c:()=>i});var r=n(12115);function i(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=(0,r.useRef)(e);return(0,r.useEffect)(()=>{n.current=e}),(0,r.useCallback)(function(){for(var e,t=arguments.length,r=Array(t),i=0;i<t;i++)r[i]=arguments[i];return null===(e=n.current)||void 0===e?void 0:e.call(n,...r)},t)}},24192:(e,t,n)=>{"use strict";n.d(t,{i:()=>l});var r=n(12115),i=n(64740);function l(e){let{value:t,defaultValue:n,onChange:l,shouldUpdate:o=(e,t)=>e!==t}=e,s=(0,i.c)(l),a=(0,i.c)(o),[c,d]=(0,r.useState)(n),u=void 0!==t,f=u?t:c,h=(0,i.c)(e=>{let t="function"==typeof e?e(f):e;a(f,t)&&(u||d(t),s(t))},[u,s,f,a]);return[f,h]}},13792:(e,t,n)=>{"use strict";n.d(t,{D:()=>r});let r=(0,n(78358).w)({displayName:"ChevronDownIcon",d:"M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"})},63022:(e,t,n)=>{"use strict";n.d(t,{b:()=>i});var r=n(95155);let i=(0,n(78358).w)({displayName:"TimeIcon",path:(0,r.jsxs)("g",{fill:"currentColor",children:[(0,r.jsx)("path",{d:"M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm0,22A10,10,0,1,1,22,12,10.011,10.011,0,0,1,12,22Z"}),(0,r.jsx)("path",{d:"M17.134,15.81,12.5,11.561V6.5a1,1,0,0,0-2,0V12a1,1,0,0,0,.324.738l4.959,4.545a1.01,1.01,0,0,0,1.413-.061A1,1,0,0,0,17.134,15.81Z"})]})})},59008:(e,t,n)=>{"use strict";n.d(t,{J:()=>a});var r=n(95155),i=n(39353),l=n(5311),o=n(97459),s=n(38642);let a=(0,o.R)(function(e,t){let{getButtonProps:n}=(0,l.AV)(),o=n(e,t),a={display:"flex",alignItems:"center",width:"100%",outline:0,...(0,l.EF)().button};return(0,r.jsx)(s.B.button,{...o,className:(0,i.cx)("chakra-accordion__button",e.className),__css:a})});a.displayName="AccordionButton"},5311:(e,t,n)=>{"use strict";n.d(t,{AV:()=>a,C3:()=>c,EF:()=>o,Of:()=>u,TG:()=>s,gm:()=>l,v3:()=>f});var r=n(44711),i=n(76362);let[l,o]=(0,r.q)({name:"AccordionStylesContext",hookName:"useAccordionStyles",providerName:"<Accordion />"}),[s,a]=(0,r.q)({name:"AccordionItemContext",hookName:"useAccordionItemContext",providerName:"<AccordionItem />"}),[c,d,u,f]=(0,i.D)()},1497:(e,t,n)=>{"use strict";n.d(t,{A:()=>u});var r=n(95155),i=n(25916),l=n(39353),o=n(12115),s=n(5311),a=n(33923),c=n(97459),d=n(38642);let u=(0,c.R)(function(e,t){let{children:n,className:c}=e,{htmlProps:u,...f}=(0,a.r9)(e),h=(0,s.EF)(),m=(0,i.H2)({...h.container,overflowAnchor:"none"}),p=(0,o.useMemo)(()=>f,[f]);return(0,r.jsx)(s.TG,{value:p,children:(0,r.jsx)(d.B.div,{ref:t,...u,className:(0,l.cx)("chakra-accordion__item",c),__css:m,children:"function"==typeof n?n({isExpanded:!!f.isOpen,isDisabled:!!f.isDisabled}):n})})});u.displayName="AccordionItem"},34916:(e,t,n)=>{"use strict";n.d(t,{v:()=>b});var r=n(95155),i=n(39353),l=n(5311),o=n(33923),s=n(24744),a=n(25683),c=n(1797),d=n(12115),u=n(81033);let f=e=>null!=e&&parseInt(e.toString(),10)>0,h={exit:{height:{duration:.2,ease:u.xf.ease},opacity:{duration:.3,ease:u.xf.ease}},enter:{height:{duration:.3,ease:u.xf.ease},opacity:{duration:.4,ease:u.xf.ease}}},m={exit:e=>{var t;let{animateOpacity:n,startingHeight:r,transition:i,transitionEnd:l,delay:o}=e;return{...n&&{opacity:f(r)?1:0},height:r,transitionEnd:null==l?void 0:l.exit,transition:null!==(t=null==i?void 0:i.exit)&&void 0!==t?t:u.yA.exit(h.exit,o)}},enter:e=>{var t;let{animateOpacity:n,endingHeight:r,transition:i,transitionEnd:l,delay:o}=e;return{...n&&{opacity:1},height:r,transitionEnd:null==l?void 0:l.enter,transition:null!==(t=null==i?void 0:i.enter)&&void 0!==t?t:u.yA.enter(h.enter,o)}}},p=(0,d.forwardRef)((e,t)=>{let{in:n,unmountOnExit:l,animateOpacity:o=!0,startingHeight:u=0,endingHeight:f="auto",style:h,className:p,transition:v,transitionEnd:x,animatePresenceProps:b,...y}=e,[g,N]=(0,d.useState)(!1);(0,d.useEffect)(()=>{let e=setTimeout(()=>{N(!0)});return()=>clearTimeout(e)},[]),(0,s.R)({condition:Number(u)>0&&!!l,message:"startingHeight and unmountOnExit are mutually exclusive. You can't use them together"});let O=parseFloat(u.toString())>0,E={startingHeight:u,endingHeight:f,animateOpacity:o,transition:g?v:{enter:{duration:0}},transitionEnd:{enter:null==x?void 0:x.enter,exit:l?null==x?void 0:x.exit:{...null==x?void 0:x.exit,display:O?"block":"none"}}},w=!l||n,I=n||l?"enter":"exit";return(0,r.jsx)(a.N,{...b,initial:!1,custom:E,children:w&&(0,r.jsx)(c.P.div,{ref:t,...y,className:(0,i.cx)("chakra-collapse",p),style:{overflow:"hidden",display:"block",...h},custom:E,variants:m,initial:!!l&&"exit",animate:I,exit:"exit"})})});p.displayName="Collapse";var v=n(97459),x=n(38642);let b=(0,v.R)(function(e,t){let{className:n,motionProps:s,...a}=e,{reduceMotion:c}=(0,o.Dr)(),{getPanelProps:d,isOpen:u}=(0,l.AV)(),f=d(a,t),h=(0,i.cx)("chakra-accordion__panel",n),m=(0,l.EF)();c||delete f.hidden;let v=(0,r.jsx)(x.B.div,{...f,__css:m.panel,className:h});return c?v:(0,r.jsx)(p,{in:u,...s,children:v})});b.displayName="AccordionPanel"},86901:(e,t,n)=>{"use strict";n.d(t,{n:()=>f});var r=n(95155),i=n(70723),l=n(39353),o=n(12115),s=n(5311),a=n(33923),c=n(97459),d=n(70605),u=n(38642);let f=(0,c.R)(function(e,t){let{children:n,reduceMotion:c,...f}=e,h=(0,d.o)("Accordion",f),m=(0,i.M)(f),{htmlProps:p,descendants:v,...x}=(0,a.O3)(m),b=(0,o.useMemo)(()=>({...x,reduceMotion:!!c}),[x,c]);return(0,r.jsx)(s.C3,{value:v,children:(0,r.jsx)(a.If,{value:b,children:(0,r.jsx)(s.gm,{value:h,children:(0,r.jsx)(u.B.div,{ref:t,...p,className:(0,l.cx)("chakra-accordion",f.className),__css:h.root,children:n})})})})});f.displayName="Accordion"},33923:(e,t,n)=>{"use strict";n.d(t,{Dr:()=>f,If:()=>u,O3:()=>d,r9:()=>h});var r=n(24192),i=n(38954),l=n(44711),o=n(118),s=n(24744),a=n(12115),c=n(5311);function d(e){let{onChange:t,defaultIndex:n,index:i,allowMultiple:l,allowToggle:o,...d}=e;(function(e){let t=e.index||e.defaultIndex,n=null!=t&&!Array.isArray(t)&&e.allowMultiple;(0,s.R)({condition:!!n,message:"If 'allowMultiple' is passed, then 'index' or 'defaultIndex' must be an array. You passed: ".concat(typeof t,",")})})(e),(0,s.R)({condition:!!(e.allowMultiple&&e.allowToggle),message:"If 'allowMultiple' is passed, 'allowToggle' will be ignored. Either remove 'allowToggle' or 'allowMultiple' depending on whether you want multiple accordions visible or not"});let u=(0,c.Of)(),[f,h]=(0,a.useState)(-1);(0,a.useEffect)(()=>()=>{h(-1)},[]);let[m,p]=(0,r.i)({value:i,defaultValue:()=>l?null!=n?n:[]:null!=n?n:-1,onChange:t});return{index:m,setIndex:p,htmlProps:d,getAccordionItemProps:e=>{let t=!1;return null!==e&&(t=Array.isArray(m)?m.includes(e):m===e),{isOpen:t,onChange:t=>{null!==e&&(l&&Array.isArray(m)?p(t?m.concat(e):m.filter(t=>t!==e)):t?p(e):o&&p(-1))}}},focusedIndex:f,setFocusedIndex:h,descendants:u}}let[u,f]=(0,l.q)({name:"AccordionContext",hookName:"useAccordionContext",providerName:"Accordion"});function h(e){var t;let{isDisabled:n,isFocusable:r,id:l,...d}=e,{getAccordionItemProps:u,setFocusedIndex:h}=f(),m=(0,a.useRef)(null),p=(0,a.useId)(),v=null!=l?l:p,x="accordion-button-".concat(v),b="accordion-panel-".concat(v);(0,s.R)({condition:!!(e.isFocusable&&!e.isDisabled),message:"Using only 'isFocusable', this prop is reserved for situations where you pass 'isDisabled' but you still want the element to receive focus (A11y). Either remove it or pass 'isDisabled' as well.\n    "});let{register:y,index:g,descendants:N}=(0,c.v3)({disabled:n&&!r}),{isOpen:O,onChange:E}=u(-1===g?null:g);t={isOpen:O,isDisabled:n},(0,s.R)({condition:t.isOpen&&!!t.isDisabled,message:"Cannot open a disabled accordion item"});let w=(0,a.useCallback)(()=>{null==E||E(!O),h(g)},[g,h,O,E]),I=(0,a.useCallback)(e=>{let t={ArrowDown:()=>{let e=N.nextEnabled(g);null==e||e.node.focus()},ArrowUp:()=>{let e=N.prevEnabled(g);null==e||e.node.focus()},Home:()=>{let e=N.firstEnabled();null==e||e.node.focus()},End:()=>{let e=N.lastEnabled();null==e||e.node.focus()}}[e.key];t&&(e.preventDefault(),t(e))},[N,g]),C=(0,a.useCallback)(()=>{h(g)},[h,g]),j=(0,a.useCallback)(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return{...e,type:"button",ref:(0,i.Px)(y,m,t),id:x,disabled:!!n,"aria-expanded":!!O,"aria-controls":b,onClick:(0,o.H)(e.onClick,w),onFocus:(0,o.H)(e.onFocus,C),onKeyDown:(0,o.H)(e.onKeyDown,I)}},[x,n,O,w,C,I,b,y]),k=(0,a.useCallback)(function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;return{...e,ref:t,role:"region",id:b,"aria-labelledby":x,hidden:!O}},[x,O,b]);return{isOpen:O,isDisabled:n,isFocusable:r,onOpen:()=>{null==E||E(!0)},onClose:()=>{null==E||E(!1)},getButtonProps:j,getPanelProps:k,htmlProps:d}}},76362:(e,t,n)=>{"use strict";n.d(t,{D:()=>v});var r=n(38954),i=n(44711),l=n(12115);function o(e){return e.sort((e,t)=>{let n=e.compareDocumentPosition(t);if(n&Node.DOCUMENT_POSITION_FOLLOWING||n&Node.DOCUMENT_POSITION_CONTAINED_BY)return -1;if(n&Node.DOCUMENT_POSITION_PRECEDING||n&Node.DOCUMENT_POSITION_CONTAINS)return 1;if(!(n&Node.DOCUMENT_POSITION_DISCONNECTED)&&!(n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC))return 0;throw Error("Cannot sort the given nodes.")})}let s=e=>"object"==typeof e&&"nodeType"in e&&e.nodeType===Node.ELEMENT_NODE;function a(e,t,n){let r=e+1;return n&&r>=t&&(r=0),r}function c(e,t,n){let r=e-1;return n&&r<0&&(r=t),r}let d="undefined"!=typeof window?l.useLayoutEffect:l.useEffect,u=e=>e;var f=Object.defineProperty,h=(e,t,n)=>t in e?f(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,m=(e,t,n)=>(h(e,"symbol"!=typeof t?t+"":t,n),n);class p{constructor(){var e=this;m(this,"descendants",new Map),m(this,"register",e=>{if(null!=e)return s(e)?this.registerNode(e):t=>{this.registerNode(t,e)}}),m(this,"unregister",e=>{this.descendants.delete(e);let t=o(Array.from(this.descendants.keys()));this.assignIndex(t)}),m(this,"destroy",()=>{this.descendants.clear()}),m(this,"assignIndex",e=>{this.descendants.forEach(t=>{let n=e.indexOf(t.node);t.index=n,t.node.dataset.index=t.index.toString()})}),m(this,"count",()=>this.descendants.size),m(this,"enabledCount",()=>this.enabledValues().length),m(this,"values",()=>Array.from(this.descendants.values()).sort((e,t)=>e.index-t.index)),m(this,"enabledValues",()=>this.values().filter(e=>!e.disabled)),m(this,"item",e=>{if(0!==this.count())return this.values()[e]}),m(this,"enabledItem",e=>{if(0!==this.enabledCount())return this.enabledValues()[e]}),m(this,"first",()=>this.item(0)),m(this,"firstEnabled",()=>this.enabledItem(0)),m(this,"last",()=>this.item(this.descendants.size-1)),m(this,"lastEnabled",()=>{let e=this.enabledValues().length-1;return this.enabledItem(e)}),m(this,"indexOf",e=>{var t,n;return e&&null!==(n=null===(t=this.descendants.get(e))||void 0===t?void 0:t.index)&&void 0!==n?n:-1}),m(this,"enabledIndexOf",e=>null==e?-1:this.enabledValues().findIndex(t=>t.node.isSameNode(e))),m(this,"next",function(t){let n=!(arguments.length>1)||void 0===arguments[1]||arguments[1],r=a(t,e.count(),n);return e.item(r)}),m(this,"nextEnabled",function(t){let n=!(arguments.length>1)||void 0===arguments[1]||arguments[1],r=e.item(t);if(!r)return;let i=a(e.enabledIndexOf(r.node),e.enabledCount(),n);return e.enabledItem(i)}),m(this,"prev",function(t){let n=!(arguments.length>1)||void 0===arguments[1]||arguments[1],r=c(t,e.count()-1,n);return e.item(r)}),m(this,"prevEnabled",function(t){let n=!(arguments.length>1)||void 0===arguments[1]||arguments[1],r=e.item(t);if(!r)return;let i=c(e.enabledIndexOf(r.node),e.enabledCount()-1,n);return e.enabledItem(i)}),m(this,"registerNode",(e,t)=>{if(!e||this.descendants.has(e))return;let n=o(Array.from(this.descendants.keys()).concat(e));(null==t?void 0:t.disabled)&&(t.disabled=!!t.disabled);let r={node:e,index:-1,...t};this.descendants.set(e,r),this.assignIndex(n)})}}function v(){let[e,t]=(0,i.q)({name:"DescendantsProvider",errorMessage:"useDescendantsContext must be used within DescendantsProvider"});return[e,t,()=>{let e=(0,l.useRef)(new p);return d(()=>()=>e.current.destroy()),e.current},e=>{let n=t(),[i,o]=(0,l.useState)(-1),s=(0,l.useRef)(null);d(()=>()=>{s.current&&n.unregister(s.current)},[]),d(()=>{if(!s.current)return;let e=Number(s.current.dataset.index);i==e||Number.isNaN(e)||o(e)});let a=e?u(n.register(e)):u(n.register);return{descendants:n,index:i,enabledIndex:n.enabledIndexOf(s.current),register:(0,r.Px)(a,s)}}]}},78358:(e,t,n)=>{"use strict";n.d(t,{w:()=>s});var r=n(95155),i=n(12115),l=n(68405),o=n(97459);function s(e){let{viewBox:t="0 0 24 24",d:n,displayName:s,defaultProps:a={}}=e,c=i.Children.toArray(e.path),d=(0,o.R)((e,i)=>(0,r.jsx)(l.I,{ref:i,viewBox:t,...a,...e,children:c.length?c:(0,r.jsx)("path",{fill:"currentColor",d:n})}));return d.displayName=s,d}},68405:(e,t,n)=>{"use strict";n.d(t,{I:()=>c});var r=n(95155),i=n(39353),l=n(97459),o=n(70605),s=n(38642);let a={path:(0,r.jsxs)("g",{stroke:"currentColor",strokeWidth:"1.5",children:[(0,r.jsx)("path",{strokeLinecap:"round",fill:"none",d:"M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25"}),(0,r.jsx)("path",{fill:"currentColor",strokeLinecap:"round",d:"M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0"}),(0,r.jsx)("circle",{fill:"none",strokeMiterlimit:"10",cx:"12",cy:"12",r:"11.25"})]}),viewBox:"0 0 24 24"},c=(0,l.R)((e,t)=>{let{as:n,viewBox:l,color:c="currentColor",focusable:d=!1,children:u,className:f,__css:h,...m}=e,p=(0,i.cx)("chakra-icon",f),v=(0,o.V)("Icon",e),x={ref:t,focusable:d,className:p,__css:{w:"1em",h:"1em",display:"inline-block",lineHeight:"1em",flexShrink:0,color:c,...h,...v}},b=null!=l?l:a.viewBox;if(n&&"string"!=typeof n)return(0,r.jsx)(s.B.svg,{as:n,...x,...m});let y=null!=u?u:a.path;return(0,r.jsx)(s.B.svg,{verticalAlign:"middle",viewBox:b,...x,...m,children:y})});c.displayName="Icon"},35786:(e,t,n)=>{"use strict";n.d(t,{B:()=>d});var r=n(95155),i=n(89221),l=n(39353),o=n(12115),s=n(38642);let a=e=>(0,r.jsx)(s.B.div,{className:"chakra-stack__item",...e,__css:{display:"inline-block",flex:"0 0 auto",minWidth:0,...e.__css}});a.displayName="StackItem";var c=n(86530);let d=(0,n(97459).R)((e,t)=>{let{isInline:n,direction:d,align:u,justify:f,spacing:h="0.5rem",wrap:m,children:p,divider:v,className:x,shouldWrapChildren:b,...y}=e,g=n?"row":null!=d?d:"column",N=(0,o.useMemo)(()=>(function(e){let{spacing:t,direction:n}=e,r={column:{my:t,mx:0,borderLeftWidth:0,borderBottomWidth:"1px"},"column-reverse":{my:t,mx:0,borderLeftWidth:0,borderBottomWidth:"1px"},row:{mx:t,my:0,borderLeftWidth:"1px",borderBottomWidth:0},"row-reverse":{mx:t,my:0,borderLeftWidth:"1px",borderBottomWidth:0}};return{"&":(0,c.bk)(n,e=>r[e])}})({spacing:h,direction:g}),[h,g]),O=!!v,E=!b&&!O,w=(0,o.useMemo)(()=>{let e=(0,i.a)(p);return E?e:e.map((t,n)=>{let i=void 0!==t.key?t.key:n,l=n+1===e.length,s=(0,r.jsx)(a,{children:t},i),c=b?s:t;if(!O)return c;let d=(0,o.cloneElement)(v,{__css:N});return(0,r.jsxs)(o.Fragment,{children:[c,l?null:d]},i)})},[v,N,O,E,b,p]),I=(0,l.cx)("chakra-stack",x);return(0,r.jsx)(s.B.div,{ref:t,display:"flex",alignItems:u,justifyContent:f,flexDirection:g,flexWrap:m,gap:O?void 0:h,className:I,...y,children:w})});d.displayName="Stack"},33420:(e,t,n)=>{"use strict";n.d(t,{T:()=>l});var r=n(95155),i=n(35786);let l=(0,n(97459).R)((e,t)=>(0,r.jsx)(i.B,{align:"center",...e,direction:"column",ref:t}));l.displayName="VStack"},81033:(e,t,n)=>{"use strict";n.d(t,{jd:()=>i,xf:()=>r,yA:()=>l});let r={ease:[.25,.1,.25,1],easeIn:[.4,0,1,1],easeOut:[0,0,.2,1],easeInOut:[.4,0,.2,1]},i={enter:{duration:.2,ease:r.easeOut},exit:{duration:.1,ease:r.easeIn}},l={enter:(e,t)=>({...e,delay:"number"==typeof t?t:null==t?void 0:t.enter}),exit:(e,t)=>({...e,delay:"number"==typeof t?t:null==t?void 0:t.exit})}},118:(e,t,n)=>{"use strict";function r(...e){return function(...t){e.forEach(e=>e?.(...t))}}function i(...e){return function(t){e.some(e=>(e?.(t),t?.defaultPrevented))}}n.d(t,{H:()=>i,O:()=>r})},89221:(e,t,n)=>{"use strict";n.d(t,{a:()=>i});var r=n(12115);function i(e){return r.Children.toArray(e).filter(e=>(0,r.isValidElement)(e))}},24744:(e,t,n)=>{"use strict";n.d(t,{R:()=>r});let r=e=>{let{condition:t,message:n}=e}},25683:(e,t,n)=>{"use strict";n.d(t,{N:()=>x});var r=n(95155),i=n(12115),l=n(39656),o=n(99234),s=n(27249);class a extends i.Component{getSnapshotBeforeUpdate(e){let t=this.props.childRef.current;if(t&&e.isPresent&&!this.props.isPresent){let e=this.props.sizeRef.current;e.height=t.offsetHeight||0,e.width=t.offsetWidth||0,e.top=t.offsetTop,e.left=t.offsetLeft}return null}componentDidUpdate(){}render(){return this.props.children}}function c(e){let{children:t,isPresent:n}=e,l=(0,i.useId)(),o=(0,i.useRef)(null),c=(0,i.useRef)({width:0,height:0,top:0,left:0}),{nonce:d}=(0,i.useContext)(s.Q);return(0,i.useInsertionEffect)(()=>{let{width:e,height:t,top:r,left:i}=c.current;if(n||!o.current||!e||!t)return;o.current.dataset.motionPopId=l;let s=document.createElement("style");return d&&(s.nonce=d),document.head.appendChild(s),s.sheet&&s.sheet.insertRule('\n          [data-motion-pop-id="'.concat(l,'"] {\n            position: absolute !important;\n            width: ').concat(e,"px !important;\n            height: ").concat(t,"px !important;\n            top: ").concat(r,"px !important;\n            left: ").concat(i,"px !important;\n          }\n        ")),()=>{document.head.removeChild(s)}},[n]),(0,r.jsx)(a,{isPresent:n,childRef:o,sizeRef:c,children:i.cloneElement(t,{ref:o})})}let d=e=>{let{children:t,initial:n,isPresent:s,onExitComplete:a,custom:d,presenceAffectsLayout:f,mode:h}=e,m=(0,o.M)(u),p=(0,i.useId)(),v=(0,i.useCallback)(e=>{for(let t of(m.set(e,!0),m.values()))if(!t)return;a&&a()},[m,a]),x=(0,i.useMemo)(()=>({id:p,initial:n,isPresent:s,custom:d,onExitComplete:v,register:e=>(m.set(e,!1),()=>m.delete(e))}),f?[Math.random(),v]:[s,v]);return(0,i.useMemo)(()=>{m.forEach((e,t)=>m.set(t,!1))},[s]),i.useEffect(()=>{s||m.size||!a||a()},[s]),"popLayout"===h&&(t=(0,r.jsx)(c,{isPresent:s,children:t})),(0,r.jsx)(l.t.Provider,{value:x,children:t})};function u(){return new Map}var f=n(64710),h=n(65749);let m=e=>e.key||"";function p(e){let t=[];return i.Children.forEach(e,e=>{(0,i.isValidElement)(e)&&t.push(e)}),t}var v=n(35403);let x=e=>{let{children:t,exitBeforeEnter:n,custom:l,initial:s=!0,onExitComplete:a,presenceAffectsLayout:c=!0,mode:u="sync"}=e;(0,h.V)(!n,"Replace exitBeforeEnter with mode='wait'");let x=(0,i.useMemo)(()=>p(t),[t]),b=x.map(m),y=(0,i.useRef)(!0),g=(0,i.useRef)(x),N=(0,o.M)(()=>new Map),[O,E]=(0,i.useState)(x),[w,I]=(0,i.useState)(x);(0,v.E)(()=>{y.current=!1,g.current=x;for(let e=0;e<w.length;e++){let t=m(w[e]);b.includes(t)?N.delete(t):!0!==N.get(t)&&N.set(t,!1)}},[w,b.length,b.join("-")]);let C=[];if(x!==O){let e=[...x];for(let t=0;t<w.length;t++){let n=w[t],r=m(n);b.includes(r)||(e.splice(t,0,n),C.push(n))}"wait"===u&&C.length&&(e=C),I(p(e)),E(x);return}let{forceRender:j}=(0,i.useContext)(f.L);return(0,r.jsx)(r.Fragment,{children:w.map(e=>{let t=m(e),n=x===w||b.includes(t);return(0,r.jsx)(d,{isPresent:n,initial:(!y.current||!!s)&&void 0,custom:n?void 0:l,presenceAffectsLayout:c,mode:u,onExitComplete:n?void 0:()=>{if(!N.has(t))return;N.set(t,!0);let e=!0;N.forEach(t=>{t||(e=!1)}),e&&(null==j||j(),I(g.current),a&&a())},children:e},t)})})}},93435:(e,t,n)=>{"use strict";n.d(t,{k5:()=>d});var r=n(12115),i={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},l=r.createContext&&r.createContext(i),o=["attr","size","title"];function s(){return(s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(this,arguments)}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach(function(t){var r,i;r=t,i=n[t],(r=function(e){var t=function(e,t){if("object"!=typeof e||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var r=n.call(e,t||"default");if("object"!=typeof r)return r;throw TypeError("@@toPrimitive must return a primitive value.")}return("string"===t?String:Number)(e)}(e,"string");return"symbol"==typeof t?t:t+""}(r))in e?Object.defineProperty(e,r,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[r]=i}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function d(e){return t=>r.createElement(u,s({attr:c({},e.attr)},t),function e(t){return t&&t.map((t,n)=>r.createElement(t.tag,c({key:n},t.attr),e(t.child)))}(e.child))}function u(e){var t=t=>{var n,{attr:i,size:l,title:a}=e,d=function(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n={};for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){if(t.indexOf(r)>=0)continue;n[r]=e[r]}return n}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(r=0;r<l.length;r++)n=l[r],!(t.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}(e,o),u=l||t.size||"1em";return t.className&&(n=t.className),e.className&&(n=(n?n+" ":"")+e.className),r.createElement("svg",s({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},t.attr,i,d,{className:n,style:c(c({color:e.color||t.color},t.style),e.style),height:u,width:u,xmlns:"http://www.w3.org/2000/svg"}),a&&r.createElement("title",null,a),e.children)};return void 0!==l?r.createElement(l.Consumer,null,e=>t(e)):t(i)}}}]);