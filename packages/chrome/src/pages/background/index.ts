import { Actions } from '@src/enums';

const globalState = {
  user: null,
  apiKey: null,
};

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case Actions.GET_USER:
      try {
        chrome.storage.sync.get('state').then(({ state }) => {
          if (state.user) {
            globalState.user = state.user;
            globalState.apiKey = state.apiKey;
          }

          sendResponse({ user: globalState.user });
        });
      } catch (error) {
        console.error(error);
        sendResponse({ user: null });
      }
      return true;
    case Actions.LOGIN:
      fetch('https://110x.pkges.com/users/me', {
        credentials: 'include',
        headers: {
          authorization: message.apiKey,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.user) {
            chrome.storage.sync.set(
              {
                state: { user: data.user, apiKey: message.apiKey },
              },
              () => {
                globalState.user = data.user;
                globalState.apiKey = message.apiKey;
                sendResponse({ user: data.user });
              }
            );
          }
        });
      return true;
    case Actions.LOGOUT:
      try {
        chrome.storage.sync.set({ state: { user: null, apiKey: null } });
        globalState.user = null;
        globalState.apiKey = null;
        sendResponse({ user: null });
      } catch (error) {
        console.error(error);
        sendResponse({ user: null });
      }
      return true;
    case Actions.USER_INTERACTION:
      console.log('interaction', message);
      return true;
    default:
      break;
  }
});

chrome.runtime.onInstalled.addListener(async () => {
  const contentScripts = chrome.runtime.getManifest().content_scripts || [];

  for (const tab of await chrome.tabs.query({})) {
    if (!tab.id || !tab.url) continue; // probably chrome:// or similar
    for (const cs of contentScripts) {
      chrome.scripting
        .executeScript({
          target: { tabId: tab.id as number },
          files: cs.js as string[],
        })
        .catch((error) => console.error(error));
    }
  }
});
