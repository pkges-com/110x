import { Actions } from '@src/enums';
import { sendMessage } from '@src/utils';
import React from 'react';

type LoginProps = {
  getUser: () => void;
};

export const Login = ({ getUser }: LoginProps) => {
  const ref = React.useRef<HTMLFormElement>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const apiKey = (
      ref.current?.elements.namedItem('api_key') as HTMLInputElement
    ).value;

    // chrome.storage.sync.set({ apiKey }, () => getUser());
    await sendMessage({ type: Actions.LOGIN, apiKey });
    getUser();
  };

  return (
    <form ref={ref} className="w-full" onSubmit={onSubmit}>
      <div className="flex flex-col text-left">
        <div className="text-base font-bold">
          1. Click
          <a
            href="https://110x.pkges.com/login"
            target="_blank"
            className="text-blue-500 hover:text-blue-800"
          >
            {' '}
            here to get your API key
          </a>
        </div>
      </div>
      {/* divider with title */}
      <div className="w-full mt-5 mb-2 flex flex-col justify-center">
        <hr className="flex w-full border-1 border-gray-200" />
        <div className="mt-[-13px] bg-white p-1 w-min mr-auto ml-auto">
          Then
        </div>
      </div>
      <div className="flex flex-col text-left">
        <div className="text-base font-bold">2. Paste your API key here:</div>
        <div className="flex mt-2 gap-2">
          <input
            id="api_key"
            className="shadow flex-auto appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Paste here API Key"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};
