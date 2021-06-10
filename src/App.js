import logo from "./logo.svg";
import './App.css';
import React, { useCallback, useEffect, useRef, useState } from "react";

const clientId = 'jzrppcr9rjx38gwy84w3v6s56t0v2t';
const redirectURI = 'https://lormanlau.github.io/twitch-background/';
const scope = 'channel:read:redemptions';

const getRandomInt = () => {
  return Math.floor(Math.random() * 256);
}

const hexToRgb = (hex) => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : {
    r: 0,
    g: 0,
    b: 0
  }
}

function App() {
  const [ready, setReady] = useState(false);
  const [demo, setDemo] = useState(true);
  const [_authUrl, setAuthUrl] = useState("/twitch-background");
  const [left, setLeft] = useState({ r: 84, g: 58, b: 183 })
  const [right, setRight] = useState({ r: 0, g: 172, b: 193 })
  var ws = useRef()

  /* for testing to generate random colors */
  useEffect(() => {
    let clock;
    if (demo) {
      clock = setInterval(() => {
        setLeft({ r: getRandomInt(), g: getRandomInt(), b: getRandomInt() })
        setRight({ r: getRandomInt(), g: getRandomInt(), b: getRandomInt() })
      }, 5000);
    }
    return (() => { clearInterval(clock) })
  }, [demo])


  var parseFragment = (hash) => {
    var hashMatch = function (expr) {
      var match = hash.match(expr);
      return match ? match[1] : null;
    };
    var state = hashMatch(/state=(\w+)/);
    if (sessionStorage.twitchOAuthState === state)
      sessionStorage.twitchOAuthToken = hashMatch(/access_token=(\w+)/);
  };

  var authUrl = useCallback(() => {
    sessionStorage.twitchOAuthState = nonce(15);
    var url = 'https://id.twitch.tv/oauth2/authorize' +
      '?response_type=token' +
      '&client_id=' + clientId +
      '&redirect_uri=' + redirectURI +
      '&state=' + sessionStorage.twitchOAuthState +
      '&scope=' + scope;
    return url
  }, [])

  var nonce = (length) => {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  var heartbeat = () => {
    let message = {
      type: 'PING'
    }
    ws.current.send(JSON.stringify(message));
  }

  var connect = useCallback(() => {
    var heartbeatInterval = 1000 * 60;
    var reconnectInterval = 1000 * 3;
    var heartbeatHandle;

    ws.current = new WebSocket('wss://pubsub-edge.twitch.tv');

    ws.current.onopen = function (event) {
      console.log(new Date().toLocaleString(), 'INFO: Socket Opened');
      heartbeat();
      heartbeatHandle = setInterval(heartbeat, heartbeatInterval);
    };

    ws.current.onerror = function (error) {
      console.error(new Date().toLocaleString(), 'ERR:', error);
    };

    ws.current.onmessage = function (event) {
      let message = JSON.parse(event.data);
      console.log('RECV:', message);
      if (message.type === 'RECONNECT') {
        console.log(new Date().toLocaleString(), 'INFO: Reconnecting...');
        setTimeout(connect, reconnectInterval);
      }
      if (message.type === 'reward-redeemed') {
        let color = message.data.redemption.user_input
        let rgbValue = hexToRgb(color)
        if (message.data.reward.title.includes("left")) {
          setLeft(rgbValue);
        } else if (message.reward.title.includes("right")) {
          setRight(rgbValue);
        }
      }
    };

    ws.current.onclose = function () {
      console.log(new Date().toLocaleString(), 'INFO: Socket Closed');
      clearInterval(heartbeatHandle);
      console.log(new Date().toLocaleString(), 'INFO: Reconnecting...');
      setTimeout(connect, reconnectInterval);
    };

  }, [ws])

  useEffect(() => {
    if (document.location.hash.match(/access_token=(\w+)/))
      parseFragment(document.location.hash);
    if (sessionStorage.twitchOAuthToken) {
      connect();
      setReady(true)
      setDemo(false)
    } else {
      setAuthUrl(authUrl());
      setReady(false)
    }
  }, [authUrl, connect]);

  return (
    <div className="header" style={{ background: `linear-gradient(60deg, rgba(${left.r},${left.g},${left.b}) 0%, rgba(${right.r},${right.g},${right.b}) 100%)` }}>
      <div className="inner-header flex">
        <div className="container">
          <div className="row">
            <div style={{ display: ready ? "none" : "block" }} className="auth text-center">
              <p>First, connect with your Twitch Account:</p>
              <a id="auth-link" href={_authUrl}><img src={logo} alt="logo" /></a>
            </div>
          </div>
        </div>
      </div>
      <div>
        <svg className="waves" xmlns="http://www.w3.org/2000/svg"
          viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
            <use href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use href="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>
    </div>
  );
}

export default App;
