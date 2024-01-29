import { API_KEY_NAME } from '@shared/utils/const';
import * as vscode from 'vscode';

export const login = async (context?: vscode.ExtensionContext) => {
  if (!context) {
    return;
  }

  const userResponse = await vscode.window.showInputBox({
    placeHolder: 'Enter your 110x API Key',
  });

  if (!userResponse) {
    return;
  }

  context.secrets.store(API_KEY_NAME, userResponse);
};
