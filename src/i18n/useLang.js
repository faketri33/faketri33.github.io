import { useContext } from 'react';
import { LangContext } from './LangContext.js';

export function useLang() {
  const value = useContext(LangContext);
  if (!value) throw new Error('useLang must be used inside <LangProvider>');
  return value;
}
