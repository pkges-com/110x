import { createRoot } from 'react-dom/client';
import App from './App';
import React, { StrictMode } from 'react';
const div = document.createElement('div');
const rootShadowId = '__root' + Math.random().toString(36).substring(7);
div.id = rootShadowId;
document.body.appendChild(div);

const rootContainer = document.querySelector(`#${rootShadowId}`);
if (!rootContainer) throw new Error("Can't find Options root element");
const root = createRoot(rootContainer.attachShadow({ mode: 'open' }));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);

try {
  console.log('content script loaded');
} catch (e) {
  console.error(e);
}
