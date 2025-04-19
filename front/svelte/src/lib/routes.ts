import { base } from '$app/paths';

export const routes = {
  home: `${base}/`,
  numpad: `${base}/numpad`,
} as const;

export type AppRoute = (typeof routes)[keyof typeof routes];
