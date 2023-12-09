import * as vscode from 'vscode';

export const login = async (
  context?: vscode.ExtensionContext,
  log?: vscode.OutputChannel
) => {
  if (!context) {
    return;
  }

  log?.appendLine('logging, pr');

  const userResponse = await vscode.window.showInputBox({
    placeHolder: 'Enter your 110x API Key',
  });

  if (!userResponse) {
    return;
  }

  context.secrets.store('110x.apiKey', userResponse);
};
