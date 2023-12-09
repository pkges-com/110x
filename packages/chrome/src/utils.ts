import { THIRTY_SECONDS } from './enums';
import { debounce } from '@110x/utils';

export const sendMessage = async (
  message: Record<string, unknown>
): Promise<Record<string, any>> => {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage(message, (response) => {
      if (response) {
        resolve(response);
      } else {
        reject();
      }
    });
  });
};

export const sendMessageDebounce = debounce(sendMessage, 1000, THIRTY_SECONDS);
