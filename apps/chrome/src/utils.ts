import { TEN_SECONDS, TWO_SECONDS } from '@shared/utils/const';
import { debounce } from '@shared/utils';

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

export const sendMessageDebounce = debounce(
  sendMessage,
  TWO_SECONDS,
  TEN_SECONDS
);
