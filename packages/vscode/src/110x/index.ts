import * as vscode from 'vscode';
import { login } from './commands';
import { onUserInteraction } from './events';

export class HundredTenX {
  private _context?: vscode.ExtensionContext;

  _registerCommands() {
    if (!this._context) {
      return;
    }

    this._context.subscriptions.push(
      vscode.commands.registerCommand('110x.login', () => login(this._context))
    );
  }

  _registerEvents() {
    if (!this._context) {
      return;
    }

    vscode.workspace.onDidChangeTextDocument((e) => onUserInteraction());
    vscode.window.onDidChangeActiveTextEditor((e) => onUserInteraction());
    vscode.window.onDidChangeTextEditorVisibleRanges((e) =>
      onUserInteraction()
    );
  }

  run(context: any) {
    this._context = context;
    this._registerCommands();
    this._registerEvents();
  }

  dispose() {
    this._context = undefined;
  }
}
