import * as vscode from 'vscode';
import { login } from './commands';
import { onUserInteraction } from './events';
import { publishMetrics } from './utils';
import { MetricsState, initialMetrics } from './const';

export class HundredTenX {
  private _context?: vscode.ExtensionContext;
  private _metricsInterval?: NodeJS.Timeout;
  private _state: MetricsState = Object.assign({}, initialMetrics);

  _registerCommands() {
    console.log('trying to regsiter commands');
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

    vscode.workspace.onDidChangeTextDocument((e) =>
      onUserInteraction(this._context, this.updateState.bind(this))
    );
    vscode.window.onDidChangeActiveTextEditor((e) =>
      onUserInteraction(this._context, this.updateState.bind(this))
    );
    vscode.window.onDidChangeTextEditorVisibleRanges((e) =>
      onUserInteraction(this._context, this.updateState.bind(this))
    );
  }

  updateState(state: Partial<MetricsState>) {
    this._state = Object.assign({}, this._state, state);
  }

  flushMetrics() {
    const stateCopy = Object.assign({}, this._state);
    this._state = Object.assign({}, initialMetrics);

    return stateCopy;
  }

  async publishMetrics() {
    if (!this._context) {
      return;
    }

    this._metricsInterval = await publishMetrics(
      this._context,
      this.flushMetrics.bind(this)
    );
  }

  run(context: any) {
    this._context = context;
    this._registerCommands();
    this._registerEvents();
    this.publishMetrics();
  }

  dispose() {
    this._context = undefined;
    clearInterval(this._metricsInterval!);
  }
}
