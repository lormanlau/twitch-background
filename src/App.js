import logo from "./logo.svg";
import './App.css';
import React, { useEffect, useState } from "react";

const clientId = 'jzrppcr9rjx38gwy84w3v6s56t0v2t';
const redirectURI = 'https://lormanlau.github.io/twitch-background/';
const scope = 'channel:read:redemptions';

function App() {
  const [ready, setReady] = useState(false);
  var ws;

  var parseFragment = (hash) => {
    var hashMatch = function (expr) {
      var match = hash.match(expr);
      return match ? match[1] : null;
    };
    var state = hashMatch(/state=(\w+)/);
    if (sessionStorage.twitchOAuthState === state)
      sessionStorage.twitchOAuthToken = hashMatch(/access_token=(\w+)/);
  };

  var authUrl = () => {
    sessionStorage.twitchOAuthState = nonce(15);
    var url = 'https://api.twitch.tv/kraken/oauth2/authorize' +
      '?response_type=token' +
      '&client_id=' + clientId +
      '&redirect_uri=' + redirectURI +
      '&state=' + sessionStorage.twitchOAuthState +
      '&scope=' + scope;
    return url
  }

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
    ws.send(JSON.stringify(message));
  }

  var listen = (topic) => {
    let message = {
      type: 'LISTEN',
      nonce: nonce(15),
      data: {
        topics: [topic],
        auth_token: sessionStorage.twitchOAuthToken
      }
    };
    console.log('SENT:',message);
    ws.send(JSON.stringify(message));
  }

  var connect = () => {
    var heartbeatInterval = 1000 * 60; 
    var reconnectInterval = 1000 * 3;
    var heartbeatHandle;

    ws = new WebSocket('wss://pubsub-edge.twitch.tv');

    ws.onopen = function (event) {
      console.log('INFO: Socket Opened');
      heartbeat();
      heartbeatHandle = setInterval(heartbeat, heartbeatInterval);
    };

    ws.onerror = function (error) {
      console.error('ERR:',error);
    };

    ws.onmessage = function (event) {
      let message = JSON.parse(event.data);
      console.log('RECV:',message);
      if (message.type === 'RECONNECT') {
        console.log('INFO: Reconnecting...');
        setTimeout(connect, reconnectInterval);
      }
    };

    ws.onclose = function () {
      console.log('INFO: Socket Closed');
      clearInterval(heartbeatHandle);
      console.log('INFO: Reconnecting...');
      setTimeout(connect, reconnectInterval);
    };

  }

  useEffect(() => {
    if (document.location.hash.match(/access_token=(\w+)/))
      parseFragment(document.location.hash);
    if (sessionStorage.twitchOAuthToken) {
      connect();
      heartbeat();
    }
  });

  return (
    <div className="header">
      <div className="inner-header flex">
        <div className="container">
          <div className="row">
            <div className="auth text-center">
              <p>First, connect with your Twitch Account:</p>
              <a id="auth-link" href={!sessionStorage.twitchOAuthToken && authUrl()}><img src={logo} alt="logo" /></a>
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
