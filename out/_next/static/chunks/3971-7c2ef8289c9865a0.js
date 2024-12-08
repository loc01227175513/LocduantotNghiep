"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3971],{9257:(e,t,n)=>{n.d(t,{D:()=>r});var r=(e=>(e.Space=" ",e.Enter="Enter",e.Escape="Escape",e.Backspace="Backspace",e.Delete="Delete",e.ArrowLeft="ArrowLeft",e.ArrowUp="ArrowUp",e.ArrowRight="ArrowRight",e.ArrowDown="ArrowDown",e.Home="Home",e.End="End",e.PageUp="PageUp",e.PageDown="PageDown",e.Tab="Tab",e))(r||{})},81292:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(12115),o=n(42572),i=n(36271),u=n(44608);function a(){let{disabled:e=!1}=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=(0,r.useRef)(null),[n,a]=(0,r.useState)(!1),l=(0,i.L)(),s=(0,u._)(()=>{t.current=null,a(!1),l.dispose()}),c=(0,u._)(e=>{if(l.dispose(),null===t.current){t.current=e.currentTarget,a(!0);{let n=(0,o.T)(e.currentTarget);l.addEventListener(n,"pointerup",s,!1),l.addEventListener(n,"pointermove",e=>{if(t.current){var n,r;let o,i;a((o=e.width/2,i=e.height/2,n={top:e.clientY-i,right:e.clientX+o,bottom:e.clientY+i,left:e.clientX-o},r=t.current.getBoundingClientRect(),!(!n||!r||n.right<r.left||n.left>r.right||n.bottom<r.top||n.top>r.bottom)))}},!1),l.addEventListener(n,"pointercancel",s,!1)}}});return{pressed:n,pressProps:e?{}:{onPointerDown:c,onPointerUp:s,onClick:s}}}},36271:(e,t,n)=>{n.d(t,{L:()=>i});var r=n(12115),o=n(50772);function i(){let[e]=(0,r.useState)(o.e);return(0,r.useEffect)(()=>()=>e.dispose(),[e]),e}},44608:(e,t,n)=>{n.d(t,{_:()=>i});var r=n(12115),o=n(61743);let i=function(e){let t=(0,o.Y)(e);return r.useCallback(function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return t.current(...n)},[t])}},68840:(e,t,n)=>{n.d(t,{s:()=>i});var r=n(12115),o=n(50468);let i=(e,t)=>{o._.isServer?(0,r.useEffect)(e,t):(0,r.useLayoutEffect)(e,t)}},61743:(e,t,n)=>{n.d(t,{Y:()=>i});var r=n(12115),o=n(68840);function i(e){let t=(0,r.useRef)(e);return(0,o.s)(()=>{t.current=e},[e]),t}},79026:(e,t,n)=>{n.d(t,{c:()=>o});var r=n(12115);function o(e,t){return(0,r.useMemo)(()=>{var n;if(e.type)return e.type;let r=null!=(n=e.as)?n:"button";if("string"==typeof r&&"button"===r.toLowerCase()||(null==t?void 0:t.tagName)==="BUTTON"&&!t.hasAttribute("type"))return"button"},[e.type,e.as,t])}},3256:(e,t,n)=>{n.d(t,{P:()=>a,a:()=>u});var r=n(12115),o=n(44608);let i=Symbol();function u(e){let t=!(arguments.length>1)||void 0===arguments[1]||arguments[1];return Object.assign(e,{[i]:t})}function a(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];let u=(0,r.useRef)(t);(0,r.useEffect)(()=>{u.current=t},[t]);let a=(0,o._)(e=>{for(let t of u.current)null!=t&&("function"==typeof t?t(e):t.current=e)});return t.every(e=>null==e||(null==e?void 0:e[i]))?void 0:a}},80760:(e,t,n)=>{n.d(t,{B:()=>d,p:()=>f});var r,o,i=n(12115),u=n(50772),a=n(36271),l=n(68840),s=n(2818);void 0!==s&&"undefined"!=typeof globalThis&&"undefined"!=typeof Element&&(null==(r=null==s?void 0:s.env)?void 0:r.NODE_ENV)==="test"&&void 0===(null==(o=null==Element?void 0:Element.prototype)?void 0:o.getAnimations)&&(Element.prototype.getAnimations=function(){return console.warn("Headless UI has polyfilled `Element.prototype.getAnimations` for your tests.\nPlease install a proper polyfill e.g. `jsdom-testing-mocks`, to silence these warnings.\n\nExample usage:\n```js\nimport { mockAnimationsApi } from 'jsdom-testing-mocks'\nmockAnimationsApi()\n```"),[]});var c=(e=>(e[e.None=0]="None",e[e.Closed=1]="Closed",e[e.Enter=2]="Enter",e[e.Leave=4]="Leave",e))(c||{});function d(e){let t={};for(let n in e)!0===e[n]&&(t["data-".concat(n)]="");return t}function f(e,t,n,r){let[o,s]=(0,i.useState)(n),{hasFlag:c,addFlag:d,removeFlag:f}=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0,[t,n]=(0,i.useState)(e),r=(0,i.useCallback)(e=>n(e),[t]),o=(0,i.useCallback)(e=>n(t=>t|e),[t]),u=(0,i.useCallback)(e=>(t&e)===e,[t]);return{flags:t,setFlag:r,addFlag:o,hasFlag:u,removeFlag:(0,i.useCallback)(e=>n(t=>t&~e),[n]),toggleFlag:(0,i.useCallback)(e=>n(t=>t^e),[n])}}(e&&o?3:0),v=(0,i.useRef)(!1),p=(0,i.useRef)(!1),g=(0,a.L)();return(0,l.s)(()=>{var o;if(e){if(n&&s(!0),!t){n&&d(3);return}return null==(o=null==r?void 0:r.start)||o.call(r,n),function(e,t){let{prepare:n,run:r,done:o,inFlight:i}=t,a=(0,u.e)();return function(e,t){let{inFlight:n,prepare:r}=t;if(null!=n&&n.current){r();return}let o=e.style.transition;e.style.transition="none",r(),e.offsetHeight,e.style.transition=o}(e,{prepare:n,inFlight:i}),a.nextFrame(()=>{r(),a.requestAnimationFrame(()=>{a.add(function(e,t){var n,r;let o=(0,u.e)();if(!e)return o.dispose;let i=!1;o.add(()=>{i=!0});let a=null!=(r=null==(n=e.getAnimations)?void 0:n.call(e).filter(e=>e instanceof CSSTransition))?r:[];return 0===a.length?t():Promise.allSettled(a.map(e=>e.finished)).then(()=>{i||t()}),o.dispose}(e,o))})}),a.dispose}(t,{inFlight:v,prepare(){p.current?p.current=!1:p.current=v.current,v.current=!0,p.current||(n?(d(3),f(4)):(d(4),f(2)))},run(){p.current?n?(f(3),d(4)):(f(4),d(3)):n?f(1):d(1)},done(){var e;p.current&&"function"==typeof t.getAnimations&&t.getAnimations().length>0||(v.current=!1,f(7),n||s(!1),null==(e=null==r?void 0:r.end)||e.call(r,n))}})}},[e,n,t,g]),e?[o,{closed:c(1),enter:c(2),leave:c(4),transition:c(2)||c(4)}]:[n,{closed:void 0,enter:void 0,leave:void 0,transition:void 0}]}},64254:(e,t,n)=>{n.d(t,{$x:()=>l,El:()=>a,O_:()=>u,Uw:()=>i});var r=n(12115);let o=(0,r.createContext)(null);o.displayName="OpenClosedContext";var i=(e=>(e[e.Open=1]="Open",e[e.Closed=2]="Closed",e[e.Closing=4]="Closing",e[e.Opening=8]="Opening",e))(i||{});function u(){return(0,r.useContext)(o)}function a(e){let{value:t,children:n}=e;return r.createElement(o.Provider,{value:t},n)}function l(e){let{children:t}=e;return r.createElement(o.Provider,{value:null},t)}},73854:(e,t,n)=>{function r(e){let t=e.parentElement,n=null;for(;t&&!(t instanceof HTMLFieldSetElement);)t instanceof HTMLLegendElement&&(n=t),t=t.parentElement;let r=(null==t?void 0:t.getAttribute("disabled"))==="";return!(r&&function(e){if(!e)return!1;let t=e.previousElementSibling;for(;null!==t;){if(t instanceof HTMLLegendElement)return!1;t=t.previousElementSibling}return!0}(n))&&r}n.d(t,{l:()=>r})},35802:(e,t,n)=>{n.d(t,{x:()=>r});function r(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return Array.from(new Set(t.flatMap(e=>"string"==typeof e?e.split(" "):[]))).filter(Boolean).join(" ")}},50772:(e,t,n)=>{n.d(t,{e:()=>function e(){let t=[],n={addEventListener:(e,t,r,o)=>(e.addEventListener(t,r,o),n.add(()=>e.removeEventListener(t,r,o))),requestAnimationFrame(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];let o=requestAnimationFrame(...t);return n.add(()=>cancelAnimationFrame(o))},nextFrame(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];return n.requestAnimationFrame(()=>n.requestAnimationFrame(...t))},setTimeout(){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];let o=setTimeout(...t);return n.add(()=>clearTimeout(o))},microTask(){for(var e=arguments.length,t=Array(e),o=0;o<e;o++)t[o]=arguments[o];let i={current:!0};return(0,r._)(()=>{i.current&&t[0]()}),n.add(()=>{i.current=!1})},style(e,t,n){let r=e.style.getPropertyValue(t);return Object.assign(e.style,{[t]:n}),this.add(()=>{Object.assign(e.style,{[t]:r})})},group(t){let n=e();return t(n),this.add(()=>n.dispose())},add:e=>(t.includes(e)||t.push(e),()=>{let n=t.indexOf(e);if(n>=0)for(let e of t.splice(n,1))e()}),dispose(){for(let e of t.splice(0))e()}};return n}});var r=n(12159)},50468:(e,t,n)=>{n.d(t,{_:()=>a});var r=Object.defineProperty,o=(e,t,n)=>t in e?r(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n,i=(e,t,n)=>(o(e,"symbol"!=typeof t?t+"":t,n),n);class u{set(e){this.current!==e&&(this.handoffState="pending",this.currentId=0,this.current=e)}reset(){this.set(this.detect())}nextId(){return++this.currentId}get isServer(){return"server"===this.current}get isClient(){return"client"===this.current}detect(){return"undefined"==typeof window||"undefined"==typeof document?"server":"client"}handoff(){"pending"===this.handoffState&&(this.handoffState="complete")}get isHandoffComplete(){return"complete"===this.handoffState}constructor(){i(this,"current",this.detect()),i(this,"handoffState","pending"),i(this,"currentId",0)}}let a=new u},93270:(e,t,n)=>{n.d(t,{Y:()=>r});function r(e,t){for(var n=arguments.length,o=Array(n>2?n-2:0),i=2;i<n;i++)o[i-2]=arguments[i];if(e in t){let n=t[e];return"function"==typeof n?n(...o):n}let u=Error('Tried to handle "'.concat(e,'" but there is no handler defined. Only defined handlers are: ').concat(Object.keys(t).map(e=>'"'.concat(e,'"')).join(", "),"."));throw Error.captureStackTrace&&Error.captureStackTrace(u,r),u}},12159:(e,t,n)=>{n.d(t,{_:()=>r});function r(e){"function"==typeof queueMicrotask?queueMicrotask(e):Promise.resolve().then(e).catch(e=>setTimeout(()=>{throw e}))}},42572:(e,t,n)=>{n.d(t,{T:()=>o});var r=n(50468);function o(e){return r._.isServer?null:e instanceof Node?e.ownerDocument:null!=e&&e.hasOwnProperty("current")&&e.current instanceof Node?e.current.ownerDocument:document}},63593:(e,t,n)=>{n.d(t,{Ac:()=>u,Ci:()=>l,FX:()=>v,mK:()=>a,oE:()=>p,v6:()=>f});var r=n(12115),o=n(35802),i=n(93270),u=(e=>(e[e.None=0]="None",e[e.RenderStrategy=1]="RenderStrategy",e[e.Static=2]="Static",e))(u||{}),a=(e=>(e[e.Unmount=0]="Unmount",e[e.Hidden=1]="Hidden",e))(a||{});function l(){let e,t;let n=(e=(0,r.useRef)([]),t=(0,r.useCallback)(t=>{for(let n of e.current)null!=n&&("function"==typeof n?n(t):n.current=t)},[]),function(){for(var n=arguments.length,r=Array(n),o=0;o<n;o++)r[o]=arguments[o];if(!r.every(e=>null==e))return e.current=r,t});return(0,r.useCallback)(e=>(function(e){let{ourProps:t,theirProps:n,slot:r,defaultTag:o,features:u,visible:a=!0,name:l,mergeRefs:f}=e;f=null!=f?f:c;let v=d(n,t);if(a)return s(v,r,o,l,f);let p=null!=u?u:0;if(2&p){let{static:e=!1,...t}=v;if(e)return s(t,r,o,l,f)}if(1&p){let{unmount:e=!0,...t}=v;return(0,i.Y)(e?0:1,{0:()=>null,1:()=>s({...t,hidden:!0,style:{display:"none"}},r,o,l,f)})}return s(v,r,o,l,f)})({mergeRefs:n,...e}),[n])}function s(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=arguments.length>2?arguments[2]:void 0,i=arguments.length>3?arguments[3]:void 0,u=arguments.length>4?arguments[4]:void 0,{as:a=n,children:l,refName:s="ref",...c}=g(e,["unmount","static"]),f=void 0!==e.ref?{[s]:e.ref}:{},v="function"==typeof l?l(t):l;"className"in c&&c.className&&"function"==typeof c.className&&(c.className=c.className(t)),c["aria-labelledby"]&&c["aria-labelledby"]===c.id&&(c["aria-labelledby"]=void 0);let m={};if(t){let e=!1,n=[];for(let[r,o]of Object.entries(t))"boolean"==typeof o&&(e=!0),!0===o&&n.push(r.replace(/([A-Z])/g,e=>"-".concat(e.toLowerCase())));if(e)for(let e of(m["data-headlessui-state"]=n.join(" "),n))m["data-".concat(e)]=""}if(a===r.Fragment&&(Object.keys(p(c)).length>0||Object.keys(p(m)).length>0)){if(!(0,r.isValidElement)(v)||Array.isArray(v)&&v.length>1){if(Object.keys(p(c)).length>0)throw Error(['Passing props on "Fragment"!',"","The current component <".concat(i,' /> is rendering a "Fragment".'),"However we need to passthrough the following props:",Object.keys(p(c)).concat(Object.keys(p(m))).map(e=>"  - ".concat(e)).join("\n"),"","You can apply a few solutions:",['Add an `as="..."` prop, to ensure that we render an actual element instead of a "Fragment".',"Render a single element as the child so that we can forward the props onto that element."].map(e=>"  - ".concat(e)).join("\n")].join("\n"))}else{let e=v.props,t=null==e?void 0:e.className,n="function"==typeof t?function(){for(var e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];return(0,o.x)(t(...n),c.className)}:(0,o.x)(t,c.className),i=d(v.props,p(g(c,["ref"])));for(let e in m)e in i&&delete m[e];return(0,r.cloneElement)(v,Object.assign({},i,m,f,{ref:u(r.version.split(".")[0]>="19"?v.props.ref:v.ref,f.ref)},n?{className:n}:{}))}}return(0,r.createElement)(a,Object.assign({},g(c,["ref"]),a!==r.Fragment&&f,a!==r.Fragment&&m),v)}function c(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];return t.every(e=>null==e)?void 0:e=>{for(let n of t)null!=n&&("function"==typeof n?n(e):n.current=e)}}function d(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];if(0===t.length)return{};if(1===t.length)return t[0];let r={},o={};for(let e of t)for(let t in e)t.startsWith("on")&&"function"==typeof e[t]?(null!=o[t]||(o[t]=[]),o[t].push(e[t])):r[t]=e[t];if(r.disabled||r["aria-disabled"])for(let e in o)/^(on(?:Click|Pointer|Mouse|Key)(?:Down|Up|Press)?)$/.test(e)&&(o[e]=[e=>{var t;return null==(t=null==e?void 0:e.preventDefault)?void 0:t.call(e)}]);for(let e in o)Object.assign(r,{[e](t){for(var n=arguments.length,r=Array(n>1?n-1:0),i=1;i<n;i++)r[i-1]=arguments[i];for(let n of o[e]){if((t instanceof Event||(null==t?void 0:t.nativeEvent)instanceof Event)&&t.defaultPrevented)return;n(t,...r)}}});return r}function f(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];if(0===t.length)return{};if(1===t.length)return t[0];let r={},o={};for(let e of t)for(let t in e)t.startsWith("on")&&"function"==typeof e[t]?(null!=o[t]||(o[t]=[]),o[t].push(e[t])):r[t]=e[t];for(let e in o)Object.assign(r,{[e](){for(var t=arguments.length,n=Array(t),r=0;r<t;r++)n[r]=arguments[r];for(let t of o[e])null==t||t(...n)}});return r}function v(e){var t;return Object.assign((0,r.forwardRef)(e),{displayName:null!=(t=e.displayName)?t:e.name})}function p(e){let t=Object.assign({},e);for(let e in t)void 0===t[e]&&delete t[e];return t}function g(e){let t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[],n=Object.assign({},e);for(let e of t)e in n&&delete n[e];return n}},60289:(e,t,n)=>{function r(e){var t;return"undefined"!=typeof window&&null!=window.navigator&&((null===(t=window.navigator.userAgentData)||void 0===t?void 0:t.brands.some(t=>e.test(t.brand)))||e.test(window.navigator.userAgent))}function o(e){var t;return"undefined"!=typeof window&&null!=window.navigator&&e.test((null===(t=window.navigator.userAgentData)||void 0===t?void 0:t.platform)||window.navigator.platform)}function i(e){let t=null;return()=>(null==t&&(t=e()),t)}n.d(t,{o:()=>D});let u=i(function(){return o(/^Mac/i)}),a=i(function(){return o(/^iPhone/i)}),l=i(function(){return o(/^iPad/i)||u()&&navigator.maxTouchPoints>1}),s=i(function(){return a()||l()});i(function(){return u()||s()}),i(function(){return r(/AppleWebKit/i)&&!c()});let c=i(function(){return r(/Chrome/i)}),d=i(function(){return r(/Android/i)});i(function(){return r(/Firefox/i)});let f=e=>{var t;return null!==(t=null==e?void 0:e.ownerDocument)&&void 0!==t?t:document},v=e=>e&&"window"in e&&e.window===e?e:f(e).defaultView||window;var p=n(12115);let g=null,m=new Set,h=new Map,y=!1,E=!1,b={Tab:!0,Escape:!0};function w(e,t){for(let n of m)n(e,t)}function T(e){y=!0,e.metaKey||!u()&&e.altKey||e.ctrlKey||"Control"===e.key||"Shift"===e.key||"Meta"===e.key||(g="keyboard",w("keyboard",e))}function L(e){g="pointer",("mousedown"===e.type||"pointerdown"===e.type)&&(y=!0,w("pointer",e))}function F(e){(0===e.mozInputSource&&e.isTrusted||(d()&&e.pointerType?"click"===e.type&&1===e.buttons:0===e.detail&&!e.pointerType))&&(y=!0,g="virtual")}function A(e){e.target!==window&&e.target!==document&&(y||E||(g="virtual",w("virtual",e)),y=!1,E=!1)}function k(){y=!1,E=!0}function P(e){if("undefined"==typeof window||h.get(v(e)))return;let t=v(e),n=f(e),r=t.HTMLElement.prototype.focus;t.HTMLElement.prototype.focus=function(){y=!0,r.apply(this,arguments)},n.addEventListener("keydown",T,!0),n.addEventListener("keyup",T,!0),n.addEventListener("click",F,!0),t.addEventListener("focus",A,!0),t.addEventListener("blur",k,!1),"undefined"!=typeof PointerEvent?(n.addEventListener("pointerdown",L,!0),n.addEventListener("pointermove",L,!0),n.addEventListener("pointerup",L,!0)):(n.addEventListener("mousedown",L,!0),n.addEventListener("mousemove",L,!0),n.addEventListener("mouseup",L,!0)),t.addEventListener("beforeunload",()=>{C(e)},{once:!0}),h.set(t,{focus:r})}let C=(e,t)=>{let n=v(e),r=f(e);t&&r.removeEventListener("DOMContentLoaded",t),h.has(n)&&(n.HTMLElement.prototype.focus=h.get(n).focus,r.removeEventListener("keydown",T,!0),r.removeEventListener("keyup",T,!0),r.removeEventListener("click",F,!0),n.removeEventListener("focus",A,!0),n.removeEventListener("blur",k,!1),"undefined"!=typeof PointerEvent?(r.removeEventListener("pointerdown",L,!0),r.removeEventListener("pointermove",L,!0),r.removeEventListener("pointerup",L,!0)):(r.removeEventListener("mousedown",L,!0),r.removeEventListener("mousemove",L,!0),r.removeEventListener("mouseup",L,!0)),h.delete(n))};function S(){return"pointer"!==g}"undefined"!=typeof document&&function(e){let t;let n=f(void 0);"loading"!==n.readyState?P(void 0):(t=()=>{P(void 0)},n.addEventListener("DOMContentLoaded",t)),()=>C(e,t)}();let H=new Set(["checkbox","radio","range","color","file","image","button","submit","reset"]),M="undefined"!=typeof document?p.useLayoutEffect:()=>{};class O{isDefaultPrevented(){return this.nativeEvent.defaultPrevented}preventDefault(){this.defaultPrevented=!0,this.nativeEvent.preventDefault()}stopPropagation(){this.nativeEvent.stopPropagation(),this.isPropagationStopped=()=>!0}isPropagationStopped(){return!1}persist(){}constructor(e,t){this.nativeEvent=t,this.target=t.target,this.currentTarget=t.currentTarget,this.relatedTarget=t.relatedTarget,this.bubbles=t.bubbles,this.cancelable=t.cancelable,this.defaultPrevented=t.defaultPrevented,this.eventPhase=t.eventPhase,this.isTrusted=t.isTrusted,this.timeStamp=t.timeStamp,this.type=e}}function j(e){let t=(0,p.useRef)({isFocused:!1,observer:null});M(()=>{let e=t.current;return()=>{e.observer&&(e.observer.disconnect(),e.observer=null)}},[]);let n=function(e){let t=(0,p.useRef)(null);return M(()=>{t.current=e},[e]),(0,p.useCallback)((...e)=>{let n=t.current;return null==n?void 0:n(...e)},[])}(t=>{null==e||e(t)});return(0,p.useCallback)(e=>{if(e.target instanceof HTMLButtonElement||e.target instanceof HTMLInputElement||e.target instanceof HTMLTextAreaElement||e.target instanceof HTMLSelectElement){t.current.isFocused=!0;let r=e.target;r.addEventListener("focusout",e=>{t.current.isFocused=!1,r.disabled&&n(new O("blur",e)),t.current.observer&&(t.current.observer.disconnect(),t.current.observer=null)},{once:!0}),t.current.observer=new MutationObserver(()=>{if(t.current.isFocused&&r.disabled){var e;null===(e=t.current.observer)||void 0===e||e.disconnect();let n=r===document.activeElement?null:document.activeElement;r.dispatchEvent(new FocusEvent("blur",{relatedTarget:n})),r.dispatchEvent(new FocusEvent("focusout",{bubbles:!0,relatedTarget:n}))}}),t.current.observer.observe(r,{attributes:!0,attributeFilter:["disabled"]})}},[n])}function D(e={}){var t,n,r;let{autoFocus:o=!1,isTextInput:i,within:u}=e,a=(0,p.useRef)({isFocused:!1,isFocusVisible:o||S()}),[l,s]=(0,p.useState)(!1),[c,d]=(0,p.useState)(()=>a.current.isFocused&&a.current.isFocusVisible),g=(0,p.useCallback)(()=>d(a.current.isFocused&&a.current.isFocusVisible),[]),h=(0,p.useCallback)(e=>{a.current.isFocused=e,s(e),g()},[g]);t=e=>{a.current.isFocusVisible=e,g()},n=[],r={isTextInput:i},P(),(0,p.useEffect)(()=>{let e=(e,n)=>{(function(e,t,n){var r;let o="undefined"!=typeof window?v(null==n?void 0:n.target).HTMLInputElement:HTMLInputElement,i="undefined"!=typeof window?v(null==n?void 0:n.target).HTMLTextAreaElement:HTMLTextAreaElement,u="undefined"!=typeof window?v(null==n?void 0:n.target).HTMLElement:HTMLElement,a="undefined"!=typeof window?v(null==n?void 0:n.target).KeyboardEvent:KeyboardEvent;return!((e=e||(null==n?void 0:n.target)instanceof o&&!H.has(null==n?void 0:null===(r=n.target)||void 0===r?void 0:r.type)||(null==n?void 0:n.target)instanceof i||(null==n?void 0:n.target)instanceof u&&(null==n?void 0:n.target.isContentEditable))&&"keyboard"===t&&n instanceof a&&!b[n.key])})(!!(null==r?void 0:r.isTextInput),e,n)&&t(S())};return m.add(e),()=>{m.delete(e)}},n);let{focusProps:y}=function(e){let{isDisabled:t,onFocus:n,onBlur:r,onFocusChange:o}=e,i=(0,p.useCallback)(e=>{if(e.target===e.currentTarget)return r&&r(e),o&&o(!1),!0},[r,o]),u=j(i),a=(0,p.useCallback)(e=>{let t=f(e.target);e.target===e.currentTarget&&t.activeElement===e.target&&(n&&n(e),o&&o(!0),u(e))},[o,n,u]);return{focusProps:{onFocus:!t&&(n||o||r)?a:void 0,onBlur:!t&&(r||o)?i:void 0}}}({isDisabled:u,onFocusChange:h}),{focusWithinProps:E}=function(e){let{isDisabled:t,onBlurWithin:n,onFocusWithin:r,onFocusWithinChange:o}=e,i=(0,p.useRef)({isFocusWithin:!1}),u=(0,p.useCallback)(e=>{i.current.isFocusWithin&&!e.currentTarget.contains(e.relatedTarget)&&(i.current.isFocusWithin=!1,n&&n(e),o&&o(!1))},[n,o,i]),a=j(u),l=(0,p.useCallback)(e=>{i.current.isFocusWithin||document.activeElement!==e.target||(r&&r(e),o&&o(!0),i.current.isFocusWithin=!0,a(e))},[r,o,a]);return t?{focusWithinProps:{onFocus:void 0,onBlur:void 0}}:{focusWithinProps:{onFocus:l,onBlur:u}}}({isDisabled:!u,onFocusWithinChange:h});return{isFocused:l,isFocusVisible:c,focusProps:u?E:y}}},13201:(e,t,n)=>{n.d(t,{M:()=>s});var r=n(12115);let o=!1,i=0;function u(){o=!0,setTimeout(()=>{o=!1},50)}function a(e){"touch"===e.pointerType&&u()}function l(){if("undefined"!=typeof document)return"undefined"!=typeof PointerEvent?document.addEventListener("pointerup",a):document.addEventListener("touchend",u),i++,()=>{--i>0||("undefined"!=typeof PointerEvent?document.removeEventListener("pointerup",a):document.removeEventListener("touchend",u))}}function s(e){let{onHoverStart:t,onHoverChange:n,onHoverEnd:i,isDisabled:u}=e,[a,s]=(0,r.useState)(!1),c=(0,r.useRef)({isHovered:!1,ignoreEmulatedMouseEvents:!1,pointerType:"",target:null}).current;(0,r.useEffect)(l,[]);let{hoverProps:d,triggerHoverEnd:f}=(0,r.useMemo)(()=>{let e=(e,r)=>{if(c.pointerType=r,u||"touch"===r||c.isHovered||!e.currentTarget.contains(e.target))return;c.isHovered=!0;let o=e.currentTarget;c.target=o,t&&t({type:"hoverstart",target:o,pointerType:r}),n&&n(!0),s(!0)},r=(e,t)=>{if(c.pointerType="",c.target=null,"touch"===t||!c.isHovered)return;c.isHovered=!1;let r=e.currentTarget;i&&i({type:"hoverend",target:r,pointerType:t}),n&&n(!1),s(!1)},a={};return"undefined"!=typeof PointerEvent?(a.onPointerEnter=t=>{o&&"mouse"===t.pointerType||e(t,t.pointerType)},a.onPointerLeave=e=>{!u&&e.currentTarget.contains(e.target)&&r(e,e.pointerType)}):(a.onTouchStart=()=>{c.ignoreEmulatedMouseEvents=!0},a.onMouseEnter=t=>{c.ignoreEmulatedMouseEvents||o||e(t,"mouse"),c.ignoreEmulatedMouseEvents=!1},a.onMouseLeave=e=>{!u&&e.currentTarget.contains(e.target)&&r(e,"mouse")}),{hoverProps:a,triggerHoverEnd:r}},[t,n,i,u,c]);return(0,r.useEffect)(()=>{u&&f({currentTarget:c.target},c.pointerType)},[u]),{hoverProps:d,isHovered:a}}}}]);