import { KeyboardEvent, MouseEvent } from 'react';

export function handleEnterKeyDown(e: KeyboardEvent, callback: () => void) {
  if (e?.key !== 'Enter') return;

  callback();
}

export function stopPropagation(e: MouseEvent) {
  e.stopPropagation();
}
