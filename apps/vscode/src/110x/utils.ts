import { API_KEY_NAME, ONE_MINUTE } from '@shared/utils/const';
import {
  publishMetrics as sendMetricsToServer,
  HttpStatusCodes,
} from '@shared/utils/http';
import * as vscode from 'vscode';
import { MetricsState } from './const';

export const publishMetrics = async (
  context: vscode.ExtensionContext,
  flushState: () => MetricsState
) => {
  return setInterval(async () => {
    const now = new Date();
    const state = flushState();
    const token = await context.secrets.get(API_KEY_NAME);

    if (!state.active || !token) {
      return;
    }

    try {
      await sendMetricsToServer(token, {
        type: 'vscode',
        created_at: now.toISOString(),
        activities: state.activities,
      });
    } catch (error: any) {
      console.log(
        `${new Date().toISOString()} - Metrics not sent. Error: ${error}`
      );

      if (error.response?.status === HttpStatusCodes.Unauthorized) {
        context.secrets.delete(API_KEY_NAME);
        vscode.window.showErrorMessage(
          '110x: Invalid API key. Please check your API key and try again.'
        );
      }
    }
  }, ONE_MINUTE);
};
