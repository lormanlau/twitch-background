(this["webpackJsonptwitch-background"]=this["webpackJsonptwitch-background"]||[]).push([[0],{10:function(e,t,n){},12:function(e,t,n){"use strict";n.r(t);var c=n(1),a=n.n(c),r=n(4),o=n.n(r),s=(n(9),n(2)),i=n.p+"static/media/logo.6ce24c58.svg",l=(n(10),n(0)),u="jzrppcr9rjx38gwy84w3v6s56t0v2t",h=function(){return Math.floor(256*Math.random())};var d=function(){var e=Object(c.useState)(!1),t=Object(s.a)(e,2),n=t[0],a=t[1],r=Object(c.useState)(!0),o=Object(s.a)(r,2),d=o[0],g=o[1],b=Object(c.useState)("/twitch-background"),f=Object(s.a)(b,2),j=f[0],O=f[1],w=Object(c.useState)({r:84,g:58,b:183}),v=Object(s.a)(w,2),p=v[0],S=v[1],x=Object(c.useState)({r:0,g:172,b:193}),m=Object(s.a)(x,2),k=m[0],N=m[1],y=Object(c.useRef)();Object(c.useEffect)((function(){var e;return d&&(e=setInterval((function(){S({r:h(),g:h(),b:h()}),N({r:h(),g:h(),b:h()})}),5e3)),function(){clearInterval(e)}}),[d]);var I=Object(c.useCallback)((function(){return sessionStorage.twitchOAuthState=T(15),"https://id.twitch.tv/oauth2/authorize?response_type=token&client_id="+u+"&redirect_uri=https://lormanlau.github.io/twitch-background/&state="+sessionStorage.twitchOAuthState+"&scope=channel:read:redemptions%20user:read:email"}),[]),T=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",c=0;c<e;c++)t+=n.charAt(Math.floor(Math.random()*n.length));return t},A=Object(c.useCallback)((function(e){var t={type:"LISTEN",nonce:T(15),data:{topics:["channel-points-channel-v1.".concat(e)],auth_token:sessionStorage.twitchOAuthToken}};console.log((new Date).toLocaleString(),"SENT:",t),y.current.send(JSON.stringify(t))}),[]),C=function(){y.current.send(JSON.stringify({type:"PING"}))},L=Object(c.useCallback)((function(){var e,t=!1;y.current=new WebSocket("wss://pubsub-edge.twitch.tv"),y.current.onopen=function(t){console.log((new Date).toLocaleString(),"INFO: Socket Opened"),C(),e=setInterval(C,6e4)},y.current.onerror=function(e){console.error((new Date).toLocaleString(),"ERR:",e)},y.current.onmessage=function(e){var n=JSON.parse(e.data);if(console.log((new Date).toLocaleString(),"RECV:",n),"PONG"===n.type&&(t||fetch("https://api.twitch.tv/helix/users",{headers:{Authorization:"Bearer ".concat(sessionStorage.twitchOAuthToken),"Client-Id":u}}).then((function(e){return e.json()})).then((function(e){return e.data[0].id})).then((function(e){t=!0,A(e)}))),"RECONNECT"===n.type&&(console.log((new Date).toLocaleString(),"INFO: Reconnecting..."),setTimeout(L,3e3)),"reward-redeemed"===n.type){var c=function(e){var t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e);return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:{r:0,g:0,b:0}}(n.data.redemption.user_input);n.data.reward.title.includes("left")?S(c):n.reward.title.includes("right")&&N(c)}},y.current.onclose=function(){console.log((new Date).toLocaleString(),"INFO: Socket Closed"),clearInterval(e),console.log((new Date).toLocaleString(),"INFO: Reconnecting..."),setTimeout(L,3e3),t=!1}}),[y,A]);return Object(c.useEffect)((function(){document.location.hash.match(/access_token=(\w+)/)&&function(e){var t=function(t){var n=e.match(t);return n?n[1]:null},n=t(/state=(\w+)/);sessionStorage.twitchOAuthState===n&&(sessionStorage.twitchOAuthToken=t(/access_token=(\w+)/))}(document.location.hash),sessionStorage.twitchOAuthToken?(L(),a(!0),g(!1)):(O(I()),a(!1))}),[I,L]),Object(l.jsxs)("div",{className:"header",style:{background:"linear-gradient(60deg, rgba(".concat(p.r,",").concat(p.g,",").concat(p.b,") 0%, rgba(").concat(k.r,",").concat(k.g,",").concat(k.b,") 100%)")},children:[Object(l.jsx)("div",{className:"inner-header flex",children:Object(l.jsx)("div",{className:"container",children:Object(l.jsx)("div",{className:"row",children:Object(l.jsxs)("div",{style:{display:n?"none":"block"},className:"auth text-center",children:[Object(l.jsx)("p",{children:"First, connect with your Twitch Account:"}),Object(l.jsx)("a",{id:"auth-link",href:j,children:Object(l.jsx)("img",{src:i,alt:"logo"})})]})})})}),Object(l.jsx)("div",{children:Object(l.jsxs)("svg",{className:"waves",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 24 150 28",preserveAspectRatio:"none",shapeRendering:"auto",children:[Object(l.jsx)("defs",{children:Object(l.jsx)("path",{id:"gentle-wave",d:"M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"})}),Object(l.jsxs)("g",{className:"parallax",children:[Object(l.jsx)("use",{href:"#gentle-wave",x:"48",y:"0",fill:"rgba(255,255,255,0.7"}),Object(l.jsx)("use",{href:"#gentle-wave",x:"48",y:"3",fill:"rgba(255,255,255,0.5)"}),Object(l.jsx)("use",{href:"#gentle-wave",x:"48",y:"5",fill:"rgba(255,255,255,0.3)"}),Object(l.jsx)("use",{href:"#gentle-wave",x:"48",y:"7",fill:"#fff"})]})]})})]})},g=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,13)).then((function(t){var n=t.getCLS,c=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;n(e),c(e),a(e),r(e),o(e)}))};o.a.render(Object(l.jsx)(a.a.StrictMode,{children:Object(l.jsx)(d,{})}),document.getElementById("root")),g()},9:function(e,t,n){}},[[12,1,2]]]);
//# sourceMappingURL=main.67cbe4b6.chunk.js.map