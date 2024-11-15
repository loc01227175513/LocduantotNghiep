"use strict";exports.id=1637,exports.ids=[1637],exports.modules={83485:(e,t,n)=>{n.d(t,{D:()=>r});var r=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(r||{})},63998:(e,t,n)=>{n.d(t,{Z:()=>s});var r=n(58009),o=n(49164),i=n(37167),u=n(41320);function s({disabled:e=!1}={}){let t=(0,r.useRef)(null),[n,l]=(0,r.useState)(!1),a=(0,i.L)(),d=(0,u._)(()=>{t.current=null,l(!1),a.dispose()}),c=(0,u._)(e=>{if(a.dispose(),null===t.current){t.current=e.currentTarget,l(!0);{let n=(0,o.T)(e.currentTarget);a.addEventListener(n,"pointerup",d,!1),a.addEventListener(n,"pointermove",e=>{if(t.current){var n,r;let o,i;l((o=e.width/2,i=e.height/2,n={top:e.clientY-i,right:e.clientX+o,bottom:e.clientY+i,left:e.clientX-o},r=t.current.getBoundingClientRect(),!(!n||!r||n.right<r.left||n.left>r.right||n.bottom<r.top||n.top>r.bottom)))}},!1),a.addEventListener(n,"pointercancel",d,!1)}}});return{pressed:n,pressProps:e?{}:{onPointerDown:c,onPointerUp:d,onClick:d}}}},37167:(e,t,n)=>{n.d(t,{L:()=>i});var r=n(58009),o=n(5128);function i(){let[e]=(0,r.useState)(o.e);return e}},41320:(e,t,n)=>{n.d(t,{_:()=>i});var r=n(58009),o=n(78661);let i=function(e){let t=(0,o.Y)(e);return r.useCallback((...e)=>t.current(...e),[t])}},1734:(e,t,n)=>{n.d(t,{s:()=>i});var r=n(58009),o=n(27436);let i=(e,t)=>{o._.isServer?(0,r.useEffect)(e,t):(0,r.useLayoutEffect)(e,t)}},78661:(e,t,n)=>{n.d(t,{Y:()=>i});var r=n(58009),o=n(1734);function i(e){let t=(0,r.useRef)(e);return(0,o.s)(()=>{t.current=e},[e]),t}},49182:(e,t,n)=>{n.d(t,{c:()=>o});var r=n(58009);function o(e,t){return(0,r.useMemo)(()=>{var n;if(e.type)return e.type;let r=null!=(n=e.as)?n:"button";if("string"==typeof r&&"button"===r.toLowerCase()||(null==t?void 0:t.tagName)==="BUTTON"&&!t.hasAttribute("type"))return"button"},[e.type,e.as,t])}},20604:(e,t,n)=>{n.d(t,{P:()=>s,a:()=>u});var r=n(58009),o=n(41320);let i=Symbol();function u(e,t=!0){return Object.assign(e,{[i]:t})}function s(...e){let t=(0,r.useRef)(e),n=(0,o._)(e=>{for(let n of t.current)null!=n&&("function"==typeof n?n(e):n.current=e)});return e.every(e=>null==e||(null==e?void 0:e[i]))?void 0:n}},18430:(e,t,n)=>{n.d(t,{B:()=>d,p:()=>c});var r,o,i=n(58009),u=n(5128),s=n(37167),l=n(1734);"undefined"!=typeof process&&"undefined"!=typeof globalThis&&"undefined"!=typeof Element&&(null==(r=null==process?void 0:process.env)?void 0:r.NODE_ENV)==="test"&&void 0===(null==(o=null==Element?void 0:Element.prototype)?void 0:o.getAnimations)&&(Element.prototype.getAnimations=function(){return console.warn(["Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.","Please install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.","","Example usage:","```js","import { mockAnimationsApi } from 'jsdom-testing-mocks'","mockAnimationsApi()","```"].join(`
`)),[]});var a=(e=>(e[e.None=0]="None",e[e.Closed=1]="Closed",e[e.Enter=2]="Enter",e[e.Leave=4]="Leave",e))(a||{});function d(e){let t={};for(let n in e)!0===e[n]&&(t[`data-${n}`]="");return t}function c(e,t,n,r){let[o,a]=(0,i.useState)(n),{hasFlag:d,addFlag:c,removeFlag:f}=function(e=0){let[t,n]=(0,i.useState)(e),r=(0,i.useCallback)(e=>n(e),[t]),o=(0,i.useCallback)(e=>n(t=>t|e),[t]),u=(0,i.useCallback)(e=>(t&e)===e,[t]);return{flags:t,setFlag:r,addFlag:o,hasFlag:u,removeFlag:(0,i.useCallback)(e=>n(t=>t&~e),[n]),toggleFlag:(0,i.useCallback)(e=>n(t=>t^e),[n])}}(e&&o?3:0),p=(0,i.useRef)(!1),v=(0,i.useRef)(!1),m=(0,s.L)();return(0,l.s)(()=>{var o;if(e){if(n&&a(!0),!t){n&&c(3);return}return null==(o=null==r?void 0:r.start)||o.call(r,n),function(e,{prepare:t,run:n,done:r,inFlight:o}){let i=(0,u.e)();return function(e,{inFlight:t,prepare:n}){if(null!=t&&t.current){n();return}let r=e.style.transition;e.style.transition="none",n(),e.offsetHeight,e.style.transition=r}(e,{prepare:t,inFlight:o}),i.nextFrame(()=>{n(),i.requestAnimationFrame(()=>{i.add(function(e,t){var n,r;let o=(0,u.e)();if(!e)return o.dispose;let i=!1;o.add(()=>{i=!0});let s=null!=(r=null==(n=e.getAnimations)?void 0:n.call(e).filter(e=>e instanceof CSSTransition))?r:[];return 0===s.length?t():Promise.allSettled(s.map(e=>e.finished)).then(()=>{i||t()}),o.dispose}(e,r))})}),i.dispose}(t,{inFlight:p,prepare(){v.current?v.current=!1:v.current=p.current,p.current=!0,v.current||(n?(c(3),f(4)):(c(4),f(2)))},run(){v.current?n?(f(3),c(4)):(f(4),c(3)):n?f(1):c(1)},done(){var e;v.current&&"function"==typeof t.getAnimations&&t.getAnimations().length>0||(p.current=!1,f(7),n||a(!1),null==(e=null==r?void 0:r.end)||e.call(r,n))}})}},[e,n,t,m]),e?[o,{closed:d(1),enter:d(2),leave:d(4),transition:d(2)||d(4)}]:[n,{closed:void 0,enter:void 0,leave:void 0,transition:void 0}]}},94128:(e,t,n)=>{n.d(t,{$x:()=>l,El:()=>s,O_:()=>u,Uw:()=>i});var r=n(58009);let o=(0,r.createContext)(null);o.displayName="OpenClosedContext";var i=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(i||{});function u(){return(0,r.useContext)(o)}function s({value:e,children:t}){return r.createElement(o.Provider,{value:e},t)}function l({children:e}){return r.createElement(o.Provider,{value:null},e)}},14968:(e,t,n)=>{function r(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=(null==t?void 0:t.getAttribute("disabled"))==="";return!(r&&function(e){if(!e)return!1;let t=e.previousElementSibling;for(;null!==t;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}(n))&&r}n.d(t,{l:()=>r})},25562:(e,t,n)=>{n.d(t,{x:()=>r});function r(...e){return Array.from(new Set(e.flatMap(e=>"string"==typeof e?e.split(" "):[]))).filter(Boolean).join(" ")}},5128:(e,t,n)=>{n.d(t,{e:()=>function e(){let t=[],n={addEventListener:(e,t,r,o)=>(e.addEventListener(t,r,o),n.add(()=>e.removeEventListener(t,r,o))),requestAnimationFrame(...e){let t=requestAnimationFrame(...e);return n.add(()=>cancelAnimationFrame(t))},nextFrame:(...e)=>n.requestAnimationFrame(()=>n.requestAnimationFrame(...e)),setTimeout(...e){let t=setTimeout(...e);return n.add(()=>clearTimeout(t))},microTask(...e){let t={current:!0};return(0,r._)(()=>{t.current&&e[0]()}),n.add(()=>{t.current=!1})},style(e,t,n){let r=e.style.getPropertyValue(t);return Object.assign(e.style,{[t]:n}),this.add(()=>{Object.assign(e.style,{[t]:r})})},group(t){let n=e();return t(n),this.add(()=>n.dispose())},add:e=>(t.includes(e)||t.push(e),()=>{let n=t.indexOf(e);if(n>=0)for(let e of t.splice(n,1))e()}),dispose(){for(let e of t.splice(0))e()}};return n}});var r=n(13421)},27436:(e,t,n)=>{n.d(t,{_:()=>s});var r=Object.defineProperty,o=(e,t,n)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,i=(e,t,n)=>(o(e,"symbol"!=typeof t?t+"":t,n),n);class u{constructor(){i(this,"current",this.detect()),i(this,"handoffState","pending"),i(this,"currentId",0)}set(e){this.current!==e&&(this.handoffState="pending",this.currentId=0,this.current=e)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return"server"===this.current}get isClient(){return"client"===this.current}detect(){return"server"}handoff(){"pending"===this.handoffState&&(this.handoffState="complete")}get isHandoffComplete(){return"complete"===this.handoffState}}let s=new u},80070:(e,t,n)=>{n.d(t,{Y:()=>r});function r(e,t,...n){if(e in t){let r=t[e];return"function"==typeof r?r(...n):r}let o=Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map(e=>`"${e}"`).join(", ")}.`);throw Error.captureStackTrace&&Error.captureStackTrace(o,r),o}},13421:(e,t,n)=>{n.d(t,{_:()=>r});function r(e){"function"==typeof queueMicrotask?queueMicrotask(e):Promise.resolve().then(e).catch(e=>setTimeout(()=>{throw e}))}},49164:(e,t,n)=>{n.d(t,{T:()=>o});var r=n(27436);function o(e){return r._.isServer?null:e instanceof Node?e.ownerDocument:null!=e&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}},71139:(e,t,n)=>{n.d(t,{Ac:()=>u,Ci:()=>l,FX:()=>p,mK:()=>s,oE:()=>v,v6:()=>f});var r=n(58009),o=n(25562),i=n(80070),u=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(u||{}),s=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(s||{});function l(){let e,t;let n=(e=(0,r.useRef)([]),t=(0,r.useCallback)(t=>{for(let n of e.current)null!=n&&("function"==typeof n?n(t):n.current=t)},[]),(...n)=>{if(!n.every(e=>null==e))return e.current=n,t});return(0,r.useCallback)(e=>(function({ourProps:e,theirProps:t,slot:n,defaultTag:r,features:o,visible:u=!0,name:s,mergeRefs:l}){l=null!=l?l:d;let f=c(t,e);if(u)return a(f,n,r,s,l);let p=null!=o?o:0;if(2&p){let{static:e=!1,...t}=f;if(e)return a(t,n,r,s,l)}if(1&p){let{unmount:e=!0,...t}=f;return(0,i.Y)(e?0:1,{0:()=>null,1:()=>a({...t,hidden:!0,style:{display:"none"}},n,r,s,l)})}return a(f,n,r,s,l)})({mergeRefs:n,...e}),[n])}function a(e,t={},n,i,u){let{as:s=n,children:l,refName:d="ref",...f}=m(e,["unmount","static"]),p=void 0!==e.ref?{[d]:e.ref}:{},g="function"==typeof l?l(t):l;"className"in f&&f.className&&"function"==typeof f.className&&(f.className=f.className(t)),f["aria-labelledby"]&&f["aria-labelledby"]===f.id&&(f["aria-labelledby"]=void 0);let h={};if(t){let e=!1,n=[];for(let[r,o]of Object.entries(t))"boolean"==typeof o&&(e=!0),!0===o&&n.push(r.replace(/([A-Z])/g,e=>`-${e.toLowerCase()}`));if(e)for(let e of(h["data-headlessui-state"]=n.join(" "),n))h[`data-${e}`]=""}if(s===r.Fragment&&(Object.keys(v(f)).length>0||Object.keys(v(h)).length>0)){if(!(0,r.isValidElement)(g)||Array.isArray(g)&&g.length>1){if(Object.keys(v(f)).length>0)throw Error(['Passing props on "Fragment"!',"",`The current component <${i} /> is rendering a "Fragment".`,"However we need to passthrough the following props:",Object.keys(v(f)).concat(Object.keys(v(h))).map(e=>`  - ${e}`).join(`
`),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(e=>`  - ${e}`).join(`
`)].join(`
`))}else{let e=g.props,t=null==e?void 0:e.className,n="function"==typeof t?(...e)=>(0,o.x)(t(...e),f.className):(0,o.x)(t,f.className),i=c(g.props,v(m(f,["ref"])));for(let e in h)e in i&&delete h[e];return(0,r.cloneElement)(g,Object.assign({},i,h,p,{ref:u(r.version.split(".")[0]>="19"?g.props.ref:g.ref,p.ref)},n?{className:n}:{}))}}return(0,r.createElement)(s,Object.assign({},m(f,["ref"]),s!==r.Fragment&&p,s!==r.Fragment&&h),g)}function d(...e){return e.every(e=>null==e)?void 0:t=>{for(let n of e)null!=n&&("function"==typeof n?n(t):n.current=t)}}function c(...e){if(0===e.length)return{};if(1===e.length)return e[0];let t={},n={};for(let r of e)for(let e in r)e.startsWith("on")&&"function"==typeof r[e]?(null!=n[e]||(n[e]=[]),n[e].push(r[e])):t[e]=r[e];if(t.disabled||t["aria-disabled"])for(let e in n)/^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(e)&&(n[e]=[e=>{var t;return null==(t=null==e?void 0:e.preventDefault)?void 0:t.call(e)}]);for(let e in n)Object.assign(t,{[e](t,...r){for(let o of n[e]){if((t instanceof Event||(null==t?void 0:t.nativeEvent)instanceof Event)&&t.defaultPrevented)return;o(t,...r)}}});return t}function f(...e){if(0===e.length)return{};if(1===e.length)return e[0];let t={},n={};for(let r of e)for(let e in r)e.startsWith("on")&&"function"==typeof r[e]?(null!=n[e]||(n[e]=[]),n[e].push(r[e])):t[e]=r[e];for(let e in n)Object.assign(t,{[e](...t){for(let r of n[e])null==r||r(...t)}});return t}function p(e){var t;return Object.assign((0,r.forwardRef)(e),{displayName:null!=(t=e.displayName)?t:e.name})}function v(e){let t=Object.assign({},e);for(let e in t)void 0===t[e]&&delete t[e];return t}function m(e,t=[]){let n=Object.assign({},e);for(let e of t)e in n&&delete n[e];return n}},69983:(e,t,n)=>{function r(e){var t;return"undefined"!=typeof window&&null!=window.navigator&&((null===(t=window.navigator.userAgentData)||void 0===t?void 0:t.brands.some(t=>e.test(t.brand)))||e.test(window.navigator.userAgent))}function o(e){var t;return"undefined"!=typeof window&&null!=window.navigator&&e.test((null===(t=window.navigator.userAgentData)||void 0===t?void 0:t.platform)||window.navigator.platform)}function i(e){let t=null;return()=>(null==t&&(t=e()),t)}n.d(t,{o:()=>D});let u=i(function(){return o(/^Mac/i)}),s=i(function(){return o(/^iPhone/i)}),l=i(function(){return o(/^iPad/i)||u()&&navigator.maxTouchPoints>1}),a=i(function(){return s()||l()});i(function(){return u()||a()}),i(function(){return r(/AppleWebKit/i)&&!d()});let d=i(function(){return r(/Chrome/i)}),c=i(function(){return r(/Android/i)});i(function(){return r(/Firefox/i)});let f=e=>{var t;return null!==(t=null==e?void 0:e.ownerDocument)&&void 0!==t?t:document},p=e=>e&&"window"in e&&e.window===e?e:f(e).defaultView||window;var v=n(58009);let m=null,g=new Set,h=new Map,E=!1,b=!1,y={Tab:!0,Escape:!0};function w(e,t){for(let n of g)n(e,t)}function T(e){E=!0,e.metaKey||!u()&&e.altKey||e.ctrlKey||"Control"===e.key||"Shift"===e.key||"Meta"===e.key||(m="keyboard",w("keyboard",e))}function L(e){m="pointer",("mousedown"===e.type||"pointerdown"===e.type)&&(E=!0,w("pointer",e))}function F(e){(0===e.mozInputSource&&e.isTrusted||(c()&&e.pointerType?"click"===e.type&&1===e.buttons:0===e.detail&&!e.pointerType))&&(E=!0,m="virtual")}function P(e){e.target!==window&&e.target!==document&&(E||b||(m="virtual",w("virtual",e)),E=!1,b=!1)}function k(){E=!1,b=!0}function C(e){if("undefined"==typeof window||h.get(p(e)))return;let t=p(e),n=f(e),r=t.HTMLElement.prototype.focus;t.HTMLElement.prototype.focus=function(){E=!0,r.apply(this,arguments)},n.addEventListener("keydown",T,!0),n.addEventListener("keyup",T,!0),n.addEventListener("click",F,!0),t.addEventListener("focus",P,!0),t.addEventListener("blur",k,!1),"undefined"!=typeof PointerEvent?(n.addEventListener("pointerdown",L,!0),n.addEventListener("pointermove",L,!0),n.addEventListener("pointerup",L,!0)):(n.addEventListener("mousedown",L,!0),n.addEventListener("mousemove",L,!0),n.addEventListener("mouseup",L,!0)),t.addEventListener("beforeunload",()=>{S(e)},{once:!0}),h.set(t,{focus:r})}let S=(e,t)=>{let n=p(e),r=f(e);t&&r.removeEventListener("DOMContentLoaded",t),h.has(n)&&(n.HTMLElement.prototype.focus=h.get(n).focus,r.removeEventListener("keydown",T,!0),r.removeEventListener("keyup",T,!0),r.removeEventListener("click",F,!0),n.removeEventListener("focus",P,!0),n.removeEventListener("blur",k,!1),"undefined"!=typeof PointerEvent?(r.removeEventListener("pointerdown",L,!0),r.removeEventListener("pointermove",L,!0),r.removeEventListener("pointerup",L,!0)):(r.removeEventListener("mousedown",L,!0),r.removeEventListener("mousemove",L,!0),r.removeEventListener("mouseup",L,!0)),h.delete(n))};function A(){return"pointer"!==m}"undefined"!=typeof document&&function(e){let t;let n=f(void 0);"loading"!==n.readyState?C(void 0):(t=()=>{C(void 0)},n.addEventListener("DOMContentLoaded",t)),()=>S(e,t)}();let H=new Set(["checkbox","radio","range","color","file","image","button","submit","reset"]),M="undefined"!=typeof document?v.useLayoutEffect:()=>{};class O{isDefaultPrevented(){return this.nativeEvent.defaultPrevented}preventDefault(){this.defaultPrevented=!0,this.nativeEvent.preventDefault()}stopPropagation(){this.nativeEvent.stopPropagation(),this.isPropagationStopped=()=>!0}isPropagationStopped(){return!1}persist(){}constructor(e,t){this.nativeEvent=t,this.target=t.target,this.currentTarget=t.currentTarget,this.relatedTarget=t.relatedTarget,this.bubbles=t.bubbles,this.cancelable=t.cancelable,this.defaultPrevented=t.defaultPrevented,this.eventPhase=t.eventPhase,this.isTrusted=t.isTrusted,this.timeStamp=t.timeStamp,this.type=e}}function j(e){let t=(0,v.useRef)({isFocused:!1,observer:null});M(()=>{let e=t.current;return()=>{e.observer&&(e.observer.disconnect(),e.observer=null)}},[]);let n=function(e){let t=(0,v.useRef)(null);return M(()=>{t.current=e},[e]),(0,v.useCallback)((...e)=>{let n=t.current;return null==n?void 0:n(...e)},[])}(t=>{null==e||e(t)});return(0,v.useCallback)(e=>{if(e.target instanceof HTMLButtonElement||e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||e.target instanceof HTMLSelectElement){t.current.isFocused=!0;let r=e.target;r.addEventListener("focusout",e=>{t.current.isFocused=!1,r.disabled&&n(new O("blur",e)),t.current.observer&&(t.current.observer.disconnect(),t.current.observer=null)},{once:!0}),t.current.observer=new MutationObserver(()=>{if(t.current.isFocused&&r.disabled){var e;null===(e=t.current.observer)||void 0===e||e.disconnect();let n=r===document.activeElement?null:document.activeElement;r.dispatchEvent(new FocusEvent("blur",{relatedTarget:n})),r.dispatchEvent(new FocusEvent("focusout",{bubbles:!0,relatedTarget:n}))}}),t.current.observer.observe(r,{attributes:!0,attributeFilter:["disabled"]})}},[n])}function D(e={}){var t,n,r;let{autoFocus:o=!1,isTextInput:i,within:u}=e,s=(0,v.useRef)({isFocused:!1,isFocusVisible:o||A()}),[l,a]=(0,v.useState)(!1),[d,c]=(0,v.useState)(()=>s.current.isFocused&&s.current.isFocusVisible),m=(0,v.useCallback)(()=>c(s.current.isFocused&&s.current.isFocusVisible),[]),h=(0,v.useCallback)(e=>{s.current.isFocused=e,a(e),m()},[m]);t=e=>{s.current.isFocusVisible=e,m()},n=[],r={isTextInput:i},C(),(0,v.useEffect)(()=>{let e=(e,n)=>{(function(e,t,n){var r;let o="undefined"!=typeof window?p(null==n?void 0:n.target).HTMLInputElement:HTMLInputElement,i="undefined"!=typeof window?p(null==n?void 0:n.target).HTMLTextAreaElement:HTMLTextAreaElement,u="undefined"!=typeof window?p(null==n?void 0:n.target).HTMLElement:HTMLElement,s="undefined"!=typeof window?p(null==n?void 0:n.target).KeyboardEvent:KeyboardEvent;return!((e=e||(null==n?void 0:n.target)instanceof o&&!H.has(null==n?void 0:null===(r=n.target)||void 0===r?void 0:r.type)||(null==n?void 0:n.target)instanceof i||(null==n?void 0:n.target)instanceof u&&(null==n?void 0:n.target.isContentEditable))&&"keyboard"===t&&n instanceof s&&!y[n.key])})(!!(null==r?void 0:r.isTextInput),e,n)&&t(A())};return g.add(e),()=>{g.delete(e)}},n);let{focusProps:E}=function(e){let{isDisabled:t,onFocus:n,onBlur:r,onFocusChange:o}=e,i=(0,v.useCallback)(e=>{if(e.target===e.currentTarget)return r&&r(e),o&&o(!1),!0},[r,o]),u=j(i),s=(0,v.useCallback)(e=>{let t=f(e.target);e.target===e.currentTarget&&t.activeElement===e.target&&(n&&n(e),o&&o(!0),u(e))},[o,n,u]);return{focusProps:{onFocus:!t&&(n||o||r)?s:void 0,onBlur:!t&&(r||o)?i:void 0}}}({isDisabled:u,onFocusChange:h}),{focusWithinProps:b}=function(e){let{isDisabled:t,onBlurWithin:n,onFocusWithin:r,onFocusWithinChange:o}=e,i=(0,v.useRef)({isFocusWithin:!1}),u=(0,v.useCallback)(e=>{i.current.isFocusWithin&&!e.currentTarget.contains(e.relatedTarget)&&(i.current.isFocusWithin=!1,n&&n(e),o&&o(!1))},[n,o,i]),s=j(u),l=(0,v.useCallback)(e=>{i.current.isFocusWithin||document.activeElement!==e.target||(r&&r(e),o&&o(!0),i.current.isFocusWithin=!0,s(e))},[r,o,s]);return t?{focusWithinProps:{onFocus:void 0,onBlur:void 0}}:{focusWithinProps:{onFocus:l,onBlur:u}}}({isDisabled:!u,onFocusWithinChange:h});return{isFocused:l,isFocusVisible:d,focusProps:u?b:E}}},78619:(e,t,n)=>{n.d(t,{M:()=>a});var r=n(58009);let o=!1,i=0;function u(){o=!0,setTimeout(()=>{o=!1},50)}function s(e){"touch"===e.pointerType&&u()}function l(){if("undefined"!=typeof document)return"undefined"!=typeof PointerEvent?document.addEventListener("pointerup",s):document.addEventListener("touchend",u),i++,()=>{--i>0||("undefined"!=typeof PointerEvent?document.removeEventListener("pointerup",s):document.removeEventListener("touchend",u))}}function a(e){let{onHoverStart:t,onHoverChange:n,onHoverEnd:i,isDisabled:u}=e,[s,a]=(0,r.useState)(!1),d=(0,r.useRef)({isHovered:!1,ignoreEmulatedMouseEvents:!1,pointerType:"",target:null}).current;(0,r.useEffect)(l,[]);let{hoverProps:c,triggerHoverEnd:f}=(0,r.useMemo)(()=>{let e=(e,r)=>{if(d.pointerType=r,u||"touch"===r||d.isHovered||!e.currentTarget.contains(e.target))return;d.isHovered=!0;let o=e.currentTarget;d.target=o,t&&t({type:"hoverstart",target:o,pointerType:r}),n&&n(!0),a(!0)},r=(e,t)=>{if(d.pointerType="",d.target=null,"touch"===t||!d.isHovered)return;d.isHovered=!1;let r=e.currentTarget;i&&i({type:"hoverend",target:r,pointerType:t}),n&&n(!1),a(!1)},s={};return"undefined"!=typeof PointerEvent?(s.onPointerEnter=t=>{o&&"mouse"===t.pointerType||e(t,t.pointerType)},s.onPointerLeave=e=>{!u&&e.currentTarget.contains(e.target)&&r(e,e.pointerType)}):(s.onTouchStart=()=>{d.ignoreEmulatedMouseEvents=!0},s.onMouseEnter=t=>{d.ignoreEmulatedMouseEvents||o||e(t,"mouse"),d.ignoreEmulatedMouseEvents=!1},s.onMouseLeave=e=>{!u&&e.currentTarget.contains(e.target)&&r(e,"mouse")}),{hoverProps:s,triggerHoverEnd:r}},[t,n,i,u,d]);return(0,r.useEffect)(()=>{u&&f({currentTarget:d.target},d.pointerType)},[u]),{hoverProps:c,isHovered:s}}}};