(this["webpackJsonptwitch-background"]=this["webpackJsonptwitch-background"]||[]).push([[0],{10:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var c=n(1),o=n.n(c),s=n(4),a=n.n(s),r=(n(9),n(2)),i=n.p+"static/media/logo.6ce24c58.svg",l=(n(10),n(0));var u=function(){var e,t=Object(c.useState)(!1),n=Object(r.a)(t,2),o=n[0],s=n[1],a=Object(c.useState)("/twitch-background"),u=Object(r.a)(a,2),h=u[0],g=u[1],b=Object(c.useState)({r:84,g:58,b:183}),d=Object(r.a)(b,2),j=d[0],f=d[1],O=Object(c.useState)({r:0,g:172,b:193}),v=Object(r.a)(O,2),w=v[0],x=v[1];Object(c.useEffect)((function(){function e(){return Math.floor(256*Math.random())}var t=setInterval((function(){f({r:e(),g:e(),b:e()}),x({r:e(),g:e(),b:e()})}),5e3);return function(){clearInterval(t)}}),[]);var p=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",c=0;c<e;c++)t+=n.charAt(Math.floor(Math.random()*n.length));return t},m=function(){e.send(JSON.stringify({type:"PING"}))},S=function t(){var n;(e=new WebSocket("wss://pubsub-edge.twitch.tv")).onopen=function(e){console.log("INFO: Socket Opened"),m(),n=setInterval(m,6e4)},e.onerror=function(e){console.error("ERR:",e)},e.onmessage=function(e){var n=JSON.parse(e.data);console.log("RECV:",n),"RECONNECT"===n.type&&(console.log("INFO: Reconnecting..."),setTimeout(t,3e3))},e.onclose=function(){console.log("INFO: Socket Closed"),clearInterval(n),console.log("INFO: Reconnecting..."),setTimeout(t,3e3)}};return Object(c.useEffect)((function(){document.location.hash.match(/access_token=(\w+)/)&&function(e){var t=function(t){var n=e.match(t);return n?n[1]:null},n=t(/state=(\w+)/);sessionStorage.twitchOAuthState===n&&(sessionStorage.twitchOAuthToken=t(/access_token=(\w+)/))}(document.location.hash),sessionStorage.twitchOAuthToken?(S(),s(!0)):(g((sessionStorage.twitchOAuthState=p(15),"https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=jzrppcr9rjx38gwy84w3v6s56t0v2t&redirect_uri=https://lormanlau.github.io/twitch-background/&state="+sessionStorage.twitchOAuthState+"&scope=channel:read:redemptions")),s(!1))}),[]),Object(l.jsxs)("div",{className:"header",style:{background:"linear-gradient(60deg, rgba(".concat(j.r,",").concat(j.g,",").concat(j.b,") 0%, rgba(").concat(w.r,",").concat(w.g,",").concat(w.b,") 100%)")},children:[Object(l.jsx)("div",{className:"inner-header flex",children:Object(l.jsx)("div",{className:"container",children:Object(l.jsx)("div",{className:"row",children:Object(l.jsxs)("div",{style:{display:o?"none":"block"},className:"auth text-center",children:[Object(l.jsx)("p",{children:"First, connect with your Twitch Account:"}),Object(l.jsx)("a",{id:"auth-link",href:h,children:Object(l.jsx)("img",{src:i,alt:"logo"})})]})})})}),Object(l.jsx)("div",{children:Object(l.jsxs)("svg",{className:"waves",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 24 150 28",preserveAspectRatio:"none",shapeRendering:"auto",children:[Object(l.jsx)("defs",{children:Object(l.jsx)("path",{id:"gentle-wave",d:"M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"})}),Object(l.jsxs)("g",{className:"parallax",children:[Object(l.jsx)("use",{href:"#gentle-wave",x:"48",y:"0",fill:"rgba(255,255,255,0.7"}),Object(l.jsx)("use",{href:"#gentle-wave",x:"48",y:"3",fill:"rgba(255,255,255,0.5)"}),Object(l.jsx)("use",{href:"#gentle-wave",x:"48",y:"5",fill:"rgba(255,255,255,0.3)"}),Object(l.jsx)("use",{href:"#gentle-wave",x:"48",y:"7",fill:"#fff"})]})]})})]})},h=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(t){var n=t.getCLS,c=t.getFID,o=t.getFCP,s=t.getLCP,a=t.getTTFB;n(e),c(e),o(e),s(e),a(e)}))};a.a.render(Object(l.jsx)(o.a.StrictMode,{children:Object(l.jsx)(u,{})}),document.getElementById("root")),h()},9:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.990f9323.chunk.js.map