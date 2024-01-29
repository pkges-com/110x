import * as vscode from 'vscode';
import { debounce } from '@shared/utils';
import { TEN_SECONDS, TWO_SECONDS } from '@shared/utils/const';
import { MetricsState } from './const';

export const onUserInteraction = async (
  ctx?: vscode.ExtensionContext,
  updateState?: (state: Partial<MetricsState>) => void
) => {
  if (!ctx) {
    return;
  }

  debounce(
    () => {
      updateState?.({ active: true });
    },
    TWO_SECONDS,
    TEN_SECONDS
  )();
};
