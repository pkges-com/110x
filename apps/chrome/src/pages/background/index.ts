import { BASE_URL, ONE_MINUTE } from '@shared/utils';
import {
  publishMetrics as sendMetricsToServer,
  HttpStatusCodes,
} from '@shared/utils/http';
import { Actions } from '../../enums';

const initialMetrics = {
  active: false,
  type: 'chrome',
  activities: [],
};

type MetricsState = typeof initialMetrics;

const globalState = {
  user: null,
  apiKey: null,
  metrics: initialMetrics,
};

const flushMetricsState = () => {
  const metrics = Object.assign({}, globalState.metrics);
  globalState.metrics = Object.assign({}, initialMetrics);

  return metrics;
};

setTimeout(async () => {
  const now = new Date();
  const state = flushMetricsState();
  if (!globalState.user || !globalState.apiKey) {
    return;
  }

  try {
    await sendMetricsToServer(globalState.apiKey, {
      type: 'chrome',
      created_at: now.toISOString(),
      activities: state.activities,
    });
  } catch (error: any) {
    console.log(
      `${new Date().toISOString()} - Metrics not sent. Error: ${error}`
    );

    if (error.response?.status === HttpStatusCodes.Unauthorized) {
      globalState.user = null;
      globalState.apiKey = null;
    }
  }
}, ONE_MINUTE);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  switch (message.type) {
    case Actions.GET_USER:
      try {
        chrome.storage.sync.get('state').then(({ state }) => {
          if (state?.user) {
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
      fetch(BASE_URL + '/users/me', {
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

// on uninstall, clear all storage
