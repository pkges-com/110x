import * as vscode from 'vscode';
import { HundredTenX } from './110x';

const hundredTenX = new HundredTenX();
export function activate(context: vscode.ExtensionContext) {
  hundredTenX.run(context);
}

export function deactivate() {
  hundredTenX.dispose();
}
