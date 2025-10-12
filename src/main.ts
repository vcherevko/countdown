import { mount } from 'svelte'
import App from './App.svelte'

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

if (window.Telegram?.WebApp) {
  window.Telegram.WebApp.ready();
  window.Telegram.WebApp.expand();
}

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
